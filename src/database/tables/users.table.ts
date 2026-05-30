import { AppwriteException } from 'node-appwrite';

import { appwriteConfig, tablesDb } from '../../configs/appwrite.js';
import createUserTableColumns from '../columns/users.columns.js';

async function getExistingUserTable() {
	try {
		const existingUserTable = await tablesDb.getTable({
			databaseId: appwriteConfig.databaseId,
			tableId: appwriteConfig.usersTableId,
		});

		return existingUserTable;
	} catch (error) {
		if (error instanceof AppwriteException && error.code === 404) {
			return null;
		}
		throw error;
	}
}

async function createUserTable() {
	const existingUserTable = await getExistingUserTable();

	if (existingUserTable) {
		console.log('Users table already exists. Skipping creation.');
		return existingUserTable.$id;
	}

	const usersTable = await tablesDb.createTable({
		databaseId: appwriteConfig.databaseId,
		tableId: appwriteConfig.usersTableId,
		name: appwriteConfig.usersTableName,
	});

	return usersTable.$id;
}

async function initializeUserTable() {
	const userTableId = await createUserTable();
	const table = await createUserTableColumns(userTableId);

	console.log('Users table created and initialized successfully.', table);
}

export default initializeUserTable;
