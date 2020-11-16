import {User} from "./user";

export interface Booking {
    id: number,
    roomId: number,
    userId: number,
    status: string,
    arriveDate: Date,
    endDate: Date,
    price: number,
    user: User
}
