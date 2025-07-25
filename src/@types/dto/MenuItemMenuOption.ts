import { MenuItem } from "./MenuItem";
import { MenuOption } from "./MenuOption";

export interface MenuItemMenuOption {
    id: number;

    menuItemId: number;
    menuItem: MenuItem;
    menuOptionId: number;
    menuOption: MenuOption;
}