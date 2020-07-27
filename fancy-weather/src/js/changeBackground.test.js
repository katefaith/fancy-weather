import { defineTimeOfDay, defineSeason } from './changeBackground';

describe('defineTimeOfDay', () => {
  it('Should returns something', () => {
    expect(defineTimeOfDay()).toBeDefined();
  });

  it('Shouid be an instatce of Function', () => {
    expect(defineTimeOfDay).toBeInstanceOf(Function);
  });

  it('Should return "morning" for numbers from 6 to 11', () => {
    expect(defineTimeOfDay(11)).toEqual('morning');
    expect(defineTimeOfDay(8)).toEqual('morning');
  });
  it('Should return "day" for numbers from 12 to 17', () => {
    expect(defineTimeOfDay(12)).toEqual('day');
    expect(defineTimeOfDay(15)).toEqual('day');
  });
  it('Should return "evening" for numbers from 18 to 23', () => {
    expect(defineTimeOfDay(23)).toEqual('evening');
    expect(defineTimeOfDay(20)).toEqual('evening');
  });
  it('Should return "night" for other numbers', () => {
    expect(defineTimeOfDay(3)).toEqual('night');
    expect(defineTimeOfDay(40)).toEqual('night');
  });
});

describe('defineSeason', () => {
  it('Should return "spring" for numbers from 3 to 5 and latitude > 0', () => {
    expect(defineSeason(3, 10)).toBe('spring');
    expect(defineSeason(4, 15)).toBe('spring');
  });
  it('Should return "summer" for numbers from 6 to 8 and latitude > 0', () => {
    expect(defineSeason(8, 123)).toBe('summer');
    expect(defineSeason(7, 234)).toBe('summer');
  });
  it('Should return "autumn" for numbers from 9 to 11 and latitude > 0', () => {
    expect(defineSeason(10, 55)).toBe('autumn');
    expect(defineSeason(9, 100)).toBe('autumn');
  });
  it('Should return "winter" for other numbers and latitude > 0', () => {
    expect(defineSeason(1, 55)).toBe('winter');
    expect(defineSeason(99, 100)).toBe('winter');
  });

  it('Should return "autumn" for numbers from 3 to 5 and latitude < 0', () => {
    expect(defineSeason(5, -10)).toBe('autumn');
    expect(defineSeason(4, -15)).toBe('autumn');
  });
  it('Should return "winter" for numbers from 6 to 8 and latitude < 0', () => {
    expect(defineSeason(6, -123)).toBe('winter');
    expect(defineSeason(7, -234)).toBe('winter');
  });
  it('Should return "spring" for numbers from 9 to 11 and latitude < 0', () => {
    expect(defineSeason(10, -55)).toBe('spring');
    expect(defineSeason(11, -100)).toBe('spring');
  });
  it('Should return "summer" for other numbers and latitude < 0', () => {
    expect(defineSeason(2, -55)).toBe('summer');
    expect(defineSeason(50, -100)).toBe('summer');
  });
});
