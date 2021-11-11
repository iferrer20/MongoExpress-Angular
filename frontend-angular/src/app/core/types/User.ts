
export enum UserPrivileges {
  NONE,
  STAFF,
  ADMIN
}

export interface User {
  id: string,
  username: string,
  email?: string,
  privileges: UserPrivileges,
  followers: number,
  following: number,
  areYouFollowing?: boolean,
  lastFollowers?: {
    id: string,
    username: string
  }[],
  lastFollowing?: {
    id: string,
    username: string
  }[],
  favorites?: {
    name: string,
    state: string,
    slug: string
  }[],
  karma: {
    avg: number,
    num: number
  }
}

export interface UserComment {
  id?: string,
  text: string,
  commentReplied: UserComment,
  repliedComments: UserComment[],
  user: User
}