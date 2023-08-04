import { atom, useRecoilState } from "recoil";

const bookmarksAtom = atom<any>({
    key: 'bookmarks', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});


export const usebookmarks = () => {
    const [bookmarks, setBookmarks] = useRecoilState(bookmarksAtom);
    return { bookmarks, setBookmarks };
}