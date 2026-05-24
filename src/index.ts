import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	}),
);

app.use(express.json());

app.listen(PORT, () => {
	console.log(
		`Welcome to My Calendar API. It is running on http://localhost:${PORT}`,
	);
});
