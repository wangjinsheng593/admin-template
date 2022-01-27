import axios from 'axios';

console.log('封装axios：', process.env);
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

export default service;
