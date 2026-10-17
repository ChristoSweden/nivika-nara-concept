import test from 'node:test';
import assert from 'node:assert/strict';
import { createTrackingPolicy, serverEventProperties } from './tracking-policy.mjs';
const options = {ventureId:'example-app',origin:'https://example.com', publicRoutes:['/','/pricing','/products/:id'],enabled:()=>true,getPrivacy:()=>({consent:true,optOut:false}),getNavigator:()=>({})};
test('URL fields and dynamic segments cannot leak',()=>{
  const p=createTrackingPolicy(options);
  assert.equal(p.sanitizeUrl('https://example.com/products/person@example.org?email=private#secret'),'https://example.com/products/:id');
  assert.equal(p.sanitizeUrl('/pricing?token=secret#recovery'),'https://example.com/pricing');
  for(const url of ['/auth/recovery#token','/health/abc','/products/%72ecovery','/products/a%2Fb','/products/%252Fsecret','/unknown/secret','https://other.com/','https://name:secret@example.com/','/%zz']) assert.equal(p.sanitizeUrl(url),null,url);
});
test('privacy changes take effect at send time and exceptions fail closed',()=>{
  let privacy={consent:true,optOut:false};let nav={};
  const p=createTrackingPolicy({...options,getPrivacy:()=>privacy,getNavigator:()=>nav});
  assert.equal(p.allowed(),true);
  privacy={consent:true,optOut:true};assert.equal(p.beforeSend({type:'pageview',url:'/'}),null);
  privacy={consent:false,optOut:false};assert.equal(p.allowed(),false);
  privacy={consent:true,optOut:false};nav={globalPrivacyControl:true};assert.equal(p.allowed(),false);
  nav={doNotTrack:'1'};assert.equal(p.allowed(),false);
  assert.equal(createTrackingPolicy({...options,getPrivacy:()=>{throw Error('storage blocked');}}).allowed(),false);
  assert.equal(createTrackingPolicy({ventureId:'example-app',origin:'https://example.com'}).allowed(),false);
});
test('event allowlist emits exactly fixed venture and source properties',()=>{
  const p=createTrackingPolicy(options);const calls=[];const send=(...args)=>calls.push(args);
  assert.equal(p.track(send,'signup_completed'),true);
  for(const name of ['delivery_confirmed','page_view','email@example.com']) assert.equal(p.track(send,name),false);
  assert.equal(p.track(send,'checkout_started','email@example.com'),false);
  assert.deepEqual(calls,[['signup_completed',{venture_id:'example-app',source:'web'}]]);
  assert.deepEqual(serverEventProperties('example-app'),{venture_id:'example-app',source:'server'});
});
test('invalid and sensitive configurations are rejected',()=>{
  assert.throws(()=>createTrackingPolicy({...options,ventureId:'name@email.com'}));
  assert.throws(()=>createTrackingPolicy({...options,publicRoutes:['/health/:id']}));
  assert.throws(()=>createTrackingPolicy({...options,publicRoutes:['/*']}));
});
