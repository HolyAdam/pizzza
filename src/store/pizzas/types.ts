export type FetchPizzasArgs = {
  currentPage: number
  sortBy: string
  categoryInReq: string
  order: string
  searchInReq: string
}

export type PizzaItem = {
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  id: string;
  category: number;
  rating: number;
  imageUrl: string;
};

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status
}