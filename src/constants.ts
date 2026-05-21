import crispyChickenImg from '@/assets/images/crispy_chicken_burger_1779104572123.png';
import originalPattyImg from '@/assets/images/original_patty_burger_1779104588340.png';
import maxComboImg from '@/assets/images/max_combo_burger_extreme_1779104605992.png';

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
    image: crispyChickenImg,
    tag: 'Best Seller',
  },
  {
    id: 'original-patty',
    name: 'Original Patty Burger',
    description:
      'Daging ayam pilihan dengan bumbu rahasia yang dipanggang sempurna, disajikan dengan selada segar dan bawang bombay.',
    price: 18000,
    image: originalPattyImg,
  },
  {
    id: 'max-combo',
    name: 'Max Combo Burger',
    description:
      'Kenikmatan maksimal dengan crispy plus patty chicken, extra keju,dan extra selada',
    price: 26000,
    image: maxComboImg,
    tag: 'Extreme',
  },
];