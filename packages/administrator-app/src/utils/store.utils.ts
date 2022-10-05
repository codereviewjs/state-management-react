import { HttpRequestStatus } from "../context/store/store.types";

function isPendingStatus(status: HttpRequestStatus) {
  return status === "idle" || status === "loading";
}

export const storeUtils = {
  isPendingStatus,
};
