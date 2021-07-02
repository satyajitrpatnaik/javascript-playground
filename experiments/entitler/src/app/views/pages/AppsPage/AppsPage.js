import React from "react";
import CreateApp from "./CreateApp";
import AppsList from "./AppsList";
import { Divider } from "@material-ui/core";
import { useMutation } from "@apollo/client";

import { SAVE_APP } from "app/gql/Mutations";
import { ADD_NEW_APP } from "app/gql/Fragments";
import Spinner from "app/views/shared/components/Spinner/Spinner";
import MessageBox from "app/views/shared/components/MessageBox";
import { useStyles } from "./styles";
import CreateAppDialogOpener from "./CreateAppDialogOpener";
import { useCurrentUser } from "app/views/shared/providers/UserProvider";
import { APP_ADMIN_PRIVILEGE } from "app/utils/constants/entitlements";

const AppsPage = () => {
  const classes = useStyles();
  const [isCreateAppDialogOpen, setIsCreateAppDialogOpen] =
    React.useState(false);
  const [messageProps, setMessageProps] = React.useState({
    isOpen: false,
    message: "",
    severity: "success",
  });
  const { currentUser } = useCurrentUser();

  const [saveApp, { loading: mutationLoading }] = useMutation(SAVE_APP, {
    update(cache, { data: { saveApp } }) {
      cache.modify({
        fields: {
          Apps(existingAppRefs = [], { readField }) {
            const returnedAppRef = cache.writeFragment({
              data: saveApp,
              fragment: ADD_NEW_APP,
            });
            const idReturned = Number(readField("id", returnedAppRef));
            const existingIds = existingAppRefs.map((ref) =>
              Number(readField("id", ref))
            );
            if (existingIds.includes(idReturned)) {
              return [...existingAppRefs];
            }
            return [...existingAppRefs, returnedAppRef];
          },
        },
      });
    },
  });

  const isCreateOrUpdateAppAllowed = React.useCallback(() => {
    return currentUser?.privileges.includes(APP_ADMIN_PRIVILEGE);
  }, [currentUser]);

  return (
    <div className={classes.root}>
      {isCreateOrUpdateAppAllowed() && (
        <>
          <CreateAppDialogOpener
            isCreateAppDialogOpen={isCreateAppDialogOpen}
            setIsCreateAppDialogOpen={setIsCreateAppDialogOpen}
          >
            <CreateApp
              saveApp={saveApp}
              setMessageProps={setMessageProps}
              onClose={() => setIsCreateAppDialogOpen(false)}
            />
          </CreateAppDialogOpener>
          <Divider variant="middle" />
        </>
      )}
      <AppsList
        saveApp={saveApp}
        setMessageProps={setMessageProps}
        isCreateOrUpdateAppAllowed={isCreateOrUpdateAppAllowed}
      />
      <Spinner open={mutationLoading} />
      <MessageBox
        {...messageProps}
        handleClose={() => setMessageProps({ isOpen: false })}
      />
    </div>
  );
};

export default AppsPage;
