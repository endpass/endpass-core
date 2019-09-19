// do not add "" (empty space), because this is value
const defaultExceptions = [undefined, null];

export const filterObject = (obj, exceptions = {}) => {
  const objCopy = { ...obj };
  Object.keys(objCopy).forEach(
    key => exceptions.includes(objCopy[key]) && delete objCopy[key],
  );
  return objCopy;
};

export const filterNullableParams = obj => filterObject(obj, defaultExceptions);

export default {
  filterObject,
  filterNullableParams,
};
