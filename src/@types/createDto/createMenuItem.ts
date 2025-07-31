export interface CreateMenuItem {
    name: string;
    description: string;
    basePrice: number;
    imageUrl: string;
    menuRecipe: string;
    createdAt: string;
    imageFile?: File;

    menuCategoryId: number;
}