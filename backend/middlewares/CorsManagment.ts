import cors from 'cors';
import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['X-Requested-With', 'Content-Type']
};

export const corsM = cors(corsOptions);