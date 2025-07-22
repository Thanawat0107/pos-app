import { MenuCategory } from "./MenuCategory";

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    imageUrl: string;
    preparationNote: string;
    createdAt: string;
    updateAt: string;
    isUsed: boolean;
    isDeleted: boolean;

    menuCategoryId: number;
    menuCategory: MenuCategory
}