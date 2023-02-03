import axios from 'axios';

const apiKey = 'd3730673cdb562168875c999b79d9578';

const getCurrentDateWeather = async ([lat, lon]) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const resp = await axios.get(url);
  // console.log('resp.status', resp.status);
  return resp;
};

export default { getCurrentDateWeather };
