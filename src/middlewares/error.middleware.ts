import { Request, Response, NextFunction } from 'express';
import { AppwriteException } from 'node-appwrite';

export const errorMiddleware = (
	error: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	if (error instanceof AppwriteException) {
		console.error('Appwrite error handled by error middleware:', {
			message: error.message,
			code: error.code,
			type: error.type,
			response: error.response,
		});

		return res
			.status(error.code ?? 500)
			.json({ error: error.message, code: error.code });
	}

	if (error instanceof Error) {
		console.error('Unhandled error handled by error middleware', error);
		return res.status(500).json({ error: error.message });
	}

	console.error('Unknown error handled by error middleware', { error });

	res.status(500).json({ error: 'Unknown error' });
};
