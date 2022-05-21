import axios from 'axios'
import { getCookie } from './Cookies';

axios.defaults.baseURL = "http://127.0.0.1:3150/";
axios.defaults.headers.common['Authorization'] = "Bearer " + getCookie("jwt");