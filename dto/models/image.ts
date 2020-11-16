import {Room} from "./room";

export interface Image {
    id: number,
    imagePath: string,
    roomId: number,
    isMain: boolean,
    room: Room
}
