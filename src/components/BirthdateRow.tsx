import { VCARD } from "@inrupt/lit-generated-vocab-common";
// import {
//   getDatetime,
//   getSourceUrl,
//   removeDatetime,
//   saveSolidDatasetAt,
//   setThing,
// } from "@inrupt/solid-client";
import {
  // DatasetContext,
  Value,
  // useSession,
  // useThing,
} from "@inrupt/solid-ui-react";
// import { Button, Typography } from "@mui/material";
import {
  FC,
  // useContext
} from "react";

type IBirthdateRow = {
  edit: boolean;
  setEdit: (edit: boolean) => void;
};

const BirthdateRow: FC<IBirthdateRow> = ({ edit }) => {
  // const { fetch } = useSession();

  // const { solidDataset: dataset, setDataset } = useContext(DatasetContext);
  // const datasetUrl = dataset && getSourceUrl(dataset);
  // const { thing } = useThing(datasetUrl);
  // const birthdate = thing && getDatetime(thing, VCARD.bday);

  // async function removeBirthdate() {
  //   if (thing && birthdate && dataset && datasetUrl) {
  //     alert("not implemented");
  //     const bdayRemoved = removeDatetime(thing, VCARD.bday, birthdate);
  //     const newProfile = setThing(dataset, bdayRemoved);
  //     const savedDataset = await saveSolidDatasetAt(datasetUrl, newProfile, {
  //       fetch,
  //     });
  //     setDataset(savedDataset);
  //   }
  // }

  return (
    <span>
      <Value
        property={VCARD.bday}
        dataType="datetime"
        inputProps={{ name: "birthdate-input", onChange: () => { } }}
        edit={edit}
        // errorComponent={() => <Typography color="error">Not Found</Typography>}
        autosave
      />
      {/* {birthdate && !edit && (
        <Button color="secondary" onClick={() => removeBirthdate()}>
          Delete
        </Button>
      )} */}
    </span>
  );
};

export default BirthdateRow;
