export interface Model {
  id: string;
}

export interface Character extends Model {
  name: string;
  notes: string;
}

export interface Trap extends Model {
  name: string;
  content: string;
}

export interface Market extends Model {
  name: string;
  characterIds: Array<string>;
  currencyId: string;
}

export interface Currency extends Model {
  name: string;
  characterIds: Array<string>;
}

export interface Divination extends Model {
  content: string;
  name: string;
  characterId: string;
}

export interface Motd extends Model {
  content: string;
  characterId: string;
}

export interface UserPreference {
  name: string;
}

export interface Transaction extends Model {
  amount: number;
  toCharacterId: string;
  fromCharacterId: string;
  currency: string;
  createdByCharacterId: string;
  createdAtEpoch: number;
  notes: string;
}
