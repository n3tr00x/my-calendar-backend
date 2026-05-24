import { Client, Databases, Storage, Users } from 'node-appwrite';

if (
	!process.env.APPWRITE_URL ||
	!process.env.APPWRITE_PROJECT_ID ||
	!process.env.APPWRITE_API_KEY
) {
	throw new Error('Missing Appwrite configuration in environment variables.');
}

const client = new Client()
	.setEndpoint(process.env.APPWRITE_URL!)
	.setProject(process.env.APPWRITE_PROJECT_ID!)
	.setKey(process.env.APPWRITE_API_KEY!);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const users = new Users(client);
