import { Restaurant } from "./Restaurant";
import { User } from "./User";

export interface Appreciation {
    _id: String,
    rating: Number,
    review: String,
    date: Date,
    user: User,
    restaurant: Restaurant
}