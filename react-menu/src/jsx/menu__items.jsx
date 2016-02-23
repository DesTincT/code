/**
 * Item types in menu: title, category, dish
 */
var FSMenuItemTitle = React.createClass({

    render: function(){
        var item = this.props.item;

        return (
            <div className="fsm-menu__row">
                <FSMenuItemInput name="title" xs="11" title="Menu name" {...this.props} />
                <FSMenuItemOptions xs="1" {...this.props} />
            </div>
        );
    }
});

var FSMenuItemCategory = React.createClass({

    render: function(){
        var item = this.props.item;

        return (
            <div className="fsm-menu__row">
                <div className="col-xs-2 fsm-menu__dragger">
                    <div className="glyphicon glyphicon-menu-hamburger"></div>
                </div>

                <FSMenuItemInput {...this.props}
                    name="title"
                    xs="6"
                    placeholder="Category"
                    title="Category"  />

                <FSMenuItemTextarea {...this.props}
                    name="descr"
                    xs="3"
                    placeholder="Category description"
                    title="Category description"  />

                <FSMenuItemOptions xs="1" {...this.props} />
            </div>
        )
    }
});


var FSMenuItemDish = React.createClass({

    render: function(){
        var item = this.props.item;

        return (
            <div className="fsm-menu__row">
                <div className="col-xs-2 fsm-menu__dragger">
                  <div className="glyphicon glyphicon-menu-hamburger"></div>
                </div>

                <FSMenuItemInput {...this.props}
                    name="title"
                    xs="5"
                    placeholder="Name"
                    title="Name" />

                <FSMenuItemInput {...this.props}
                    name="info:price"
                    xs="2"
                    placeholder="Price"
                    title="Price" />

                <FSMenuItemInput {...this.props}
                    name="info:wt"
                    xs="2"
                    placeholder="Weight"
                    title="Weight" />


                <FSMenuItemOptions xs="1" {...this.props} />

                <FSMenuItemTextarea {...this.props}
                    name="descr"
                    xs="6"
                    placeholder="Dish description"
                    title="Dish description"  />
            </div>
      );
    }
});

/**
 * Wrapper for menu item
 */
var FSMenuItem = React.createClass({

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
                menuItem = <FSMenuItemTitle {...that.props} />
            } break;
            case 'category': {
                menuItem = <FSMenuItemCategory {...that.props} />
            } break;
            case 'dish': {
                menuItem = <FSMenuItemDish {...that.props} />
            } break;

        }

        if ( item.type !== 'menu' || (item.id !== 0) ) {
            fsmClass += ' fsm-menu__item_draggable';
        }

        return (
            <div key={item.id} className={fsmClass}>
                {menuItem}
            </div>
        )
    }
});
