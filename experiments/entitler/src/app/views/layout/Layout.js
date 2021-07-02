import NavBar from "./NavBar";
import Routes from "app/routes";
import ReloadPageOnExpiry from "app/views/shared/components/ReloadPageOnExpiry";
import NoAppAssignedAlert from "app/views/shared/components/NoAppAssignedAlert";
import MarginFromTop from "app/views/shared/components/MarginFromTop";
import { GenericErrorBoundary } from "app/views/shared/components/GenericErrorBoundary";
import { UserProvider } from "app/views/shared/providers/UserProvider";
import { AppValueProvider } from "app/views/shared/providers/AppValueProvider";
import { getUserInfoApiEndpoint } from "app/utils/constants/endpoints";
import { MAX_EXPIRY_IN_MILLISECONDS } from "app/utils/constants/usual-suspects";

const Layout = () => {
  return (
    <GenericErrorBoundary>
      <UserProvider api={getUserInfoApiEndpoint()}>
        <AppValueProvider>
          <div className="container">
            <NavBar />
            <MarginFromTop>
              <Routes />
            </MarginFromTop>
            {process.env.NODE_ENV === "production" && (
              <ReloadPageOnExpiry maxExpiry={MAX_EXPIRY_IN_MILLISECONDS} />
            )}
            <NoAppAssignedAlert />
          </div>
        </AppValueProvider>
      </UserProvider>
    </GenericErrorBoundary>
  );
};

export default Layout;
