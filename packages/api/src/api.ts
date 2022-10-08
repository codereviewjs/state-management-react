import { BE_URL } from "./constants";

async function customFetch<D>(path: string, options?: RequestInit) {
  console.log("WINDWO", typeof window);

  const result = await fetch(`${BE_URL}${path}`, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
      authorization:
        typeof window !== "undefined"
          ? `Bearer ${localStorage.getItem("token")}`
          : // @ts-expect-error
            `Bearer ${options?.headers?.authorization}` || "",
    },
  });
  if (result.ok) {
    const data = await result.json();
    return data as D;
  } else {
    if (result.status === 401) {
      localStorage.clear();
    }
    throw result;
  }
}

export const api = {
  get: <D>(path: string, options?: RequestInit) =>
    customFetch<D>(path, options),
  post: <D>(path: string, body: unknown, options?: RequestInit) =>
    customFetch<D>(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: <D>(path: string, body: unknown, options?: RequestInit) =>
    customFetch<D>(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: <D>(path: string, options?: RequestInit) =>
    customFetch<D>(path, {
      method: "DELETE",
    }),
};
