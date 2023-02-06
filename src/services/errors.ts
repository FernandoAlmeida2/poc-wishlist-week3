import { ApplicationError } from "../protocols/applicationError";

export function duplicatedNameError(field: string): ApplicationError {
  return {
    name: "DuplicatedNameError",
    message: `There is already a ${field} with given name!`,
  };
}

export function notFoundError(field: string): ApplicationError {
  return {
    name: "NotFoundError",
    message: `There is no ${field} with this parameter!`,
  };
}