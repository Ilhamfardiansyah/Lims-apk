import axios from "axios";

const instace = axios.create({
    baseURL: 'http://192.168.55.107:8000',
    withCredentials: true,
});

export default instace;