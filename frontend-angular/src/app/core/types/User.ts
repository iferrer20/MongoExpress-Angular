
export enum UserPrivileges {
  NONE,
  STAFF,
  ADMIN
}

export interface User {
  id: string,
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

export interface UserComment {
  id?: string,
  text: string,
  repply?: string,
  user: User
}