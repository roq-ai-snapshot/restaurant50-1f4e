import { OrderItemInterface } from 'interfaces/order-item';
import { TableInterface } from 'interfaces/table';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  table_id: string;
  customer_id: string;
  status: string;
  created_at?: any;
  updated_at?: any;
  order_item?: OrderItemInterface[];
  table?: TableInterface;
  user?: UserInterface;
  _count?: {
    order_item?: number;
  };
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  table_id?: string;
  customer_id?: string;
  status?: string;
}
