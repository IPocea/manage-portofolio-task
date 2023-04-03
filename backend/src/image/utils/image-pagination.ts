import { IQueryParams } from "src/utils/shared-interface";
import { imageObjKeysForSearch } from "./image-obj-keys";
import { Types } from "mongoose";

export const getImagePagination = async (
	model: any,
	query: IQueryParams,
	portofolioWebId: Types.ObjectId
): Promise<any> => {
	const pageIndex: number = parseInt(query.pageIndex) || 0;
	const limit: number = parseInt(query.pageSize) || 10;
	const options = {portofolioWebId: portofolioWebId};

	if (query.searchValue) {
		const orQueryArray = [];
		for (let key of imageObjKeysForSearch) {
			orQueryArray.push({
				[`${key}`]: new RegExp(query.searchValue.toString(), "i"),
			});
		}
		options["$or"] = orQueryArray;
	}

	const dbQuery = model.find(options);

	dbQuery.sort({ updatedAt: -1 });

	const total = await model.count(options).exec();
	const data = await dbQuery
		.skip(pageIndex * limit)
		.limit(limit)
		.exec();

	return {
		data: data,
		pageIndex: pageIndex,
		pageSize: limit,
		totalItems: total,
	};
};
