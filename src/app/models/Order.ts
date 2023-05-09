import { Meal } from "./Meal";
import { User } from "./User";

export interface Order {
    _id: String,
    user: User,
    meal: Meal,
    date: Date,
    quantity: Number,
    hot: Boolean,
    spiced: Boolean,
    others: String
}