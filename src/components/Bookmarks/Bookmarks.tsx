import { usebookmarks } from "@/atoms/bookmarks.atom";
import AppFlex from "@/components/Shared/AppFlex";
import {
    BOOKMARK_CLASS,
    TYPE_PREDICATE
} from "@/constants/predicates";
import { getOrCreateBookmarks } from "@/utils";
import {
    addStringNoLocale,
    addUrl,
    createThing,
    getSourceUrl,
    getThingAll,
    getUrl,
    removeThing,
    saveSolidDatasetAt,
    setThing
} from "@inrupt/solid-client";
import { CombinedDataProvider, Table, TableColumn, useSession, useThing } from "@inrupt/solid-ui-react";
import { SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Card, CardContent, IconButton, Link, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";


type IProps = {};

const Bookmarks: FC<IProps> = ({ }) => {
    const { session } = useSession();
    const { info: { isLoggedIn, webId }, fetch } = session;

    const [bookmarkTitle, setbookmarkTitle] = useState("");
    const [bookmarkLink, setbookmarkLink] = useState("");
    const { bookmarks, setBookmarks } = usebookmarks();

    async function initBookmarks() {
        const list = await getOrCreateBookmarks(session);
        setBookmarks(list as any);
    };

    useEffect(() => {
        if (session && isLoggedIn) initBookmarks()
    }, [session, isLoggedIn]);

    const addBookmark = async (title: any, link: any, bookmarks: any) => {
        // const bookmarksContainerUri = `${pod}bookmarks/`;
        // const indexUrl = `${bookmarksContainerUri}index.ttl`;
        const indexUrl = getSourceUrl(bookmarks);

        const bookmarkWithTitle = addStringNoLocale(createThing(), SCHEMA_INRUPT.text, title);
        const bookmarkWithLink = addStringNoLocale(bookmarkWithTitle, SCHEMA_INRUPT.URL, link);

        const bookmarkWithType = addUrl(bookmarkWithLink, TYPE_PREDICATE, BOOKMARK_CLASS);

        const updatedBookmarkList = setThing(bookmarks, bookmarkWithType);
        const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedBookmarkList, { fetch });
        return updatedDataset
    };

    const handleSubmit = async () => {
        const updatedDataset = await addBookmark(bookmarkTitle, bookmarkLink, bookmarks);
        setBookmarks(updatedDataset);
    };


    const deleteBookmark = async (todo: any) => {
        const bookmarksUrl = getSourceUrl(bookmarks);
        const updatedBookmarks = removeThing(bookmarks, todo);
        const updatedDataset = await saveSolidDatasetAt(bookmarksUrl, updatedBookmarks, { fetch });
        setBookmarks(updatedDataset);
    };

    const bookmarkThings = (bookmarks && bookmarks?.graphs?.default) ? getThingAll(bookmarks) : [];


    const thingsArray = bookmarkThings
        .filter((t) => getUrl(t, TYPE_PREDICATE) === BOOKMARK_CLASS)
        .map((t) => ({ dataset: bookmarks, thing: t }));

    return (
        <Box>
            {webId && (
                <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
                    <Card sx={{ maxWidth: 520, borderRadius: 2 }}>
                        <CardContent>
                            <AppFlex sx={{ gap: 1 }}>
                                <TextField
                                    onChange={(e) => setbookmarkTitle(e.target.value)}
                                    label="text"
                                    placeholder="text"
                                    size="small"
                                />
                                <TextField
                                    onChange={(e) => setbookmarkLink(e.target.value)}
                                    label="link"
                                    placeholder="link"
                                    size="small"
                                />
                                <Button variant="outlined" size="medium" onClick={handleSubmit}>Save</Button>
                            </AppFlex >
                            <Box>
                                <Table className={`table`} things={thingsArray}>
                                    <TableColumn
                                        property={SCHEMA_INRUPT.text}
                                        header="text"
                                    />
                                    <TableColumn
                                        property={SCHEMA_INRUPT.URL}
                                        header="link"
                                        body={({ value }: { value: string }) => <Link target="_blank" href={value}>{value}</Link>}
                                    />
                                    <TableColumn
                                        property={SCHEMA_INRUPT.text}
                                        header="Delete"
                                        body={() => <DeleteBookmark deleteBookmark={deleteBookmark} />}
                                    />
                                </Table>
                            </Box>
                        </CardContent>
                    </Card>
                </CombinedDataProvider>
            )}

        </Box>
    );
};

export default Bookmarks;

const DeleteBookmark = ({ deleteBookmark }: any) => {
    const { thing } = useThing();
    return (
        <IconButton onClick={() => deleteBookmark(thing)}>
            <DeleteIcon />
        </IconButton>
    );
};