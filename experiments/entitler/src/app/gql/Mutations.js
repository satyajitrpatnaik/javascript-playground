import { gql } from "@apollo/client";

export const SAVE_SITE = gql`
  mutation SaveSite(
    $id: ID
    $siteCode: String!
    $factoryName: String!
    $latestRecord: String
  ) {
    saveSite(
      site: {
        id: $id
        siteCode: $siteCode
        factoryName: $factoryName
        latest_record: $latestRecord
      }
    ) {
      id
      siteCode
      factoryName
      start_date
      end_date
      latest_record
    }
  }
`;

export const SAVE_APP = gql`
  mutation SaveApp(
    $id: ID
    $name: String!
    $desc: String!
    $latest_record: String!
  ) {
    saveApp(
      app: { id: $id, name: $name, desc: $desc, latest_record: $latest_record }
    ) {
      id
      name
      desc
    }
  }
`;

export const SAVE_PRIVILEGE = gql`
  mutation SavePrivilege(
    $id: ID
    $name: String!
    $appId: Int!
    $latestRecord: String!
  ) {
    savePrivilege(
      privilege: {
        id: $id
        name: $name
        domainId: $appId
        latest_record: $latestRecord
      }
    ) {
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

export const SAVE_ROLE = gql`
  mutation SaveRole(
    $role: RoleInput!
    $privilegeIds: [Int]!
    $siteUsers: [SiteUserInput]!
  ) {
    saveRole(role: $role, privilegeIds: $privilegeIds, siteUsers: $siteUsers) {
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

/**
 * Query Variables for SaveRole:
 * 
 * {
	"role": {
    "id": 2,
    "name": "PHO_ADMIN_EDITED",
    "domainId": 1,
    "latest_record": "Y",
    "roleTypeId": 2,
    "pdlsSiteMap": [
      {
        "pdllist": "ADL-Philippines-Employees@ad.shared",
        "latest_record": "Y",
        "siteid": 21
      }
    ]
  },
  "privilegeIds": [1, 2],
  "siteUsers": [{
    "userId": 2,
    "siteId": 21
  }]
}
 */
