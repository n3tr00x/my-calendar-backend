import { Request, Response, NextFunction } from 'express';
import { AppwriteException } from 'node-appwrite';

export const errorMiddleware = (
	error: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	if (error instanceof AppwriteException) {
		return res.status(error.code ?? 500).json({ error: error.message });
	}

	if (error instanceof Error) {
		return res.status(500).json({ error: error.message });
	}

	res.status(500).json({ error: 'Unknown error' });
};
