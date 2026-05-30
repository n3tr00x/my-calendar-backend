import { AppwriteException } from 'node-appwrite';
import { tablesDb, appwriteConfig } from '../configs/appwrite.js';
import initializeUserTable from './tables/users.table.js';
import initializeEventsTable from './tables/events.table.js';

async function getExistingDatabase() {
	try {
		const existingDatabase = await tablesDb.get({
			databaseId: appwriteConfig.databaseId,
		});

		return existingDatabase;
	} catch (error) {
		if (error instanceof AppwriteException && error.code === 404) {
			console.error('Database not found. It will be created.', {
				message: error.message,
				code: error.code,
				type: error.type,
				response: error.response,
			});
			return null;
		}

		throw error;
	}
}

async function createDatabase() {
	const existingDatabase = await getExistingDatabase();

	if (existingDatabase) {
		return { isDatabaseCreated: false, databaseId: existingDatabase.$id };
	}

	const database = await tablesDb.create({
		databaseId: appwriteConfig.databaseId,
		name: appwriteConfig.databaseName,
	});

	return { isDatabaseCreated: true, databaseId: database.$id };
}

async function initializeDatabase() {
	try {
		const { isDatabaseCreated, databaseId } = await createDatabase();

		if (!isDatabaseCreated) {
			console.log('Database already exists. Skipping creation.');
			console.log('Database ID:', databaseId);
		} else {
			console.log('Database created successfully. Initializing tables...');
			await initializeUserTable();
			await initializeEventsTable();
		}
	} catch (error) {
		console.error('Error creating database:', error);
	}
}

initializeDatabase();
