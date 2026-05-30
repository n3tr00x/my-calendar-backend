import * as z from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
	PORT: z.coerce.number(),
	CLIENT_URL: z.url(),
	APPWRITE_URL: z.url(),
	APPWRITE_PROJECT_ID: z.string().min(1),
	APPWRITE_API_KEY: z.string().min(1),
	APPWRITE_DATABASE_NAME: z.string().min(1),
	APPWRITE_DATABASE_ID: z.string().min(1),
	APPWRITE_USERS_TABLE_NAME: z.string().min(1),
	APPWRITE_USERS_TABLE_ID: z.string().min(1),
	APPWRITE_EVENTS_TABLE_NAME: z.string().min(1),
	APPWRITE_EVENTS_TABLE_ID: z.string().min(1),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
	console.error('Invalid environment variables:', result.error.issues);
	process.exit(1);
}

const env = result.data;

export default env;
