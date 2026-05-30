import express from 'express';
import cors from 'cors';

import ENV from './env.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();
const PORT = ENV.PORT ?? 3000;

app.use(
	cors({
		origin: ENV.CLIENT_URL,
		credentials: true,
	}),
);

app.use(express.json());

app.use(errorMiddleware);

app.listen(PORT, () => {
	console.log(
		`Welcome to My Calendar API. It is running on http://localhost:${PORT}`,
	);
});
