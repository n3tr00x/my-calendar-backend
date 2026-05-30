import { AppwriteException } from 'node-appwrite';
import { tablesDb, appwriteConfig } from '../../configs/appwrite.js';
import createEventsTableColumns from '../columns/events.columns.js';

async function getExistingEventsTable() {
	try {
		const existingEventsTable = await tablesDb.getTable({
			databaseId: appwriteConfig.databaseId,
			tableId: appwriteConfig.eventsTableId,
		});

		return existingEventsTable;
	} catch (error) {
		if (error instanceof AppwriteException && error.code === 404) {
			return null;
		}
		throw error;
	}
}

async function createEventsTable() {
	const existingEventsTable = await getExistingEventsTable();

	if (existingEventsTable) {
		console.log('Events table already exists. Skipping creation.');
		return existingEventsTable.$id;
	}

	const eventsTable = await tablesDb.createTable({
		databaseId: appwriteConfig.databaseId,
		tableId: appwriteConfig.eventsTableId,
		name: appwriteConfig.eventsTableName,
	});

	return eventsTable.$id;
}

async function initializeEventsTable() {
	const eventsTableId = await createEventsTable();
	const table = await createEventsTableColumns(eventsTableId);

	console.log('Events table created and initialized successfully.', table);
}

export default initializeEventsTable;
