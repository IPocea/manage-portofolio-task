export const portofolioWebAggregationArray = [
  {
    $lookup: {
      from: "imageclasses",
      localField: "_id",
      foreignField: "portofolioWebId",
      as: "images",
    }
  }
]