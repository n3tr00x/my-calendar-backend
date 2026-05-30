import { AppwriteException } from 'node-appwrite';

import { appwriteConfig, tablesDb } from '../../configs/appwrite.js';

async function getExistingUserTableColumn(columnKey: string) {
	try {
		const existingColumn = await tablesDb.getColumn({
			databaseId: appwriteConfig.databaseId,
			tableId: appwriteConfig.usersTableId,
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

async function createUserTableColumns(tableId: string) {
	// email
	const existingEmailColumn = await getExistingUserTableColumn('email');
	if (!existingEmailColumn) {
		await tablesDb.createEmailColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			key: 'email',
			required: true,
		});
	}

	// name
	const existingNameColumn = await getExistingUserTableColumn('name');
	if (!existingNameColumn) {
		await tablesDb.createVarcharColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			key: 'name',
			size: 255,
			required: true,
		});
	}

	// accountId
	const existingAccountIdColumn = await getExistingUserTableColumn('accountId');
	if (!existingAccountIdColumn) {
		await tablesDb.createVarcharColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			key: 'accountId',
			size: 255,
			required: true,
		});
	}

	// avatar
	const existingAvatarColumn = await getExistingUserTableColumn('avatar');
	if (!existingAvatarColumn) {
		await tablesDb.createUrlColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			key: 'avatar',
			required: false,
		});
	}

	// avatarId
	const existingAvatarIdColumn = await getExistingUserTableColumn('avatarId');
	if (!existingAvatarIdColumn) {
		await tablesDb.createVarcharColumn({
			databaseId: appwriteConfig.databaseId,
			tableId,
			key: 'avatarId',
			size: 24,
			required: false,
		});
	}
}

export default createUserTableColumns;
