import BirthdateRow from "@/components/BirthdateRow";
import ContactTable from "@/components/ContactTable";
import AppFlex from "@/components/Shared/AppFlex";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import {
  CombinedDataProvider,
  Image,
  Text,
  useSession,
} from "@inrupt/solid-ui-react";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Divider, IconButton, Skeleton, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FC, useState } from "react";
type IProps = {};

const ProfilePage: FC<IProps> = ({}) => {
  const { session } = useSession();
  const { webId } = session.info;
  const [editing, setEditing] = useState(false);

  return (
    <AppFlex>
      {webId && (
        <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
          <Card sx={{ maxWidth: 320, borderRadius: 2 }}>
            <CardContent>
              <Box>
                <Image
                  property={VCARD.hasPhoto.iri.value}
                  width={290}
                  loadingComponent={() => (
                    <Skeleton variant="rectangular" width={280} height={280}>
                      Loading
                    </Skeleton>
                  )}
                  errorComponent={() => (
                    <Skeleton variant="rectangular" width={280} height={280}>
                      Error
                    </Skeleton>
                  )}
                  // deleteComponent={}
                  style={{ borderRadius: 4 }}
                  edit={editing}
                  autosave
                />

                <Divider />

                <AppFlex sx={{ my: 2 }}>
                  <Typography sx={{ width: "120px" }}>Name</Typography>
                  <Text
                    property={FOAF.name.iri.value}
                    edit={editing}
                    autosave
                  />
                </AppFlex>
                <AppFlex sx={{ my: 2 }}>
                  <Typography sx={{ width: "120px" }}>organization</Typography>
                  <Text
                    property={VCARD.organization_name.iri.value}
                    edit={editing}
                    autosave
                  />
                </AppFlex>

                <AppFlex sx={{ my: 2 }}>
                  <Typography sx={{ width: "120px" }}>Born</Typography>
                  <BirthdateRow edit={editing} setEdit={setEditing} />
                </AppFlex>

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
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => setEditing(!editing)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </CombinedDataProvider>
      )}
    </AppFlex>
  );
};

export default ProfilePage;
