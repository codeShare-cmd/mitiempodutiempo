/* eslint-disable import/prefer-default-export */
import { getForecastToday } from '@/services/useGetCurrentLoaction';

export async function useGetHistoryWeather(q) {
  const day = 1;
  return getForecastToday(q, day)
    .then((res) => res.json())
    .then(((resp1) => ({
      horas: resp1.forecast.forecastday[0].hour,
    })));
}
