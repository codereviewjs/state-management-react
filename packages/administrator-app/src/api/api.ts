import { BE_URL } from "../constants/url.constants";

async function customFetch<D>(path: string, options?: RequestInit) {
  const result = await fetch(`${BE_URL}${path}`, options);
  if (result.ok) {
    const data = await result.json();
    return data as D;
  } else {
    throw result;
  }
}

export const api = {
  get: <D>(path: string) => customFetch<D>(path),
  post: <D>(path: string, body: any) =>
    customFetch<D>(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: <D>(path: string, body: any) =>
    customFetch<D>(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: <D>(path: string) =>
    customFetch<D>(path, {
      method: "DELETE",
    }),
};
