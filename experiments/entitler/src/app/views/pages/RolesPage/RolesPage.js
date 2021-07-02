import React from "react";
import { useMutation } from "@apollo/client";
import { Divider } from "@material-ui/core";

import CreateRole from "./CreateRole";
import RolesList from "./RolesList";
import { useStyles } from "./styles";
import Spinner from "app/views/shared/components/Spinner/Spinner";
import MessageBox from "app/views/shared/components/MessageBox";
import { SAVE_ROLE } from "app/gql/Mutations";
import { ADD_NEW_ROLE } from "app/gql/Fragments";
import CreateRoleDialogOpener from "./CreateRoleDialogOpener";
import { useAppValue } from "app/views/shared/providers/AppValueProvider";
import { useCurrentUser } from "app/views/shared/providers/UserProvider";
import { STARTS_WITH_ACCESSMANAGER_CREATE_OR_UPDATE } from "app/utils/constants/entitlements";

const RolesPage = () => {
  const classes = useStyles();
  const [isCreateRoleDialogOpen, setIsCreateRoleDialogOpen] =
    React.useState(false);
  const [messageProps, setMessageProps] = React.useState({
    isOpen: false,
  });
  const { appValue } = useAppValue(); // from AppValue context provider
  const { currentUser } = useCurrentUser(); // from User context provider

  const [saveRole, { loading: mutationLoading }] = useMutation(SAVE_ROLE, {
    update(cache, { data: { saveRole } }) {
      cache.modify({
        fields: {
          Roles(existingRolesRef = [], { readField }) {
            const returnedRoleRef = cache.writeFragment({
              data: saveRole,
              fragment: ADD_NEW_ROLE,
            });
            const idReturned = Number(readField("id", returnedRoleRef));
            const existingIds = existingRolesRef.map((roleRef) =>
              Number(readField("id", roleRef))
            );
            if (existingIds.includes(idReturned)) {
              return [...existingRolesRef];
            }
            return [...existingRolesRef, returnedRoleRef];
          },
        },
      });
    },
  });

  const isCreateOrUpdateRoleAllowed = React.useCallback(() => {
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
      {isCreateOrUpdateRoleAllowed() && (
        <>
          <CreateRoleDialogOpener
            isCreateRoleDialogOpen={isCreateRoleDialogOpen}
            setIsCreateRoleDialogOpen={setIsCreateRoleDialogOpen}
          >
            <CreateRole
              saveRole={saveRole}
              setMessageProps={setMessageProps}
              onClose={() => setIsCreateRoleDialogOpen(false)}
            />
          </CreateRoleDialogOpener>
          <Divider variant="middle" />
        </>
      )}
      <RolesList
        saveRole={saveRole}
        setMessageProps={setMessageProps}
        isCreateOrUpdateRoleAllowed={isCreateOrUpdateRoleAllowed}
      />
      <Spinner open={mutationLoading} />
      <MessageBox
        {...messageProps}
        handleClose={() => setMessageProps({ isOpen: false })}
      />
    </div>
  );
};

export default RolesPage;
