export const preferenceKey='portfolio.usage.cloudflare.v1';
const allowedEvents=new Set(['page_view','app_open','core_completed','signup_completed',
 'auth_completed','profile_completed','demo_started','demo_completed','mission_started','mission_completed',
 'checkout_started','payment_confirmed','welcome_viewed','welcome_step_viewed','welcome_skipped','welcome_completed',
 'auth_viewed','auth_attempted','auth_failed','onboarding_step_viewed','landing_cta_selected','auth_link_requested',
 'relevant_matches_viewed','connection_profile_viewed','connection_draft_opened','connection_draft_reviewed',
 'connection_requested','connection_accepted','message_sent','meeting_proposed','meeting_accepted','meeting_feedback_recorded']);
export function privacyBlocked(nav={}) {
 return nav.globalPrivacyControl===true || ['1','yes'].includes(nav.doNotTrack);
}
export function choiceFrom(storage,now=Date.now()) {
 try {const value=JSON.parse(storage.getItem(preferenceKey));
  return value && ['allow','deny'].includes(value.choice) && Number.isFinite(value.expires) &&
    value.expires>now ? value.choice : null;
 }catch{return null;}
}
export function sourceFrom(location,referrer='') {
 const names={linkedin:'linkedin',facebook:'facebook',instagram:'instagram',x:'x',twitter:'x',tiktok:'tiktok',youtube:'youtube',google:'search',bing:'search'};
 try {
  const source=new URLSearchParams(location.search).get('utm_source');
  if(source)return names[source.toLowerCase()]||'other';
  if(!referrer)return 'direct';
  const host=new URL(referrer).hostname;
  for(const [name,result]of Object.entries(names))if(host===name+'.com'||host.endsWith('.'+name+'.com'))return result;
 }catch{}
 return 'other';
}
export function createUsageClient({project,origins,endpoint='https://portfolio-usage-free.pages.dev/collect',browser=globalThis}) {
 let controller, sentView=false, viewPending=false;
 const active=()=>origins.includes(browser.location?.origin) && !privacyBlocked(browser.navigator);
 const read=()=>{try{return choiceFrom(browser.localStorage);}catch{return null;}};
 function choose(choice) {
  controller?.abort();
  if(choice==='deny')browser.document?.documentElement.removeAttribute?.('data-usage-receipt');
  if(!['allow','deny'].includes(choice))return false;
  try{browser.localStorage.setItem(preferenceKey,JSON.stringify({choice,expires:Date.now()+90*86400000}));
   browser.dispatchEvent(new Event('portfolio:usage-choice'));return true;}catch{return false;}
 }
 async function send(event='page_view') {
  if(!allowedEvents.has(event)||!active()||read()!=='allow'||(event==='page_view'&&(sentView||viewPending)))return false;
  const params=new URLSearchParams(browser.location.search);
  // Do not record authentication callback/recovery documents.
  if(params.has('code')||params.has('token')||params.has('access_token')||browser.location.hash.includes('access_token'))return false;
  const body={project,event,source:sourceFrom(browser.location,browser.document?.referrer),
    sample:params.get('usage_verification')==='1'?'verification':'live'};
  controller=new AbortController();
  if(event==='page_view')viewPending=true;
  try {
   const response=await browser.fetch(endpoint,{method:'POST',credentials:'omit',referrerPolicy:'no-referrer',
    headers:{'Content-Type':'application/json'},body:JSON.stringify(body),keepalive:true,signal:controller.signal});
   if(!response.ok)return false;
   const receipt=await response.json();
   if(receipt.accepted!==true)return false;
   if(event==='page_view')sentView=true;
   // DOM evidence for release verification; no identifier or payload is exposed.
   if(read()==='allow'&&!privacyBlocked(browser.navigator))browser.document?.documentElement.setAttribute('data-usage-receipt',String(receipt.bucketCount));
   return true;
  } catch{return false;} finally {if(event==='page_view')viewPending=false;}
 }
 return{read,choose,send,active,blocked:()=>privacyBlocked(browser.navigator),cancel:()=>controller?.abort()};
}
