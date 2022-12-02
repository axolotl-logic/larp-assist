export interface Model {
  id: string
}

export interface Market extends Model {
  name: string
  userIds: Array<string>
  currencyId: string
}

export interface Currency extends Model {
  name: string
  userIds: Array<string>
}

export interface Divination extends Model {
  content: string
  name: string
  userId: string
}

export interface Motd extends Model {
  content: string
  userId: string
}

export interface UserPreference {
  userId: string
  name: string
}

export interface Transaction extends Model {
  amount: number
  toUserId: string
  fromUserId: string
  currency: string
  notes: string
}
