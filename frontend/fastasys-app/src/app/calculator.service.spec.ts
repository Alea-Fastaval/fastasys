import { describe, it, expect, beforeEach } from 'vitest';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    service = new CalculatorService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add two numbers correctly', () => {
    expect(service.add(2, 3)).toBe(5);
    expect(service.add(-1, 1)).toBe(0);
    expect(service.add(0, 0)).toBe(0);
  });

  it('should subtract two numbers correctly', () => {
    expect(service.subtract(5, 3)).toBe(2);
    expect(service.subtract(0, 5)).toBe(-5);
  });

  it('should multiply two numbers correctly', () => {
    expect(service.multiply(3, 4)).toBe(12);
    expect(service.multiply(0, 100)).toBe(0);
  });

  it('should divide two numbers correctly', () => {
    expect(service.divide(10, 2)).toBe(5);
    expect(service.divide(9, 3)).toBe(3);
  });

  it('should throw error when dividing by zero', () => {
    expect(() => service.divide(10, 0)).toThrow('Cannot divide by zero');
  });
});
