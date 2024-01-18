export interface IBaseField {
  $createAt: string
  $id: string
}

export interface ICustomer extends IBaseField {
  Name: string
  email: string
  avatar_url: string
  from_source?: string
}

export interface IComment extends IBaseField {
  text: string
}

export enum EnumStatus {
  'to-do' = 'to-do',
  'to-be-agreed' = 'to-be-agreed',
  'in-progress' = 'in-progress',
  'produced' = 'produced',
  'done' = 'done'
}

export interface IDeal extends IBaseField {
  comments: IComment[]
  customers: ICustomer
  name: string
  price: number
  status: EnumStatus
}
