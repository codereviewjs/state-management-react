import { IMetadata } from "types";
import { api } from "./api";

export const metadataApi = {
  getOne: () =>
    api.get<{ metadata: IMetadata }>(`/metadata`),
};
