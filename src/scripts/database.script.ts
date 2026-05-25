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
	if (
		!process.env.APPWRITE_USERS_TABLE_NAME ||
		!process.env.APPWRITE_USERS_TABLE_ID
	) {
		throw new Error('Missing users table name or ID in environment variables.');
	}

	const { APPWRITE_USERS_TABLE_ID, APPWRITE_USERS_TABLE_NAME } = process.env;

	await tablesDB.createTable({
		databaseId,
		tableId: APPWRITE_USERS_TABLE_ID,
		name: APPWRITE_USERS_TABLE_NAME,
	});

	const usersTableIds = { databaseId, tableId: APPWRITE_USERS_TABLE_ID };

	await Promise.all([
		tablesDB.createVarcharColumn({
			...usersTableIds,
			key: 'name',
			required: true,
			size: 255,
		}),
		tablesDB.createEmailColumn({
			...usersTableIds,
			key: 'email',
			required: true,
		}),
		tablesDB.createVarcharColumn({
			...usersTableIds,
			key: 'accountId',
			required: true,
			size: 255,
		}),
		tablesDB.createUrlColumn({
			...usersTableIds,
			key: 'avatar',
			required: false,
		}),
		tablesDB.createVarcharColumn({
			...usersTableIds,
			key: 'avatarId',
			required: false,
			size: 255,
		}),
	]);
}

async function createEventsTable(databaseId: string) {
	// TODO
}

async function initializeDatabase() {
	try {
		const databaseId = await createDatabase();

		await Promise.all([
			createUsersTable(databaseId),
			createEventsTable(databaseId),
		]);
	} catch (error) {
		console.error('Database initialization failed:', error);
		process.exit(1);
	}
}

initializeDatabase();
