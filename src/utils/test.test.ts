import { expect, test } from 'vitest';

import { add } from './test.js';

test('add', () => {
  expect(add(1, 2)).toBe(3);
});
