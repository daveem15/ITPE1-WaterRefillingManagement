export interface Orders {
  fullname: string;
  address: string;
  name: string;
  gallons: number;
  mobile_number: string;
  total: string;
  status: 'Delivered' | 'Pending';
}
