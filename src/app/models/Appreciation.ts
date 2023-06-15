import { Restaurant } from "./Restaurant";
import { User } from "./User";

export interface Appreciation {
    _id: string,
    note: number,
    review: string,
    date: Date,
    user: User,
    restaurant: Restaurant | string
}

export class Appreciation implements Appreciation{
    constructor(){
        this.review = "";
    }
}