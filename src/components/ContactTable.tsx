import { RDF, VCARD } from "@inrupt/lit-generated-vocab-common";
import {
  addUrl,
  asUrl,
  createThing,
  getSourceUrl,
  getThing,
  getUrlAll,
  removeUrl,
  saveSolidDatasetAt,
  setThing,
  setUrl,
} from "@inrupt/solid-client";
import {
  DatasetContext,
  Table,
  TableColumn,
  Value,
  useSession,
  useThing,
} from "@inrupt/solid-ui-react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { LitTermRegistry, getLocalStore } from "@solid/lit-term";
import { FC, useContext, useState } from "react";

type IProps = {
  edit: boolean;
  property: string;
};
const ContactTable: FC<IProps> = ({ edit, property }) => {
  const [newContactType, setNewContactType] = useState(VCARD.Home.value);
  const [newContactValue, setNewContactValue] = useState("");
  const { fetch } = useSession();
  const { solidDataset: dataset, setDataset } = useContext(DatasetContext);
  const { thing: profile } = useThing();
  const contactDetailUrls = getUrlAll(profile!, property);
  const contactDetailThings = contactDetailUrls.map((url) => ({
    dataset,
    thing: getThing(dataset!, url),
  }));

  const saveHandler = async (newThing: any, datasetToUpdate: any) => {
    const savedDataset = await saveSolidDatasetAt(
      getSourceUrl(datasetToUpdate),
      setThing(datasetToUpdate, newThing),
      { fetch }
    );
    setDataset(savedDataset);
  };

  const addContactDetail = async () => {
    const prefix = property === VCARD.hasTelephone.value ? "tel:" : "mailto:";
    const newContactDetail = setUrl(createThing(), RDF.type, newContactType);
    const newContactDetailWithValue = setUrl(
      newContactDetail,
      VCARD.value,
      `${prefix}${newContactValue}`
    );
    const datasetWithContactDetail = setThing(
      dataset!,
      newContactDetailWithValue
    );
    const newProfile = addUrl(
      profile!,
      property,
      asUrl(newContactDetailWithValue, getSourceUrl(dataset as any))
    );
    await saveHandler(newProfile, datasetWithContactDetail);
  };

  const removeRow = async (rowThing: any) => {
    const contactDetailUrl = asUrl(rowThing);
    const newProfile = removeUrl(profile!, property, contactDetailUrl);
    await saveHandler(newProfile, dataset);
  };

  const DeleteButtonCell = () => {
    const { thing: rowThing } = useThing();
    return (
      <Button color="secondary" onClick={() => removeRow(rowThing)}>
        Delete
      </Button>
    );
  };

  const contactTypes = [
    {
      value: VCARD.Home.value,
      label: VCARD.Home.label,
    },
    {
      value: VCARD.Work.value,
      label: VCARD.Work.label,
    },
  ];

  return (
    <>
      <Table things={contactDetailThings as any}>
        <TableColumn
          property={RDF.type.value}
          body={({ value }: any) => {
            const termRegistry = new LitTermRegistry(getLocalStore());
            const label = termRegistry.lookupLabel(value, "en");
            const comment = termRegistry.lookupComment(value, "en");
            return <Typography title={comment}>{label || value}</Typography>;
          }}
          dataType="url"
          header={() => (
            <Typography>
              <b>Type</b>
            </Typography>
          )}
        />
        <TableColumn
          property={VCARD.value.value}
          body={() => (
            <Typography>
              <Value
                edit={edit}
                autosave
                dataType="url"
                property={VCARD.value.value}
                onSave={(savedDataset) => {
                  setDataset(savedDataset!);
                }}
              />
            </Typography>
          )}
          dataType="url"
          header={() => (
            <Typography>
              <b>Value</b>
            </Typography>
          )}
        />
        <TableColumn
          property={VCARD.value.value}
          body={DeleteButtonCell}
          dataType="url"
          header=""
        />
      </Table>
      {edit && (
        <>
          <Typography>Add new contact</Typography>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Provider</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newContactType}
                onChange={(e) => setNewContactType(e.target.value)}
              >
                {contactTypes.map((x) => (
                  <MenuItem key={x.value} value={x.value}>
                    {x.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              // label="Value"
              value={newContactValue}
              onChange={(e) => setNewContactValue(e.target.value)}
            />
            <Button color="primary" onClick={addContactDetail}>
              Add
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default ContactTable;
