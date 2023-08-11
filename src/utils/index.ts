import { createSolidDataset, getPodUrlAll, getSolidDataset, saveSolidDatasetAt } from "@inrupt/solid-client";
import { Session } from "@inrupt/solid-client-authn-browser";

export async function getUserPodUrls(session: Session) {
  return await getPodUrlAll(session.info.webId!, { fetch: session.fetch });
}

// export async function getUserPodUrls(session: Session) {
//   const profileDataset = await getSolidDataset(session.info.webId!, { fetch: session.fetch });
//   const profileThing = getThing(profileDataset, session.info.webId!);
//   const podsUrls = getUrlAll(profileThing!, STORAGE_PREDICATE);
//   return podsUrls;
// }


export const getOrCreateBookmarks = async (session: Session) => {
  const pods = await getUserPodUrls(session); // ['https://soltanireza65.solidcommunity.net/']
  const bookmarksContainerUri = `${pods[0]}bookmarks/`;

  const indexUrl = `${bookmarksContainerUri}index.ttl`;
  try {
    const list = await getSolidDataset(indexUrl, { fetch: session.fetch });
    return list;
  } catch (error: any) {
    if (error.statusCode === 404) {
      const list = saveSolidDatasetAt(indexUrl, createSolidDataset(), { fetch: session.fetch });
      return list;
    }
  }
};