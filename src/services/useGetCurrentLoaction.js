/* eslint-disable import/prefer-default-export */
/* eslint-disable default-case */

const server = import.meta.env.VITE_RAPIDAPI_HOST;
const apikey = import.meta.env.VITE_APIKEY;

export async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((e) => {
      resolve(e.coords);
    }, (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          reject(error.PERMISSION_DENIED);
          break;
        case error.POSITION_UNAVAILABLE:
          reject(error.POSITION_UNAVAILABLE);
          break;
        case error.TIMEOUT:
          reject(error.TIMEOUT);
          break;
        case error.UNKNOWN_ERROR:
          reject(error.UNKNOWN_ERROR);
          break;
      }
    });
  });
}

export async function getTimeZone(params) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': server,
      'X-RapidAPI-Key': apikey,
    },
  };
  const url = `https://weatherapi-com.p.rapidapi.com/timezone.json?q=${params}`;
  return fetch(url, options);
}

export async function getIp() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com',
      'X-RapidAPI-Key': 'e1db17a140msh75eea474640330ep1b8e8fjsnf12e1b06a2f6',
    },
  };

  return fetch('https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation?apikey=873dbe322aea47f89dcf729dcc8f60e8', options);
}

export async function getTimeZoneByIp(ip) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      'X-RapidAPI-Key': 'e1db17a140msh75eea474640330ep1b8e8fjsnf12e1b06a2f6',
    },
  };
  const url = `https://weatherapi-com.p.rapidapi.com/ip.json?q=${ip}`;
  return fetch(url, options);
}

export async function getRealTimeZone(position) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      'X-RapidAPI-Key': 'e1db17a140msh75eea474640330ep1b8e8fjsnf12e1b06a2f6',
    },
  };
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${position}`;
  return fetch(url, options);
}

export async function getForecastToday(q, days) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      'X-RapidAPI-Key': 'e1db17a140msh75eea474640330ep1b8e8fjsnf12e1b06a2f6',
    },
  };
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${q}&days=${days}`;
  return fetch(url, options);
}

export async function getForecast(q, days, date) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      'X-RapidAPI-Key': 'e1db17a140msh75eea474640330ep1b8e8fjsnf12e1b06a2f6',
    },
  };
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${q}&days=${days}&dt=${date}`;
  return fetch(url, options);
}
