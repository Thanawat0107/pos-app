export interface UpdateMenuItem {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  preparationNote: string;
  updateAt: string;
  isUsed: boolean;
  imageFile?: File;

  menuCategoryId: number;
}