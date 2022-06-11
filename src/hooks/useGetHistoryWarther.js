/* eslint-disable import/prefer-default-export */
import { getForecastToday } from '@/services/useGetCurrentLoaction';

function pronosticoHoras(resp1) {
  const obj = [];
  resp1.forecast.forecastday[0].hour.forEach((element) => {
    obj.push({
      hour: element.time,
      condition: element.condition.text,
      icon: element.condition.icon,
      temp: element.temp_c,
    });
  });
  return obj;
}
/* function pronosticoDias(resp1) {
  const obj = [];
  resp1.forecast.forecastday[0].hour.forEach((element) => {
    obj.push({
      hour: element.time,
      condition: element.condition.text,
      icon: element.condition.icon,
      temp: element.temp_c,
    });
  });
  return obj;
} */

export async function useGetHistoryWeather(q, day = 1) {
  return getForecastToday(q, day)
    .then((res) => res.json())
    .then(((resp1) => {
      if (day === 1) return pronosticoHoras(resp1);
      return resp1.forecast.forecastday;
    }));
}
