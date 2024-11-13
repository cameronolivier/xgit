import { z } from 'zod';

export const branchTypeSchema = z
  .strictObject({
    feat: z.string(),
    bug: z.string(),
    hotfix: z.string(),
    release: z.string(),
    docs: z.string(),
  })
  .partial();

export type BranchTypes = keyof z.infer<typeof branchTypeSchema>;

export const configSchema = z
  .strictObject({
    project: z.string(),
  })
  .merge(branchTypeSchema);

export type Config = z.infer<typeof configSchema>;
