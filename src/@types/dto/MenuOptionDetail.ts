import { MenuOption } from "./MenuOption";

export interface MenuOptionDetail {
    id: number;
    name: string;
    extraPrice: number;
    note: string;
    isUsed: boolean;
    isDeleted: boolean;

    menuOptionId: number;
    menuOption: MenuOption;
}