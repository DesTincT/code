var FSMenuFixtures = {

    menu: {

        menu: {
            "id"      : "",
            "type"    : "menu",
            "title"   : "new menu",
            "descr"   : "",
            "weight"  : ""
        },

        category: {
            "id"      : "",
            "type"    : "category",
            "title"   : "New category",
            "descr"   : "",
            "weight"  : ""
        },

        dish: {
            "id"      : "",
            "type"    : "dish",
            "title"   : "New dish",
            "info"    : {
                "price" : "",
                "adds"  : "",
                "wt"    : "",
                "descr"   : ""
            },
            "weight"  : ""
        }

    }

};

/**
 * Helper function for menu update
 * @type {Object}
 */
var FSMenuUpdate = {

    /**
     * Sometimes need to clone object instead of getting link to object
     * @method cloneObject
     * @param  {object}    obj [description]
     * @return {object}        [description]
     */
    cloneObject: function( obj ) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Resets id's of items
     * @param  {object} menu Menu structure
     * @return {object} menu sorted menu
     */
    sortMenu: function( menu ) {
        var i = 0;

        for ( var item in menu ) {
            menu[item].id = i++;
        }

        return menu;
    },

    /**
     * Finds and returns part menu with its sections and dishes
     * @method findMenu
     * @param  {array}      menu        Menu structure
     * @param  {integer}    menu_id     id of the menu to part
     * @return {array}      partMenu    menu array with its sections and dishes
     */
    findMenu: function( menu, menu_id ) {
        var partMenu = [],
            found = 0;

        for ( var item in menu ) {

            if ( menu[item].type == 'menu' && found ) {
                break;
            }

            if ( menu[item].id == menu_id && !found ) {
                partMenu.push(menu[item]);
                found = 1;
            }

            if ( found && menu[item].type !== 'menu' ) {
                partMenu.push(menu[item]);
            }
        }

        return partMenu;
    },

    /**
     * Adds new menu (menu title)
     * @method addMenu
     * @param  {array} menu Menu structure
     */
    addMenu: function( menu ) {

        var fixture = this.cloneObject(FSMenuFixtures.menu['menu']);
        menu.splice(0, 0, fixture);

        return menu;
    },

    /**
     * Adds new item to {menu} after {item}
     * @method addMenuItem
     * @param  {array}     menu     Menu structure
     * @param  {object}    item     Add new item after this {item}
     * @param  {string}    type     Type: category | dish
     * @param  {string}    mode     Mode: 'copy' - dublicates {item}
     * @return {array}     menu     modified array structure
     */
    addMenuItem: function( menu, item, type, mode ) {

        var updated = false;

        for (var menuIndex in menu ) {

            if ( item.id == menu[menuIndex].id ) {
                var fixture = this.cloneObject(mode == 'copy' ? item : FSMenuFixtures.menu[type]);
                menu.splice(++menuIndex, 0, fixture);
                updated = true;
                break;
            }

        }

        return updated ? menu : console.error('Not found: ' + item);
    },


    /**
     * Removes {item} from {menu}
     * @method removeMenuItem
     * @param  {array}  menu
     * @param  {object} item
     * @return {array}     menu     modified array structure
     */
    removeMenuItem: function( menu, item ) {

        var updated = false;

        for ( var menuIndex in menu ) {

            if ( item.id == menu[menuIndex].id ) {
                menu.splice(menuIndex, 1);
                updated = true;
                break;
            }
        }

        return updated ? menu : console.error('Not found: ' + item);
    },

}
