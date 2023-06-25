const mapping: Record<string, string> = {
  menus: 'menu',
  'menu-items': 'menu_item',
  orders: 'order',
  'order-items': 'order_item',
  restaurants: 'restaurant',
  tables: 'table',
  users: 'user',
  'wait-staff-assignments': 'wait_staff_assignment',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
