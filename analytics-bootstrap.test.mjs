import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareTracking } from './analytics-bootstrap.mjs';

test('disabled bootstrap does not read browser state, queue, storage or DOM', () => {
 const browser = {};
 for (const key of ['location', 'navigator', 'localStorage', 'document', 'va', 'vaq', 'fetch']) Object.defineProperty(browser, key, { get() { throw new Error('Unexpected read: '+key); }, set() { throw new Error('Unexpected mutation: '+key); } });
 assert.equal(prepareTracking(browser), null);
});

test('disabled bootstrap tolerates opaque, malformed, file and missing origins', () => {
 for (const browser of [{}, {location:{protocol:'file:',origin:'null'}}, {location:{protocol:'https:',origin:'null'}}, {location:{protocol:'https:',origin:'not a URL'}}, {location:{protocol:'https:',origin:'https://example.test'}}]) assert.equal(prepareTracking(browser),null);
});
