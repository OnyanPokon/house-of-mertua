export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'crispy-chicken',
    name: 'Crispy Chicken Burger',
    description:
      'Ayam krispi premium dengan saus spesial House of Mertua, selada segar, dan keju lumer.',
    price: 18000,
    image: './image_assets/crispy_chicken.png',
    tag: 'Best Seller',
  },
  {
    id: 'original-patty',
    name: 'Original Patty Burger',
    description:
      'Daging ayam pilihan dengan bumbu rahasia yang dipanggang sempurna, disajikan dengan selada segar dan bawang bombay.',
    price: 18000,
    image: './image_assets/patty.png',
  },
  {
    id: 'max-combo',
    name: 'Max Combo Burger',
    description:
      'Kenikmatan maksimal dengan crispy plus patty chicken, extra keju,dan extra selada',
    price: 26000,
    image: './image_assets/max_combo.png',
    tag: 'Extreme',
  },
];