import { Restaurant } from "./Restaurant";

export interface DisplayedRestaurant {
    restaurant:Restaurant,
    distance:number,
    rate:number
}

export enum COLORS{
    GRAY = "var(--ion-color-medium)",
    YELLOW = "var(--ion-color-warning)"
}

export enum POSITION{
    START = "flex-start",
    END = "flex-end",
    CENTER = "center",
    EVENLY = "space-evenly"
}