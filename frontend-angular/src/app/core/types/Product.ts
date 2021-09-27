import Category from './Category';

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

export default interface Product {
    _id: string,
    owner: any,
    category: Category,
    name: string,
    description: string,
    price: number,
    quality: string,
    datePublished: Date,
    views: number,
    likes: number
}