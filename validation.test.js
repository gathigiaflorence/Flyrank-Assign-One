import test from 'node:test';
import assert from 'node:assert/strict';
import { validateSettings } from './validation.js';

test('accepts valid settings', () => {
  const result = validateSettings({ ownerName: 'Ava', budget: '3000', currency: 'USD' });
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('rejects missing fields and invalid budget', () => {
  const result = validateSettings({ ownerName: '', budget: '0', currency: '' });
  assert.equal(result.isValid, false);
  assert.equal(result.errors.ownerName, 'Please enter your name.');
  assert.equal(result.errors.budget, 'Budget must be greater than zero.');
  assert.equal(result.errors.currency, 'Please choose a currency.');
});
