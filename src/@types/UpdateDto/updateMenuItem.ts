export interface UpdateMenuItem {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  menuRecipe: string;
  updateAt: string;
  isUsed: boolean;
  imageFile?: File;

  menuCategoryId: number;
}