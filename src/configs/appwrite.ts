import { Client, Databases, Storage, TablesDB, Users } from 'node-appwrite';

import ENV from '../env.js';

const client = new Client()
	.setEndpoint(ENV.APPWRITE_URL)
	.setProject(ENV.APPWRITE_PROJECT_ID)
	.setKey(ENV.APPWRITE_API_KEY);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const users = new Users(client);
export const tablesDb = new TablesDB(client);

export const appwriteConfig = {
	databaseId: ENV.APPWRITE_DATABASE_ID,
	databaseName: ENV.APPWRITE_DATABASE_NAME,
	usersTableId: ENV.APPWRITE_USERS_TABLE_ID,
	usersTableName: ENV.APPWRITE_USERS_TABLE_NAME,
	eventsTableId: ENV.APPWRITE_EVENTS_TABLE_ID,
	eventsTableName: ENV.APPWRITE_EVENTS_TABLE_NAME,
};
