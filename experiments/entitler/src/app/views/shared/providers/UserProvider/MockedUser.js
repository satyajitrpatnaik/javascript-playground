export const MockedUser = {
  password: null,
  username: "Bryan",
  authorities: [
    {
      authority: "ACCESSMANAGER_ADMIN",
    },
  ],
  accountNonExpired: true,
  accountNonLocked: true,
  credentialsNonExpired: true,
  enabled: true,
  empID: "user",
  firstName: "Bryan",
  lastName: "Adams",
  emailId: "bryan.adams@summerof69.com",
  environment: "local",
  appName: null,
  appVersion: null,
  buildTime: null,
  roles: ["ACCESSMANAGER_ADMIN"],
  // Catalog of Access Manager Privileges -
  // ACCESS_MANAGER_VIEW_(APPNAME) allows user to see the (APPNAME) in dropdown
  // ACCESS_MANAGER_CREATE_OR_UPDATE_(APPNAME) allows user to create or update an (ITEM) for (APPNAME)
  // ACCESS_MANAGER_CREATE_OR_UPDATE_(SITE/APP) allows user to create or update a site or an app.
  // (APPNAME) can be vfc, boson, galaxy or the existing apps.
  // (ITEM) can be roles and privileges for an app.
  // (ITEM) is dependent upon the (APPNAME) chosen from the applications dropdown on UI.
  // (SITE/APP) can be either Site or App as is.
  privileges: [
    "ACCESSMANAGER_VIEW_VFC",
    "ACCESSMANAGER_VIEW_GALAXY",
    "ACCESSMANAGER_VIEW_BOSON",
    "ACCESSMANAGER_VIEW_ACCESSMANAGER",
    "ACCESSMANAGER_CREATE_OR_UPDATE_VFC",
    "ACCESSMANAGER_CREATE_OR_UPDATE_GALAXY",
    "ACCESSMANAGER_CREATE_OR_UPDATE_BOSON",
    "ACCESSMANAGER_CREATE_OR_UPDATE_ACCESSMANAGER",
    "ACCESSMANAGER_APP_ADMIN",
    "ACCESSMANAGER_SITE_ADMIN",
  ],
};
