export interface IMenuItem {
  name: string
  url: string
  icon: string
}

export const MENU_DATA: IMenuItem[] = [
  {
    icon: 'radix-icons:dashboard',
    name: 'Home',
    url: '/'
  },
  {
    icon: 'mingcute:group-line',
    name: 'Customers',
    url: '/customers'
  },
]