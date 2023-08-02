// import { addDatetime, addStringNoLocale, addUrl, createThing, getSourceUrl, saveSolidDatasetAt, setThing } from "@inrupt/solid-client";
// import { CREATED_PREDICATE, TEXT_PREDICATE, TODO_CLASS, TYPE_PREDICATE } from "../constants/predicates";

// const addTodo = async (text: any) => {
//     const indexUrl = getSourceUrl(todos);
//     const todoWithText = addStringNoLocale(createThing(), TEXT_PREDICATE, text);
//     const todoWithDate = addDatetime(
//         todoWithText,
//         CREATED_PREDICATE,
//         new Date()
//     );
//     const todoWithType = addUrl(todoWithDate, TYPE_PREDICATE, TODO_CLASS);
//     const updatedTodoList = setThing(todos, todoWithType);
//     const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedTodoList, {
//         fetch: session.fetch,
//     });
//     setTodos(updatedDataset);
// };