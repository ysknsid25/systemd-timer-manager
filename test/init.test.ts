import { describe, it, expect, vi, beforeEach } from 'vitest';
import initCommand from '../src/commands/init';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Mock fs/promises
vi.mock('node:fs/promises', () => ({
  writeFile: vi.fn(),
}));

// Mock console.log to keep output clean
vi.spyOn(console, 'log').mockImplementation(() => {});

describe('init command', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a configuration file with default name', async () => {
    // Cast to any to access the run method if types are strictly checking for args presence validation which we bypass in unit test call
    await (initCommand as any).run({ args: { file: 'stm.json' } });

    expect(writeFile).toHaveBeenCalledTimes(1);
    const expectedPath = resolve(process.cwd(), 'stm.json');
    const writeCall = vi.mocked(writeFile).mock.calls[0];

    expect(writeCall[0]).toBe(expectedPath);

    const content = JSON.parse(writeCall[1] as string);
    expect(content).toBeInstanceOf(Array);
    expect(content).toHaveLength(1);
    expect(content[0]).toHaveProperty('jobName');
    expect(content[0]).toHaveProperty('service');
    expect(content[0]).toHaveProperty('timer');
    expect(content[0].jobName).toBe('example-job');
  });

  it('should create a configuration file with custom name', async () => {
    const customFile = 'custom-config.json';
    await (initCommand as any).run({ args: { file: customFile } });

    expect(writeFile).toHaveBeenCalledTimes(1);
    const expectedPath = resolve(process.cwd(), customFile);
    expect(vi.mocked(writeFile)).toHaveBeenCalledWith(
      expectedPath,
      expect.any(String),
    );
  });
});
