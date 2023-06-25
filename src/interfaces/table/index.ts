import { OrderInterface } from 'interfaces/order';
import { WaitStaffAssignmentInterface } from 'interfaces/wait-staff-assignment';
import { RestaurantInterface } from 'interfaces/restaurant';
import { GetQueryInterface } from 'interfaces';

export interface TableInterface {
  id?: string;
  status: string;
  restaurant_id: string;
  created_at?: any;
  updated_at?: any;
  order?: OrderInterface[];
  wait_staff_assignment?: WaitStaffAssignmentInterface[];
  restaurant?: RestaurantInterface;
  _count?: {
    order?: number;
    wait_staff_assignment?: number;
  };
}

export interface TableGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  restaurant_id?: string;
}
