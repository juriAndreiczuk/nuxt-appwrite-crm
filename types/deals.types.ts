export interface IBaseField {
  $createAt: string
  $id: string
}

export interface Icustomer extends IBaseField {
  name: string
  email: string
  avatar_url: string
  from_source?: string
}

export interface IComment extends IBaseField {
  text: string
}

export enum EnumStatus {
  'todo' = 'todo',
  'to-be-agread' = 'to-be-agread',
  'in-progress' = 'in-progress',
  'produced' = 'produced',
  'done' = 'done'
}

export interface IDeal extends IBaseField {
  comments: IComment[]
  customers: Icustomer
  name: string
  price: number
  status: EnumStatus
}
