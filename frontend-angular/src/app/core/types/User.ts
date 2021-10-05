
export enum UserPrivileges {
  NONE,
  STAFF,
  ADMIN
}

export interface User {
  uid: string,
  privileges: UserPrivileges
}
