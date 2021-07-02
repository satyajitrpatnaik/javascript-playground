import { gql } from "@apollo/client";

export const GET_ALL_APPS = gql`
  query GetAllApps {
    Apps {
      id
      name
      desc
      create_ts
      update_ts
      latest_record
    }
  }
`;

export const GET_SITES = gql`
  query GetSites {
    Sites {
      id
      siteCode
      factoryName
      start_date
      end_date
      latest_record
    }
  }
`;

export const GET_SITE_BY_SITE_CODE = gql`
  query GetSiteBySiteCode($siteCode: String!) {
    Sites(siteCode: $siteCode) {
      id
      siteCode
      factoryName
      start_date
      end_date
      latest_record
    }
  }
`;

export const GET_ALL_PRIVILEGES_BY_APP_ID = gql`
  query GetAllPrivilegesByAppID($appId: String!) {
    Privileges(appkey: $appId) {
      id
      name
      create_ts
      update_ts
      latest_record
      roles {
        id
        name
      }
    }
  }
`;

export const GET_ROLES_BY_APP_ID = gql`
  query GetRolesByAppID($appId: String!) {
    Roles(appkey: $appId) {
      id
      name
      create_ts
      latest_record
      privileges {
        id
        name
      }
      roleType {
        id
        name
      }
      pdlsSiteMap {
        roleid
        pdllist
        create_ts
        update_ts
        latest_record
        site {
          id
          siteCode
          factoryName
          start_date
          end_date
          latest_record
        }
      }
      siteUser {
        user {
          username
          id
          email
          firstname
          lastname
          lastlogin
        }
        site {
          id
          siteCode
          factoryName
          start_date
          end_date
          latest_record
        }
      }
    }
  }
`;

export const GET_ROLE_TYPES_BY_APP_ID = gql`
  query GetRoleTypesByAppID($appId: String!) {
    RoleTypes(appkey: $appId) {
      id
      name
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    Users {
      id
      username
      email
      firstname
      lastname
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  query GetUser($username: String) {
    Users(username: $username) {
      id
      username
      email
      firstname
      lastname
      lastlogin
    }
  }
`;
