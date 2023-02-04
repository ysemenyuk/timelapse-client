import axios from 'axios';

const apiKey = process.env.WEATHER_API_KEY;

const getCurrentDateWeather = async ([lat, lon]) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const resp = await axios.get(url);
  // console.log('resp.status', resp.status);
  return resp;
};

export default { getCurrentDateWeather };
