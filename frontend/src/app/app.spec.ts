import { describe, expect, it } from 'vitest';

describe('App', () => {
  it('should create a simple test', () => {
    const message = 'Hello from Vitest!';
    expect(message).toBe('Hello from Vitest!');
  });

  it('should handle basic assertions', () => {
    expect(2 + 2).toBe(4);
    expect([1, 2, 3]).toContain(2);
    expect('vitest').toMatch(/test/);
  });
});
