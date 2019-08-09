/**
 * @description validates JSON string to avoid runtime error when using JSON.parse().
 * @param json any type of item to validate.
 * @returns boolean.
 */
const isValidJSONString = (json: any): boolean => {
  if (typeof json !== 'string') {
    return false;
  }
  try {
    JSON.parse(json);
  } catch (e) {
    return false;
  }
  return true;
};

export { isValidJSONString };
