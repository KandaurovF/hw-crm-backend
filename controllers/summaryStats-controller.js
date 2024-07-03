import Company from "../models/Company.js";
import Promotion from "../models/Promotion.js";
import { ctrlWrapper } from "../decorators/index.js";

const getSummaryStats = async (req, res) => {
  const [totalPromotions, totalCategories, newCompanies, activeCompanies] =
    await Promise.all([
      Promotion.countDocuments(),
      Company.distinct("categoryId").then((categories) => categories.length),
      Company.countDocuments({ status: "pending" }),
      Company.countDocuments({ status: "active" }),
    ]);

  res.json({
    promotions: totalPromotions,
    categories: totalCategories,
    newCompanies: newCompanies,
    activeCompanies: activeCompanies,
  });
};

export default { getSummaryStats: ctrlWrapper(getSummaryStats) };
