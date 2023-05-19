import { Restaurant } from "./Restaurant";
import { User } from "./User";

export interface Appreciation {
    _id: string,
    isVoted: boolean,
    review: string,
    date: Date,
    user: User,
    restaurant: Restaurant | string
}