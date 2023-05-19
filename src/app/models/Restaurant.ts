import { Appreciation } from "./Appreciation";
import { Image } from "./Image";
import { Localisation } from "./Localisation";
import { Meal } from "./Meal";
import { User } from "./User";

export interface Restaurant {
    _id: string,
    name: string,
    phone: number,
    user: User | string,
    date_save: Date,
    localisation: Localisation,
    categories: string[],
    nbVotes: number,
    images: Map<string, Image>,
    meals: Meal[] | [] | string[],
    appreciations: Appreciation[] | [] | string[]
}