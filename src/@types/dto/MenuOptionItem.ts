import { MenuOption } from "./MenuOption";

export interface MenuOptionItem {
    id: number;
    name: string;
    extraPrice: number;
    isUsed: boolean;
    isDeleted: boolean;

    menuOptionId: number;
    menuOption: MenuOption;
}