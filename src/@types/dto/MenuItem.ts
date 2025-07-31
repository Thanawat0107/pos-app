import { MenuItemOption } from "./MenuItemOption";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  imageUrl?: string;
  menuRecipe: string;
  createdAt: string;
  updateAt: string;
  isUsed: boolean;
  isDeleted: boolean;

  menuCategoryId?: number | null;
  menuCategoryName?: string | null;

  menuItemOptions: MenuItemOption[];
}