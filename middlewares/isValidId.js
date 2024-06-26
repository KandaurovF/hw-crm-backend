// import { isValidObjectId } from "mongoose";

// import { HttpError } from "../helpers/index.js";

// const isValidId = (req, res, next) => {
//   const { id } = req.params;
//   if (!isValidObjectId(id)) {
//     return next(HttpError(404, `${id} not valid id`));
//   }
//   next();
// };

// export default isValidId;
import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
  const { id, companyId } = req.params;

  if (id && !isValidObjectId(id)) {
    return next(HttpError(404, `${id} is not a valid ID`));
  }

  if (companyId && !isValidObjectId(companyId)) {
    return next(HttpError(404, `${companyId} is not a valid ID`));
  }

  next();
};

export default isValidId;
