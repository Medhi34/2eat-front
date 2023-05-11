import { Meal } from "./Meal";
import { User } from "./User";

export interface Order {
    _id: string,
    user: User | string,
    meal: Meal | string,
    date: Date,
    quantity: number,
    hot: Boolean,
    spiced: Boolean,
    others: string
}