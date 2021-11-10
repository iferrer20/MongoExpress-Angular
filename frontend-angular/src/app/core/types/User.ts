
export enum UserPrivileges {
  NONE,
  STAFF,
  ADMIN
}

export interface User {
  _id: string,
  username: string,
  email: string,
  privileges: UserPrivileges,
  followers: number,
  favorites?: [{
    name: string,
    state: string,
    slug: string
  }],
  karma: {
    avg: number,
    num: number
  }
}
