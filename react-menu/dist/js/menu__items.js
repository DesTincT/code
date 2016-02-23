/**
 * Item types in menu: title, category, dish
 */
var FSMenuItemTitle = React.createClass({displayName: "FSMenuItemTitle",

    render: function(){
        var item = this.props.item;

        return (
            React.createElement("div", {className: "fsm-menu__row"}, 
                React.createElement(FSMenuItemInput, React.__spread({name: "title", xs: "11", title: "Menu name"},  this.props)), 
                React.createElement(FSMenuItemOptions, React.__spread({xs: "1"},  this.props))
            )
        );
    }
});

var FSMenuItemCategory = React.createClass({displayName: "FSMenuItemCategory",

    render: function(){
        var item = this.props.item;

        return (
            React.createElement("div", {className: "fsm-menu__row"}, 
                React.createElement("div", {className: "col-xs-2 fsm-menu__dragger"}, 
                    React.createElement("div", {className: "glyphicon glyphicon-menu-hamburger"})
                ), 

                React.createElement(FSMenuItemInput, React.__spread({},  this.props, 
                    {name: "title", 
                    xs: "6", 
                    placeholder: "Category", 
                    title: "Category"})), 

                React.createElement(FSMenuItemTextarea, React.__spread({},  this.props, 
                    {name: "descr", 
                    xs: "3", 
                    placeholder: "Category description", 
                    title: "Category description"})), 

                React.createElement(FSMenuItemOptions, React.__spread({xs: "1"},  this.props))
            )
        )
    }
});


var FSMenuItemDish = React.createClass({displayName: "FSMenuItemDish",

    render: function(){
        var item = this.props.item;

        return (
            React.createElement("div", {className: "fsm-menu__row"}, 
                React.createElement("div", {className: "col-xs-2 fsm-menu__dragger"}, 
                  React.createElement("div", {className: "glyphicon glyphicon-menu-hamburger"})
                ), 

                React.createElement(FSMenuItemInput, React.__spread({},  this.props, 
                    {name: "title", 
                    xs: "5", 
                    placeholder: "Name", 
                    title: "Name"})), 

                React.createElement(FSMenuItemInput, React.__spread({},  this.props, 
                    {name: "info:price", 
                    xs: "2", 
                    placeholder: "Price", 
                    title: "Price"})), 

                React.createElement(FSMenuItemInput, React.__spread({},  this.props, 
                    {name: "info:wt", 
                    xs: "2", 
                    placeholder: "Weight", 
                    title: "Weight"})), 


                React.createElement(FSMenuItemOptions, React.__spread({xs: "1"},  this.props)), 

                React.createElement(FSMenuItemTextarea, React.__spread({},  this.props, 
                    {name: "descr", 
                    xs: "6", 
                    placeholder: "Dish description", 
                    title: "Dish description"}))
            )
      );
    }
});

/**
 * Wrapper for menu item
 */
var FSMenuItem = React.createClass({displayName: "FSMenuItem",

    getInitialState: function() {
        return {
            item: this.props.item,
            menu: this.props.menu
        };
    },

    render: function(){
        var that = this,
            item = this.props.item,
            menu = this.props.menu,
            fsmClass = "row fsm-menu__item fsm-menu__item_" + item.type,
            menuItem = false;

        // разные шаблоны в зависимости от типа объекта
        switch ( item.type ) {
            case 'menu': {
                menuItem = React.createElement(FSMenuItemTitle, React.__spread({},  that.props))
            } break;
            case 'category': {
                menuItem = React.createElement(FSMenuItemCategory, React.__spread({},  that.props))
            } break;
            case 'dish': {
                menuItem = React.createElement(FSMenuItemDish, React.__spread({},  that.props))
            } break;

        }

        if ( item.type !== 'menu' || (item.id !== 0) ) {
            fsmClass += ' fsm-menu__item_draggable';
        }

        return (
            React.createElement("div", {key: item.id, className: fsmClass}, 
                menuItem
            )
        )
    }
});
