export function сelsiusToFahrenheit(сelsius) {
  return Math.round(сelsius * 1.8 + 32);
}

export function fahrenheitToCelsius(fahrenheit) {
  return Math.round((fahrenheit - 32) / 1.8);
}

export function recalcTemperature(func) {
  // current weather
  const currTemp = document.querySelector('.weather-today__temperature span');
  const newCurrTemp = func(Number(currTemp.textContent));
  currTemp.textContent = newCurrTemp;

  const fillsLikeTemp = document.querySelector('.weather-today__feels-like span');
  const newFillsLikeTemp = func(Number(fillsLikeTemp.textContent));
  fillsLikeTemp.textContent = newFillsLikeTemp;

  // forecast
  const days = document.querySelectorAll('.weather-forecast__day');
  days.forEach((day) => {
    const temp = day.querySelector('.weather-forecast__temperature span');
    const newTemp = func(Number(temp.textContent));
    temp.textContent = (newTemp > 0) ? `+${newTemp}` : newTemp;
  });
}
