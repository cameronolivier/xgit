import { expect, test } from 'vitest';

import { add } from './fs.utils.js';

test('add', () => {
  expect(add(1, 2)).toBe(3);
});
