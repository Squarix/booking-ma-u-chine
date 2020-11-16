import {City} from "./city";
import {User} from "./user";
import {Image} from "./image";
import {Filter} from "./filter";

export interface Room {
    id: number,
    guestsAmount: number,
    size: number,
    address: string,
    cityId: number,
    city: City,
    description: string,
    userId: number,
    user: User,
    status: string,
    todayPrice: number,
    images: Image[],
    filters: Filter[],
}
