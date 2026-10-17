import { createTrackingPolicy } from './tracking-policy.mjs';
// DECIDED_BLOCKED_COST: keep disabled. Consent integration and endpoint review pending.
const TRACKING_ENABLED = false;
const VERIFIED_SCRIPT_PATH = null;
export function prepareTracking(browser = globalThis) {
  // Disabled preparation must not inspect browser state or construct a policy.
  if (!TRACKING_ENABLED) return null;
  if (!browser.location || !/^https?:$/.test(browser.location.protocol)) return null;
  const policy = createTrackingPolicy({
    ventureId: 'nivika-nara-concept', origin: browser.location.origin,
    publicRoutes: ['/'], enabled: () => TRACKING_ENABLED,
    getPrivacy: () => ({ consent: false, optOut: false }),
    getNavigator: () => browser.navigator,
  });
  // Do not create a queue, script element, or provider request while disabled.
  if (!policy.allowed() || !VERIFIED_SCRIPT_PATH) return policy;
  const endpoint = new URL(VERIFIED_SCRIPT_PATH, browser.location.origin);
  if (endpoint.origin !== browser.location.origin || endpoint.search || endpoint.hash) return policy;
  browser.va = browser.va || function () { (browser.vaq = browser.vaq || []).push(arguments); };
  browser.va('beforeSend', policy.beforeSend);
  if (!browser.document.querySelector('script[data-savage-analytics]')) {
    const script = browser.document.createElement('script');
    script.src = endpoint.href;
    script.defer = true;
    script.dataset.savageAnalytics = 'true';
    browser.document.head.appendChild(script);
  }
  return policy;
}
prepareTracking();
