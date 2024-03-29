import { User } from 'src/app/core/types/User';
import { Category } from './Category';
import { UserComment } from './User';

/*
Product:
      * _id: ObjectId
      * owner: Profile
      * category: Category
      * priceEurCent: Number
      * name: String
      * description: String
      * quality: String (one of ProductQuality)
      * date_published: Date
      * views: Number
      * likes: Number
*/

export interface Product {
  id: string,
  owner: User,
  category: Category,
  name: string,
  description: string,
  quality: string,
  datePublished: Date,
  views: number,
  likes: number,
  rating: number,
  userRating: number | null,
  slug: string,
  state: string,
  isFavorited: boolean,
  image: boolean,
  comments: UserComment[]
}

export interface ProductList {
  list: Product[],
  total: number
}

export const qualities: string[] = [
  'New', 
  'LikeNew', 
  'MinorDamages', 
  'Decrepit', 
  'Broken'
];

export const orders: string[] = [
  'FavFirst',
  'ViewsFirst',
  'NewFirst'
];

export const states: string[] = [
  'Available',
  'Reserved',
  'Sold'
];

export interface ProductFilters {
  [key: string]: any,
  text?: string,
  category?: string,
  author?: string,
  order?: string,
  quality?: string,
  page?: number
}

