import { useAppValue } from "app/views/shared/providers/AppValueProvider";
import MessageBox from "app/views/shared/components/MessageBox";

const NoAppAssignedAlert = () => {
  const { appValue } = useAppValue();

  // By default, appValue is an empty string("") which is a falsy value.
  // AppSelector component assigns appValue with a non-empty string to indicate no apps are entitled.
  if (appValue === "NoApp") {
    return (
      <MessageBox
        isOpen={true}
        handleClose={() => {}}
        severity="error"
        message={
          "You have not been assigned with an App. Please reach out to the Administrator."
        }
      />
    );
  }
  return null;
};

export default NoAppAssignedAlert;
