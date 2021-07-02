import React from "react";
import { useMutation } from "@apollo/client";
import { Divider } from "@material-ui/core";

import SitesList from "./SitesList";
import CreateSiteDialogOpener from "./CreateSiteDialogOpener";
import CreateSite from "./CreateSite";
import MessageBox from "app/views/shared/components/MessageBox";
import { Spinner } from "app/views/shared/components/Spinner";
import { SAVE_SITE } from "app/gql/Mutations";
import { ADD_NEW_SITE } from "app/gql/Fragments";
import { SITE_ADMIN_PRIVILEGE } from "app/utils/constants/entitlements";
import { useCurrentUser } from "app/views/shared/providers/UserProvider";
import { useStyles } from "./styles";

const SitesPage = (props) => {
  const classes = useStyles();
  const { currentUser } = useCurrentUser();
  const [isCreateSiteDialogOpen, setIsCreateSiteDialogOpen] =
    React.useState(false);
  const [messageProps, setMessageProps] = React.useState({
    isOpen: false,
    message: "",
    severity: "success",
  });

  const [saveSite, { loading: mutationLoading }] = useMutation(SAVE_SITE, {
    update(cache, { data: { saveSite } }) {
      cache.modify({
        fields: {
          Sites(existingSiteRefs = [], { readField }) {
            const returnedSiteRef = cache.writeFragment({
              data: saveSite,
              fragment: ADD_NEW_SITE,
            });
            const idReturned = Number(readField("id", returnedSiteRef));
            const existingIds = existingSiteRefs.map((ref) =>
              Number(readField("id", ref))
            );
            if (existingIds.includes(idReturned)) {
              return [...existingSiteRefs];
            }
            return [...existingSiteRefs, returnedSiteRef];
          },
        },
      });
    },
  });

  const isCreateOrUpdateSiteAllowed = React.useCallback(() => {
    return currentUser?.privileges.includes(SITE_ADMIN_PRIVILEGE);
  }, [currentUser]);

  return (
    <div className={classes.root}>
      {isCreateOrUpdateSiteAllowed() && (
        <>
          <CreateSiteDialogOpener
            isCreateSiteDialogOpen={isCreateSiteDialogOpen}
            setIsCreateSiteDialogOpen={setIsCreateSiteDialogOpen}
          >
            <CreateSite
              saveSite={saveSite}
              setMessageProps={setMessageProps}
              onClose={() => setIsCreateSiteDialogOpen(false)}
            />
          </CreateSiteDialogOpener>
          <Divider variant="middle" />
        </>
      )}
      <SitesList
        saveSite={saveSite}
        setMessageProps={setMessageProps}
        isCreateOrUpdateSiteAllowed={isCreateOrUpdateSiteAllowed}
      />
      <Spinner open={mutationLoading} />
      <MessageBox
        {...messageProps}
        handleClose={() => setMessageProps({ isOpen: false })}
      />
    </div>
  );
};

export default SitesPage;
