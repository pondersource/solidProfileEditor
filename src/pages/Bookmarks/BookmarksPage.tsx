import Bookmarks from "@/components/Bookmarks/Bookmarks";
import { CombinedDataProvider, useSession } from "@inrupt/solid-ui-react";
import { Box } from "@mui/material";
import { FC } from "react";

type IProps = {};



const BookmarksPage: FC<IProps> = ({ }) => {
  const { session } = useSession();
  const { info: { webId } } = session;


  return (
    <Box>
      {webId && (
        <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
          <Bookmarks />
        </CombinedDataProvider>
      )}

    </Box>
  );
};

export default BookmarksPage;
