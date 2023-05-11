import { Appreciation } from "./Appreciation";
import { Localisation } from "./Localisation";
import { Order } from "./Order";
import { Restaurant } from "./Restaurant";

export interface User {
    _id: string,
    orders: Order[] | string[] | [],
    restaurants: Restaurant[] | [] | string[],
    appreciations: Appreciation[] | [] | string[],
    fullname: string,
    email: string,
    password: string,
    phone: number,
    imageUrl: string,
    localisation: Localisation
}