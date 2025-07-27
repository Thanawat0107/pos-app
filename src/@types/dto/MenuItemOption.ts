import { MenuItem } from "./MenuItem";
import { MenuOption } from "./MenuOption";

export interface MenuItemOption {
    id: number;

    menuItemId: number;
    menuItem: MenuItem;
    menuOptionId: number;
    menuOption: MenuOption;
}