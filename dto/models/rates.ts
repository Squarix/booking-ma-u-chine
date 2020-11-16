import {User} from "./user";

export interface Rates {
    id: number,
    roomId: number,
    userId: number,
    stars: number,
    comment: string,
    user: User,
    room: any
}
