import {City} from "./city";

export interface Country {
    id: number,
    name: string,
    code: string,
    cities: City[]
}
