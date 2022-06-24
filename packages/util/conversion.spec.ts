import { convertFromTo, numberifyString } from './conversion';

describe('packages/util Tests', () => {
  test('convertFromTo', (): void => {
    expect(convertFromTo(10, 1, 1000)).toBe(10000);
    expect(convertFromTo(10000, 1000, 1)).toBe(10);
    expect(convertFromTo(10000, 1000, 4.227)).toBeCloseTo(42.26753);
    expect(convertFromTo(42.27, 4.227, 1000)).toBeCloseTo(10000);
  });

  test('numberifyString', (): void => {
    expect(numberifyString('123')).toBe(123);
    expect(numberifyString('12a3')).toBe(123);
    expect(numberifyString('12a3', true)).toBe(NaN);
    expect(numberifyString('000123')).toBe(123);
  });
});
