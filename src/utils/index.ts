import { getPodUrlAll } from "@inrupt/solid-client";

export async function getMyPods(webID: string, fetch: any) {
  return await getPodUrlAll(webID, { fetch: fetch });
}
