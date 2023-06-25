import { UserInterface } from 'interfaces/user';
import { TableInterface } from 'interfaces/table';
import { GetQueryInterface } from 'interfaces';

export interface WaitStaffAssignmentInterface {
  id?: string;
  user_id: string;
  table_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  table?: TableInterface;
  _count?: {};
}

export interface WaitStaffAssignmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  table_id?: string;
}
