import { MenuItemInterface } from 'interfaces/menu-item';
import { RestaurantInterface } from 'interfaces/restaurant';
import { GetQueryInterface } from 'interfaces';

export interface MenuInterface {
  id?: string;
  restaurant_id: string;
  created_at?: any;
  updated_at?: any;
  menu_item?: MenuItemInterface[];
  restaurant?: RestaurantInterface;
  _count?: {
    menu_item?: number;
  };
}

export interface MenuGetQueryInterface extends GetQueryInterface {
  id?: string;
  restaurant_id?: string;
}
