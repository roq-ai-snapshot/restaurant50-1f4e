import axios from 'axios';
import queryString from 'query-string';
import { WaitStaffAssignmentInterface, WaitStaffAssignmentGetQueryInterface } from 'interfaces/wait-staff-assignment';
import { GetQueryInterface } from '../../interfaces';

export const getWaitStaffAssignments = async (query?: WaitStaffAssignmentGetQueryInterface) => {
  const response = await axios.get(`/api/wait-staff-assignments${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createWaitStaffAssignment = async (waitStaffAssignment: WaitStaffAssignmentInterface) => {
  const response = await axios.post('/api/wait-staff-assignments', waitStaffAssignment);
  return response.data;
};

export const updateWaitStaffAssignmentById = async (id: string, waitStaffAssignment: WaitStaffAssignmentInterface) => {
  const response = await axios.put(`/api/wait-staff-assignments/${id}`, waitStaffAssignment);
  return response.data;
};

export const getWaitStaffAssignmentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/wait-staff-assignments/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteWaitStaffAssignmentById = async (id: string) => {
  const response = await axios.delete(`/api/wait-staff-assignments/${id}`);
  return response.data;
};
