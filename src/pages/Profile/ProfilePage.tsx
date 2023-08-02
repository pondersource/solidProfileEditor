import { FOAF, RDF, VCARD } from "@inrupt/lit-generated-vocab-common";
import {
  addUrl,
  asUrl,
  createThing,
  getDatetime,
  getSourceUrl,
  getThing,
  getUrlAll,
  removeDatetime,
  removeUrl,
  saveSolidDatasetAt,
  setThing,
  setUrl,
} from "@inrupt/solid-client";
import {
  CombinedDataProvider,
  DatasetContext,
  Image,
  Table,
  TableColumn,
  Text,
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
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { LitTermRegistry, getLocalStore } from "@solid/lit-term";
import { FC, useContext, useState } from "react";

type IProps = {};

const ProfilePage: FC<IProps> = ({}) => {
  const { session } = useSession();
  const { webId } = session.info;
  const [editing, setEditing] = useState(false);

  return (
    <Box sx={{ flex: 1, justifyContent: "center", width: "100%" }}>
      {webId && (
        <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Box>
                <Image
                  property={VCARD.hasPhoto.iri.value}
                  width={240}
                  loadingComponent={() => <Skeleton variant="rectangular" width={210} height={118} />}
                />
                <Typography>
                  <Text property={FOAF.name.iri.value} edit={false} autosave />
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  // component="p"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* <BusinessIcon /> */}

                  <Text
                    property={VCARD.organization_name.iri.value}
                    edit={false}
                    autosave
                  />
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  // component="p"
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                  }}
                >
                  <label htmlFor="birthdate-input">Born:&nbsp;</label>
                  <BirthdateRow edit={editing} setEdit={setEditing} />
                </Typography>
                <Box>
                  <Typography>Email Addresses</Typography>

                  <ContactTable
                    property={VCARD.hasEmail.value}
                    edit={editing}
                  />
                </Box>

                <Box>
                  <Typography>Phone Numbers</Typography>

                  <ContactTable
                    property={VCARD.hasTelephone.value}
                    edit={editing}
                  />
                </Box>

                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => setEditing(!editing)}
                  >
                    Toggle Edit
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </CombinedDataProvider>
      )}
    </Box>
  );
};

export default ProfilePage;

const BirthdateRow: FC<{ edit: boolean; setEdit: (edit: boolean) => void }> = ({
  edit,
  setEdit,
}) => {
  const { solidDataset: dataset, setDataset } = useContext(DatasetContext);
  const datasetUrl = getSourceUrl(dataset!);
  const { fetch } = useSession();
  const { thing } = useThing(datasetUrl);
  const birthdate = thing && getDatetime(thing, VCARD.bday);

  async function removeBirthdate() {
    const newProfile = setThing(
      dataset!,
      removeDatetime(thing!, VCARD.bday, birthdate!)
    );
    const savedDataset = await saveSolidDatasetAt(datasetUrl!, newProfile, {
      fetch,
    });
    setDataset(savedDataset);
  }

  return edit || birthdate ? (
    <span>
      <Value
        property={VCARD.bday}
        dataType="datetime"
        inputProps={{ name: "birthdate-input" }}
        edit={edit}
        autosave
      />
      {birthdate && !edit && (
        <Button color="secondary" onClick={() => removeBirthdate()}>
          Delete
        </Button>
      )}
    </span>
  ) : (
    <Button color="primary" onClick={() => setEdit(true)}>
      Add
    </Button>
  );
};

const ContactTable: FC<{ edit: boolean; property: string }> = ({
  edit,
  property,
}) => {
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
                  <MenuItem value={x.value}>{x.label}</MenuItem>
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
