
export interface MenuItem {
  title?: string;
  icon?: string;
  link?: string;
  home?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Home',
    icon: 'home',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'Services / Products',
    icon: 'services',
    link: '/pages/services',
    home: false
  },
  {
    title: 'Staff',
    icon: 'staff',
    link: '/pages/staff',
    home: false
  },
  {
    title: 'Customers / Leads',
    icon: 'customers',
    link: '/pages/customers',
    home: false
  },
  {
    title: 'Your Business Bookings',
    icon: 'calendar2',
    link: '/pages/bookfon-services',
    home: false
  },
  // {
  //   title: 'Payments',
  //   icon: 'payments',
  //   link: '/pages/payments',
  //   home: false
  // },
  // {
  //   title: 'Banking',
  //   icon: 'bank',
  //   link: '/pages/banking',
  //   home: false
  // },
  // {
  //   title: 'Sales Channels',
  //   icon: 'sales',
  //   link: '/pages/sales-channels',
  //   home: false
  // },
  // {
  //   title: 'Bookfon Add-on Services',
  //   icon: 'bookfon-services',
  //   link: '/pages/bookfon-services',
  //   home: false
  // },
];

export const MENU_ITEMS_SETTINGS: MenuItem[] = [
  {
    title: 'Settings',
    icon: 'setting',
    link: '/pages/settings',
    home: false,
  },
  // {
  //   title: 'Help',
  //   icon: 'help',
  //   link: '/pages/help',
  //   home: false
  // },
  {
    title: 'Log Out',
    icon: 'logout',
    link: '/pages/logout',
    home: false
  }
];

export const MENU_ITEMS_STAFF: MenuItem[] = [
  {
    title: 'Home',
    icon: 'home',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'Staff',
    icon: 'staff',
    link: '/pages/staff',
    home: false
  },
];

export const MENU_ITEMS_SETTINGS_STAFF: MenuItem[] = [
  {
    title: 'Log Out',
    icon: 'logout',
    link: '/pages/logout',
    home: false
  }
];