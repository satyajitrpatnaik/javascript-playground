import React from "react";
import { useMutation } from "@apollo/client";
import { Divider } from "@material-ui/core";

import { useStyles } from "./styles";
import CreatePrivilege from "./CreatePrivilege";
import PrivilegesList from "./PrivilegesList";
import Spinner from "app/views/shared/components/Spinner/Spinner";
import MessageBox from "app/views/shared/components/MessageBox";
import { SAVE_PRIVILEGE } from "app/gql/Mutations";
import { ADD_NEW_PRIVILEGE } from "app/gql/Fragments";
import CreatePrivilegeDialogOpener from "./CreatePrivilegeDialogOpener";
import { useAppValue } from "app/views/shared/providers/AppValueProvider";
import { useCurrentUser } from "app/views/shared/providers/UserProvider";
import { STARTS_WITH_ACCESSMANAGER_CREATE_OR_UPDATE } from "app/utils/constants/entitlements";

const PrivilegesPage = () => {
  const classes = useStyles();
  const [isCreatePrivilegeDialogOpen, setIsCreatePrivilegeDialogOpen] =
    React.useState(false);
  const [messageProps, setMessageProps] = React.useState({
    isOpen: false,
  });
  const { appValue } = useAppValue(); // from AppValue context provider
  const { currentUser } = useCurrentUser(); // from User context provider

  const [savePrivilege, { loading: mutationLoading }] = useMutation(
    SAVE_PRIVILEGE,
    {
      update(cache, { data: { savePrivilege } }) {
        cache.modify({
          fields: {
            Privileges(existingPrivilegeRefs = [], { readField }) {
              const returnedPrivilegeRef = cache.writeFragment({
                data: savePrivilege,
                fragment: ADD_NEW_PRIVILEGE,
              });
              const returnedId = Number(readField("id", returnedPrivilegeRef));
              const existingIds = existingPrivilegeRefs.map((ref) =>
                Number(readField("id", ref))
              );
              if (existingIds.includes(returnedId)) {
                return [...existingPrivilegeRefs];
              }
              return [...existingPrivilegeRefs, returnedPrivilegeRef];
            },
          },
        });
      },
    }
  );

  // This is duplicate code as in Roles Page, this can be raised to a parent component and more generic. Or keep it open for specific privileges separately for create/modify or roles/privilege.
  const isCreateOrUpdatePrivilegeAllowed = React.useCallback(() => {
    return currentUser?.privileges
      ?.filter((privilege) =>
        privilege.startsWith(STARTS_WITH_ACCESSMANAGER_CREATE_OR_UPDATE)
      )
      .map((privilege) => {
        let splitParts = privilege.toLowerCase().split("_");
        return splitParts[splitParts.length - 1];
      })
      .includes(appValue?.name?.toLowerCase());
  }, [currentUser, appValue]);

  return (
    <div className={classes.root}>
      {isCreateOrUpdatePrivilegeAllowed() && (
        <>
          <CreatePrivilegeDialogOpener
            isCreatePrivilegeDialogOpen={isCreatePrivilegeDialogOpen}
            setIsCreatePrivilegeDialogOpen={setIsCreatePrivilegeDialogOpen}
          >
            <CreatePrivilege
              savePrivilege={savePrivilege}
              setMessageProps={setMessageProps}
              onClose={() => setIsCreatePrivilegeDialogOpen(false)}
            />
          </CreatePrivilegeDialogOpener>
          <Divider variant="middle" />
        </>
      )}

      <PrivilegesList
        savePrivilege={savePrivilege}
        setMessageProps={setMessageProps}
        isCreateOrUpdatePrivilegeAllowed={isCreateOrUpdatePrivilegeAllowed}
      />

      <Spinner open={mutationLoading} />
      <MessageBox
        {...messageProps}
        handleClose={() => setMessageProps({ isOpen: false })}
      />
    </div>
  );
};

export default PrivilegesPage;
