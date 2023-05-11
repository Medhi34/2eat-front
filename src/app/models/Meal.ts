import { Image } from "./Image";
import { Restaurant } from "./Restaurant";

export interface Meal {
    _id: string,
    name: string,
    images: Map<string, Image>,
    accompagnements: string[],
    price: number,
    restaurant: Restaurant | null,
    isFavourite: boolean
}