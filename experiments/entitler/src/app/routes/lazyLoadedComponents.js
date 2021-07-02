import React from "react";

export const LazyLoadedAppsPage = React.lazy(() =>
  import("app/views/pages/AppsPage")
);

export const LazyLoadedSitesPage = React.lazy(() =>
  import("app/views/pages/SitesPage")
);

export const LazyLoadedPrivilegesPage = React.lazy(() =>
  import("app/views/pages/PrivilegesPage")
);

export const LazyLoadedRolesPage = React.lazy(() =>
  import("app/views/pages/RolesPage")
);

export const LazyLoadedLanding = React.lazy(() =>
  import("app/views/pages/dashboards/Landing")
);

export const LazyLoadedQueryPagesDashboard = React.lazy(() =>
  import("app/views/pages/dashboards/QueryPagesDashboard")
);
