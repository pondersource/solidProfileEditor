import Bookmarks from "@/components/Bookmarks/Bookmarks";
import AppFlex from "@/components/Shared/AppFlex";
import { CombinedDataProvider, useSession } from "@inrupt/solid-ui-react";
import { FC } from "react";

type IProps = {};



const BookmarksPage: FC<IProps> = ({ }) => {
  const { session } = useSession();
  const { info: { webId } } = session;


  return (
    <AppFlex>
      {webId && (
        <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
          <Bookmarks />
        </CombinedDataProvider>
      )}

    </AppFlex>
  );
};

export default BookmarksPage;
