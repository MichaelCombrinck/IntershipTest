export interface Product {
  id: number;
  name: string;
  description: string;
  type: 'clothes' | 'food';
  quantity: number;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
  wishlist: boolean;
}
export interface Filters {
  filterName: string;
  items: FilterItems[];
}

export interface FilterItems {
  displayValue: string;
  value: string;
}
