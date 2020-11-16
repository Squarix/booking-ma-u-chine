import {Category} from "./category";

export interface Filter {
    id: number,
    filter: string,
    categoryId: number,
    category: Category
}
