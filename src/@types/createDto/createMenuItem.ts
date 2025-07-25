export interface CreateMenuItem {
    name: string;
    description: string;
    basePrice: number;
    imageUrl: string;
    preparationNote: string;
    createdAt: string;
    imageFile?: File;

    menuCategoryId: number;
}