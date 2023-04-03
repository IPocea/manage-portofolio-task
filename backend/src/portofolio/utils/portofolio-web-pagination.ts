import { IQueryParams } from "src/utils/shared-interface";
import { portofolioWebAggregationArray } from "./portofolio-web-aggr-array";

export const getPortofolioPagination = async (
	model: any,
	query: IQueryParams,
	objKeys: string[]
): Promise<any> => {
	const pageIndex: number = parseInt(query.pageIndex) || 0;
	const limit: number = parseInt(query.pageSize) || 10;
	const options = [];

	if (query.searchValue) {
		const orQueryArray = [];
		for (let key of objKeys) {
			orQueryArray.push({
				[`${key}`]: new RegExp(query.searchValue.toString(), "i"),
			});
		}
		options.push({
			$match: {
				$or: orQueryArray,
			},
		});
	}

	if (query.sortDirection) {
		const sortDirection =
			query.sortDirection === "asc"
				? 1
				: query.sortDirection === "desc"
				? -1
				: null;
		if (sortDirection) {
			options.push({
				$sort: { [`${query.sortBy}`]: sortDirection },
			});
		}
	} else {
		options.push({
			$sort: { updatedAt: -1 },
		});
	}

	const optionsUntouchedBySkipLimit = [...options];
	options.push({ $skip: pageIndex * limit });
	options.push({ $limit: limit });
	const finalOptions = options.concat(portofolioWebAggregationArray);
	const filteredData = await model.aggregate(finalOptions).exec();
	const untouchedBySkipLimit = await model
		.aggregate(optionsUntouchedBySkipLimit)
		.exec();
	const total = untouchedBySkipLimit.length;
	return {
		data: filteredData,
		pageIndex: pageIndex,
		pageSize: limit,
		totalItems: total,
	};
};
