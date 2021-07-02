import { gql } from "@apollo/client";

export const ADD_NEW_SITE = gql`
  fragment NewSite on Site {
    id
    siteCode
    factoryName
    start_date
    end_date
    latest_record
  }
`;

export const ADD_NEW_APP = gql`
  fragment NewApp on App {
    id
    name
    desc
    create_ts
    update_ts
    latest_record
  }
`;

export const ADD_NEW_PRIVILEGE = gql`
  fragment NewPrivilege on Privilege {
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
`;

export const ADD_NEW_ROLE = gql`
  fragment NewRole on Role {
    id
    name
    create_ts
    update_ts
    latest_record
    pdls {
      roleid
      pdllist
      create_ts
      update_ts
      latest_record
    }
    privileges {
      id
      name
      create_ts
      update_ts
      latest_record
    }
    roleType {
      id
      name
      create_ts
      update_ts
      latest_record
    }
    users {
      username
      id
      email
      firstname
      lastname
    }
  }
`;
