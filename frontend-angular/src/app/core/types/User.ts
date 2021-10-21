
export enum UserPrivileges {
  NONE,
  STAFF,
  ADMIN
}

export interface User {
  _id: string,
  username: string,
  email: string,
  privileges: UserPrivileges
}
