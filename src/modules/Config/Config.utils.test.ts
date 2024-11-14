import { describe, expect, test } from 'vitest';

import * as SUT from './Config.utils.js';

describe('Config utils', () => {
  describe('validateConfig', () => {
    test('should correctly validate a given config', () => {
      const result = SUT.validateConfig({ project: 'test' });

      expect(result).toEqual({
        project: 'test',
        feat: 'feat',
        bug: 'bug',
        hotfix: 'hotfix',
        release: 'release',
        docs: 'docs',
      });
    });
    test('should overwrite provided config settings', () => {
      const result = SUT.validateConfig({ project: 'test', feat: 'feature' });

      expect(result).toEqual({
        project: 'test',
        feat: 'feature',
        bug: 'bug',
        hotfix: 'hotfix',
        release: 'release',
        docs: 'docs',
      });
    });
  });
});
