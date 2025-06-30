import axios from "axios";

const instace = axios.create({
    baseURL: 'http://192.168.0.2'
});

export default instace;