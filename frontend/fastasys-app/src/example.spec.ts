import { describe, it, expect } from 'vitest';

describe('Example Test Suite', () => {
  it('should pass a basic test', () => {
    const result = 2 + 2;
    expect(result).toBe(4);
  });

  it('should test string operations', () => {
    const greeting = 'Hello, Fastasys!';
    expect(greeting).toContain('Fastasys');
    expect(greeting.length).toBeGreaterThan(0);
  });

  it('should test array operations', () => {
    const items = [1, 2, 3, 4, 5];
    expect(items).toHaveLength(5);
    expect(items).toContain(3);
  });
});
