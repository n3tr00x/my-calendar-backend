import 'dotenv/config';

import { AppwriteException } from 'node-appwrite';
import { tablesDB } from '../configs/appwrite.js';

const createDatabase = async () => {
	if (
		!process.env.APPWRITE_DATABASE_NAME ||
		!process.env.APPWRITE_DATABASE_ID
	) {
		throw new Error('Missing database name or ID in environment variables.');
	}

	const { APPWRITE_DATABASE_NAME, APPWRITE_DATABASE_ID } = process.env;

	try {
		const existingDatabase = await tablesDB.get({
			databaseId: APPWRITE_DATABASE_ID,
		});

		console.log(
			`Database "${APPWRITE_DATABASE_NAME}" already exists with ID: ${existingDatabase.$id}`,
		);
		return existingDatabase.$id;
	} catch (error) {
		if (!(error instanceof AppwriteException) || error.code !== 404) {
			throw error;
		}
	}

	console.log(
		`Database "${APPWRITE_DATABASE_NAME}" does not exist. Creating...`,
	);

	const database = await tablesDB.create({
		databaseId: APPWRITE_DATABASE_ID,
		name: APPWRITE_DATABASE_NAME,
	});

	console.log(
		`Database "${APPWRITE_DATABASE_NAME}" created with ID: ${database.$id}`,
	);

	return database.$id;
};

async function createUsersTable(databaseId: string) {
	// TODO
}

async function createEventsTable(databaseId: string) {
	// TODO
}

export async function initializeDatabase() {
	try {
		const databaseId = await createDatabase();
		await createUsersTable(databaseId);
		await createEventsTable(databaseId);
	} catch (error) {
		console.error('Database initialization failed:', error);
		process.exit(1);
	}
}

initializeDatabase();
