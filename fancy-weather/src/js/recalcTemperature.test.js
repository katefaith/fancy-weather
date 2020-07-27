import { сelsiusToFahrenheit, fahrenheitToCelsius, recalcTemperature } from './recalcTemperature';

describe('сelsiusToFahrenheit', () => {
  it('Should convert Celsius to Fahrenheit correctly', () => {
    expect(сelsiusToFahrenheit(10)).toBeGreaterThan(10);
    expect(сelsiusToFahrenheit(10)).toBeGreaterThanOrEqual(30);
    expect(сelsiusToFahrenheit(10)).toBeGreaterThanOrEqual(50);
    expect(сelsiusToFahrenheit(10)).toBe(50);
  });
});

describe('fahrenheitToCelsius', () => {
  it('Should convert Fahrenheit to Celsius correctly', () => {
    expect(fahrenheitToCelsius(50)).toBeLessThan(50);
    expect(fahrenheitToCelsius(50)).toBeLessThanOrEqual(20);
    expect(fahrenheitToCelsius(50)).toBeLessThanOrEqual(10);
    expect(fahrenheitToCelsius(50)).toBe(10);
  });
});

describe('recalcTemperature', () => {
  it('Should be an instatce of Function', () => {
    expect(recalcTemperature).toBeInstanceOf(Function);
  });
});
