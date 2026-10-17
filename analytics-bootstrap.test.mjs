import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareTracking } from './analytics-bootstrap.mjs';
test('disabled app bootstrap never accesses provider queue or DOM', () => {
 const browser = { location: { protocol: 'https:', origin: 'https://example.test' }, navigator: {} };
 for (const key of ['document', 'va', 'vaq']) Object.defineProperty(browser, key, { get() { throw new Error('Unexpected side effect: '+key); }, set() { throw new Error('Unexpected mutation: '+key); } });
 const policy=prepareTracking(browser);
 assert.equal(policy.allowed(), false);
 assert.equal(policy.beforeSend({type:'pageview',url:'https://example.test/?email=private'}),null);
 assert.equal(policy.track(()=>{throw new Error('Unexpected event');},'core_feature_completed'),false);
});
test('local file preview stays inert', () => assert.equal(prepareTracking({location:{protocol:'file:'}}),null));
