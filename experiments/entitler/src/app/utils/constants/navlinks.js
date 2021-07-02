import {
  LazyLoadedAppsPage,
  LazyLoadedPrivilegesPage,
  LazyLoadedQueryPagesDashboard,
  LazyLoadedLanding,
  LazyLoadedRolesPage,
  LazyLoadedSitesPage,
} from "app/routes/lazyLoadedComponents";

const NAV_LINKS = [
  {
    id: 9999,
    title: `Landing`,
    description: "This is the landing and is not part of the navbar.",
    path: `/`,
    component: <LazyLoadedLanding />,
    parentId: "app-root", // Not part of Navbar
    privilegesRequired: ["ADMIN_ACCESS_MANAGER"], // Add real privileges to control
    children: [],
  },
  {
    id: 1000,
    title: `apps`,
    description: "This page allows an admin to create a new application.",
    path: `/apps`,
    component: <LazyLoadedAppsPage />,
    parentId: "root",
    privilegesRequired: ["ADMIN_ACCESS_MANAGER"], // Add real privileges to control
    children: [],
  },
  {
    id: 1500,
    title: `sites`,
    description: "This page allows an admin to create a new application.",
    path: `/sites`,
    component: <LazyLoadedSitesPage />,
    parentId: "root",
    privilegesRequired: ["ADMIN_ACCESS_MANAGER"], // Add real privileges to control
    children: [],
  },
  {
    id: 2000,
    title: `roles`,
    description:
      "This page allows an App administrator to create and manage application roles.",
    path: `/roles`,
    component: <LazyLoadedRolesPage />,
    parentId: "root",
    privilegesRequired: ["APP_ACCESS_MANAGER"],
    children: [],
  },
  {
    id: 3000,
    title: `privileges`,
    description:
      "This page allows an App administrator to create and manage application privileges.",
    path: `/privileges`,
    component: <LazyLoadedPrivilegesPage />,
    parentId: "root",
    privilegesRequired: ["APP_ACCESS_MANAGER"],
    children: [],
  },
  {
    id: 4000,
    title: `queries`,
    description:
      "This page holds the links to the pages where an user can run different queries.",
    path: `/queries`,
    component: <LazyLoadedQueryPagesDashboard />,
    parentId: "root",
    privilegesRequired: ["APP_ACCESS_MANAGER"],
    children: [
      {
        id: 4100,
        title: "user queries",
        description:
          "This page allows the user to make queries related a user eg. get roles by user etc.",
        path: "/query/user",
        component: null,
        parentId: 4000,
        privilegesRequired: ["ACCESS_MANAGER"],
      },
      {
        id: 4200,
        title: "role queries",
        description:
          "This page allows the user to make queries related to roles eg. get privileges by role etc.",
        path: "/query/role",
        component: null,
        parentId: 4000,
        privilegesRequired: ["ACCESS_MANAGER"],
      },
      {
        id: 4300,
        title: "privilege queries",
        description:
          "This page allows the user to make queries related to privileges eg. get roles having a privilege etc.",
        path: "/query/privilege",
        component: null,
        parentId: 4000,
        privilegesRequired: ["ACCESS_MANAGER"],
      },
    ],
  },
];

export default NAV_LINKS;
