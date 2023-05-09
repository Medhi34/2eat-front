import { Image } from "./Image";
import { Restaurant } from "./Restaurant";

export interface Meal {
    _id: String,
    name: String,
    images: Map<String, Image>,
    accompagnements: [String],
    prix: Number,
    restaurant: Restaurant
}