export const ACCESS_MANAGER_API_ENDPOINT = {
  // local: "http://localhost:8585/access-manager-api/graphql", // local
  local:
    "http://access-manager-api-dev.edge-dev.wdc.com/access-manager-api/graphql", // direct hit
  dev: "http://common-gateway-dev.edge-dev.wdc.com/access-manager-api/graphql", // through common gateway
};

export const USER_INFO_API_ENDPOINT = {
  dev: "http://common-gateway-dev.edge-dev.wdc.com/users/me",
};

export function getUserInfoApiEndpoint() {
  const hostname = window.location.hostname;
  let userInfoApiEndpoint = "";
  if (hostname.includes("dev")) {
    userInfoApiEndpoint = USER_INFO_API_ENDPOINT.dev;
  }
  return userInfoApiEndpoint;
}

export function getAccessManagerApiEndpoint() {
  const hostname = window.location.hostname;
  let accessManagerApiEndpoint = "";
  if (hostname.includes("localhost")) {
    accessManagerApiEndpoint = ACCESS_MANAGER_API_ENDPOINT.local;
  }
  if (hostname.includes("dev")) {
    accessManagerApiEndpoint = ACCESS_MANAGER_API_ENDPOINT.dev;
  }
  return accessManagerApiEndpoint;
}
