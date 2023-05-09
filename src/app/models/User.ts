import { Appreciation } from "./Appreciation";
import { Localisation } from "./Localisation";
import { Order } from "./Order";
import { Restaurant } from "./Restaurant";

export interface User {
    _id: String,
    orders: [Order],
    restaurants: [Restaurant],
    appreciations: [Appreciation],
    name: String,
    surname: String,
    email: String,
    password: String,
    phone: Number,
    imageUrl: String,
    localisation: Localisation
}