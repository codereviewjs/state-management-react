const replaceParamWithValue = (url: string, param: string, value: string) =>
  url.replace(param, value);

const replaceIdParamWithValue = (url: string, value: string) =>
  replaceParamWithValue(url, ":id", value);

export const routeUtils = {
  replaceIdParamWithValue,
};
