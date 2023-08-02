// import {
//     createSolidDataset,
//     getSolidDataset,
//     getThing,
//     getUrlAll,
//     saveSolidDatasetAt,
// } from "@inrupt/solid-client";
// import { STORAGE_PREDICATE } from "../constants/predicates";

// export const getOrCreateTodoList = async (containerUri: string, fetch: any) => {
//     const indexUrl = `${containerUri}index.ttl`;
//     try {
//         const todoList = await getSolidDataset(indexUrl, { fetch });
//         return todoList;
//     } catch (error: any) {
//         if (error.statusCode === 404) {
//             const todoList = saveSolidDatasetAt(indexUrl, createSolidDataset(), { fetch });
//             return todoList;
//         }
//     }
// };
// export const getOrCreateTodoListFull = async (webId: string, fetch: any) => {
//     const profileDataset = await getSolidDataset(webId!, { fetch: fetch });
//     const profileThing = getThing(profileDataset, webId!);
//     const podsUrls = getUrlAll(profileThing!, STORAGE_PREDICATE);
//     const pod = podsUrls[0];
//     const todoContainerUri = `${pod}todos/`;
//     const todoIndexUrl = `${todoContainerUri}index.ttl`;
//     try {
//         const todoList = await getSolidDataset(todoIndexUrl, { fetch });
//         return todoList;
//     } catch (error: any) {
//         if (error.statusCode === 404) {
//             const todoList = saveSolidDatasetAt(todoIndexUrl, createSolidDataset(), { fetch, });
//             return todoList;
//         }
//     }
// };
