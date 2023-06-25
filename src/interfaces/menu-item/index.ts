import { OrderItemInterface } from 'interfaces/order-item';
import { MenuInterface } from 'interfaces/menu';
import { GetQueryInterface } from 'interfaces';

export interface MenuItemInterface {
  id?: string;
  name: string;
  price: number;
  menu_id: string;
  created_at?: any;
  updated_at?: any;
  order_item?: OrderItemInterface[];
  menu?: MenuInterface;
  _count?: {
    order_item?: number;
  };
}

export interface MenuItemGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  menu_id?: string;
}
