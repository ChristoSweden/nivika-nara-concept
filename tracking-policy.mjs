// No provider dependency, network calls, identifiers or storage side effects.
export const EVENTS = Object.freeze(['signup_completed', 'activation_completed', 'core_feature_completed', 'checkout_started', 'delivery_confirmed']);
const SOURCES = new Set(['web', 'server']);
const sensitive = /(?:auth|login|sign.?in|sign.?up|register|recovery|recover|reset|password|token|callback|verify|magic|health|medical|diagnos|symptom|patient|case|chat|message|journal|private|profile|account)/i;
const slug = /^[a-z][a-z0-9-]{0,63}$/;

export function createTrackingPolicy({ ventureId, origin, publicRoutes = [], enabled = () => false,
  getPrivacy = () => ({ consent: false, optOut: false }),
  getNavigator = () => globalThis.navigator } = {}) {
  if (!slug.test(ventureId || '')) throw new Error('Use a fixed registry venture slug');
  const base = new URL(origin);
  if (!['https:', 'http:'].includes(base.protocol) || base.username || base.password) throw new Error('Invalid origin');
  const routes = publicRoutes.map(route => {
    if (!/^\/(?:[a-z0-9-]+|:[a-z][a-z0-9_]*)(?:\/(?:[a-z0-9-]+|:[a-z][a-z0-9_]*))*$/.test(route) && route !== '/') throw new Error('Invalid public route template');
    if (sensitive.test(route)) throw new Error('Sensitive route cannot be allowlisted');
    return { route, parts: route.split('/') };
  });
  const allowed = () => {
    try {
      const privacy = getPrivacy();
      const nav = getNavigator();
      return enabled() === true && privacy?.consent === true && privacy?.optOut === false &&
        nav?.globalPrivacyControl !== true && nav?.doNotTrack !== '1' && nav?.doNotTrack !== 'yes';
    } catch { return false; }
  };
  const sanitizeUrl = raw => {
    try {
      const url = new URL(raw, base.origin);
      if (url.origin !== base.origin || url.username || url.password) return null;
      const decoded = decodeURIComponent(url.pathname);
      if (sensitive.test(decoded) || /[\\\u0000-\u001f]/.test(decoded)) return null;
      const parts = decoded.split('/');
      const match = routes.find(({ parts: template }) => template.length === parts.length &&
        template.every((part, i) => part.startsWith(':') ? parts[i].length > 0 && !parts[i].includes('%') : part === parts[i]));
      return match ? base.origin + match.route : null;
    } catch { return null; }
  };
  const beforeSend = event => {
    if (!allowed() || !event || !['pageview', 'event'].includes(event.type)) return null;
    const url = sanitizeUrl(event.url);
    return url ? { ...event, url } : null;
  };
  // Only call after the app's actual successful operation, never on render/click alone.
  // Delivery is intentionally impossible through this browser helper.
  const track = (send, name, source = 'web') => {
    if (!allowed() || !EVENTS.includes(name) || name === 'delivery_confirmed' || source !== 'web') return false;
    send(name, { venture_id: ventureId, source });
    return true;
  };
  return Object.freeze({ allowed, sanitizeUrl, beforeSend, track });
}

// Server-only integration contract: invoke only after authorized fulfillment is
// durably committed and idempotency is enforced in the application database.
// This helper does NOT establish authorization, fulfillment, consent or deduplication.
export function serverEventProperties(ventureId, source = 'server') {
  if (!slug.test(ventureId || '') || !SOURCES.has(source) || source !== 'server') throw new Error('Invalid server event properties');
  return { venture_id: ventureId, source };
}
