export interface Market {
  name: string
  userIds: Array<string>
  currencyIds: Array<string>
  id: string
}

export interface Currency {
  name: string
  userIds: Array<string>
  id: string
}

export interface Divination {
  content: string
  name: string
  userId: string
  id: string
}

export interface Motd {
  content: string
  userId: string
  id: string
}

export interface UserPreference {
  userId: string
  name: string
}
