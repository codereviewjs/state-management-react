const replaceParamWithValue = (url: string, param: string, value: string) =>
  url.replace(param, value);

const replaceIdParamWithValue = (url: string, value: string) =>
  replaceParamWithValue(url, ":id", value);

const replaceActionParamWithValue = (url: string, value: string) =>
  replaceParamWithValue(url, ":action", value);

const replaceIdAndActionParams = (
  url: string,
  values: Record<"action" | "id", string>
) => {
  const replacedUrl = replaceActionParamWithValue(url, values.action);
  return replaceIdParamWithValue(replacedUrl, values.id);
};

export const routeUtils = {
  replaceIdParamWithValue,
  replaceIdAndActionParams,
};
