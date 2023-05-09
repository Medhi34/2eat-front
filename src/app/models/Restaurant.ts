import { Appreciation } from "./Appreciation";
import { Image } from "./Image";
import { Localisation } from "./Localisation";
import { Meal } from "./Meal";
import { User } from "./User";

export interface Restaurant {
    _id: String,
    name: String,
    phone: Number,
    user: User,
    date_save: Date,
    localisation: Localisation,
    categories: [String],
    images: Map<String, Image>,
    meals: [Meal],
    appreciations: [Appreciation]
}