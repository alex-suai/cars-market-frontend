import axios from 'axios';
import {config} from '@/shared/config';

const client = axios.create({
    baseURL: config.apiUrl,
    timeout: 5000,
});

export default client;
