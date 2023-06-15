import { Meal } from "./Meal";
import { User } from "./User";

export interface Order {
    _id: string,
    user: User | string,
    meal: Meal,
    date: Date,
    quantity: number,
    hot: Boolean,
    spiced: Boolean,
    others: string,
    accompagnement: string
}

export class Order {
    constructor(){
        this.quantity = 1;
        this.hot = true;
        this.spiced = false;
        this.others = "";
        this.accompagnement = "";
    }
}