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
 * [FSMenuUpdate вспомогательные функции обновления массива меню]
 * @type {Object}
 */
var FSMenuUpdate = {

    cloneObject: function( obj ) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * [sortMenu сортирует меню, выставляет id по порядку]
     * @param  {[type]} menu [ массив ]
     * @return {[type]} menu [ измененный массив ]
     */
    sortMenu: function( menu ) {
        var i = 0;

        for ( item in menu ) {
            menu[item].id = i++;
        }

        return menu;
    },

    /**
     * [findMenu находит меню со всеми его разделами и блюдами]
     * @param  {[type]} menu    [ массив всего меню, this.state ]
     * @param  {[type]} menu_id [ искомый id меню ]
     * @return {[type]}         [ ]
     */
    findMenu: function( menu, menu_id ) {
        var partMenu = [];

        var found = 0;

        for ( var item in menu ) {

            if ( menu[item].type == 'menu' && found ) {
                break;
            }

            if ( menu[item].id == menu_id && !found ) {
                partMenu.push(this.cloneObject(menu[item]));
                found = 1;
            }

            if ( found && menu[item].type !== 'menu' ) {
                partMenu.push(this.cloneObject(menu[item]));
            }
        }

        return partMenu;
    },

    /**
     * [addMenu Добавление меню (тайтл нового меню)]
     * @param {[type]} menu [ массив меню ]
     * @return {[type]}     [ измененный массив ]
     */
    addMenu: function( menu ) {

        var updated = false;
        var fixture = this.cloneObject(FSMenuFixtures.menu['menu']);
        menu.splice(0, 0, fixture);
        updated = true;

        return updated ? menu : console.error('Неизвестная ошибка: addMenu');
    },

    /**
     * [addMenuItem Добавляет объект в массив]
     * @param {[type]} menu [ массив ]
     * @param {[type]} item [ объект, индекс по id ]
     * @param {[type]} type [ какой тип объекта добавить menu|category|dish ]
     * @param {[type]} mode [ режим | copy - копирует item ]
     * @return {[type]}     [ измененный массив ]
     */
    addMenuItem: function( menu, item, type, mode ) {

        var updated = false;

        for ( menuIndex in menu ) {

            if ( item.id == menu[menuIndex].id ) {
                var fixture = this.cloneObject(mode == 'copy' ? item : FSMenuFixtures.menu[type]);
                menu.splice(++menuIndex, 0, fixture);
                updated = true;
                break;
            }

        }

        return updated ? menu : console.error('Не найден элемент меню: ' + item);
    },

    /**
     * [removeMenuItem Удаляет объект из массива]
     * @param  {[type]} menu [ массив ]
     * @param  {[type]} item [ объект, индекс по id ]
     * @return {[type]}      [ измененный массив ]
     */
    removeMenuItem: function( menu, item ) {

        var updated = false;

        for ( menuIndex in menu ) {

            if ( item.id == menu[menuIndex].id ) {
                menu.splice(menuIndex, 1);
                updated = true;
                break;
            }
        }

        return updated ? menu : console.error('Не найден элемент меню: ' + item);
    },

}
