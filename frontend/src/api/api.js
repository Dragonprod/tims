import axios from 'axios';

export default axios.create({
  baseURL: 'http://89.223.65.211:8080/api/v1',
});