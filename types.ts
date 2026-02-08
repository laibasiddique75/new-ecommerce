export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  specs: Record<string, string>;
  rating: number;
  reviews: Review[];
  featured?: boolean;
}

export interface Review {
  id: number;
  user: string;
  comment: string;
  rating: number;
  date: string;
}

export enum Category {
  Refrigerators = 'Refrigerators',
  AirConditioners = 'Air Conditioners',
  LEDTVs = 'LED TVs',
  Generators = 'Generators',
  RoomCoolers = 'Room Coolers',
  All = 'All'
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // In a real app, this would be hashed
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  items: CartItem[];
  shippingDetails?: {
    name: string;
    address: string;
    city: string;
  }
}