import { AppwriteException, RelationshipType } from 'node-appwrite';

import { appwriteConfig, tablesDb } from '../../configs/appwrite.js';

async function getExistingEventsTableColumn(columnKey: string) {
	try {
		const existingColumn = await tablesDb.getColumn({
			databaseId: appwriteConfig.databaseId,
			tableId: appwriteConfig.eventsTableId,
			key: columnKey,
		});

		return existingColumn;
	} catch (error) {
		if (error instanceof AppwriteException && error.code === 404) {
			return null;
		}

		throw error;
	}
}

async function createEventsTableColumns(tableId: string) {
	// title
	const existingTitleColumn = await getExistingEventsTableColumn('title');
	if (!existingTitleColumn) {
		await tablesDb.createVarcharColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			key: 'title',
			size: 255,
			required: true,
		});
	}

	// description
	const existingDescriptionColumn =
		await getExistingEventsTableColumn('description');
	if (!existingDescriptionColumn) {
		await tablesDb.createVarcharColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			key: 'description',
			size: 2200,
			required: false,
		});
	}

	// isAllDay
	const existingIsAllDayColumn = await getExistingEventsTableColumn('isAllDay');
	if (!existingIsAllDayColumn) {
		await tablesDb.createBooleanColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			key: 'isAllDay',
			required: true,
		});
	}

	// location
	const existingLocationColumn = await getExistingEventsTableColumn('location');
	if (!existingLocationColumn) {
		await tablesDb.createVarcharColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			key: 'location',
			size: 255,
			required: false,
		});
	}

	// repeat
	const existingRepeatColumn = await getExistingEventsTableColumn('repeat');
	if (!existingRepeatColumn) {
		await tablesDb.createEnumColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			key: 'repeat',
			elements: ['no-repeat', 'daily', 'weekly', 'monthly'],
			required: false,
		});
	}

	// startDate
	const existingStartDateColumn =
		await getExistingEventsTableColumn('startDate');
	if (!existingStartDateColumn) {
		await tablesDb.createDatetimeColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			key: 'startDate',
			required: true,
		});
	}

	// endDate
	const existingEndDateColumn = await getExistingEventsTableColumn('endDate');
	if (!existingEndDateColumn) {
		await tablesDb.createDatetimeColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			key: 'endDate',
			required: true,
		});
	}

	// startTime
	const existingStartTimeColumn =
		await getExistingEventsTableColumn('startTime');
	if (!existingStartTimeColumn) {
		await tablesDb.createVarcharColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			key: 'startTime',
			size: 5,
			required: false,
		});
	}

	// endTime
	const existingEndTimeColumn = await getExistingEventsTableColumn('endTime');
	if (!existingEndTimeColumn) {
		await tablesDb.createVarcharColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			key: 'endTime',
			size: 5,
			required: false,
		});
	}

	// userId
	const existingUserIdColumn = await getExistingEventsTableColumn('userId');
	if (!existingUserIdColumn) {
		await tablesDb.createVarcharColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			key: 'userId',
			size: 255,
			required: true,
		});
	}

	// userToEventsRelation
	const existingUserToEventsRelationColumn = await getExistingEventsTableColumn(
		'userToEventsRelation',
	);
	if (!existingUserIdColumn && !existingUserToEventsRelationColumn) {
		await tablesDb.createRelationshipColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			relatedTableId: appwriteConfig.usersTableId,
			key: 'user',
			type: RelationshipType.ManyToOne,
		});
	}
}

export default createEventsTableColumns;
