import PageTiles from "app/views/shared/components/PageTiles";
import NAV_LINKS from "app/utils/constants/navlinks";

const queryPages = NAV_LINKS.find((page) => page.id === 4000).children;

const QueryPagesDashboard = () => {
  return <PageTiles pages={queryPages} />;
};

export default QueryPagesDashboard;
