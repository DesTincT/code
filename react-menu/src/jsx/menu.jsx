/** @jsx React.DOM */
var PureRenderMixin = React.addons.PureRenderMixin;

require([
    'menu__update-mix',
    'menu__input-mix',
    'menu__inputs',
    'menu__items',
    'menu__options',
    'menu__control',
    'menu__titles'
]);

var dataMenu = {
  "menu":
    [
        {
            "id"      : 1,
            "type"    : "menu",
            "title"   : "Menu 1",
            "descr"   : "Very nice menu 1",
            "info"    : {
                "adds" : "",
                "wt" : ""
            },
            "weight"  : 1
        },
        {
            "id"      : 2,
            "type"    : "category",
            "title"   : "Drinks",
            "descr"   : "Juices and Waters",
            "info"    : {
                "adds" : "100/400",
                "wt" : "500ml"
            },
            "weight"  : 2
        },
        {
            "id"      : 3,
            "type"    : "dish",
            "title"   : "Apple Pie",
            "descr"   : "Tasty and fresh",
            "info"    : {
                "price" : "150",
                "adds"  : "",
                "wt"    : "10/500/44"
            },
            "weight"  : 3
        },

        {
            "id"      : 4,
            "type"    : "menu",
            "title"   : "Hot!",
            "descr"   : "Primary discounts and actions",
            "info"    : {
                "adds" : "",
                "wt" : ""
            },
            "weight"  : 1
        },

        {
            "id"      : 5,
            "type"    : "category",
            "title"   : "Soup",
            "descr"   : "Any soup of your choice",
            "info"    : {
                "adds" : "",
                "wt" : ""
            },
            "weight"  : 2
        },

        {
            "id"      : 6,
            "type"    : "dish",
            "title"   : "Borsch",
            "descr"   : "russian main cuisine",
            "info"    : {
                "price" : "150",
                "adds"  : "",
                "wt"    : "10/500/44"
            },
            "weight"  : 3
        }
    ]
};

var FSMenu = React.createClass({
    mixins: [SortableMixin, FSMenuUpdate],

    getInitialState: function() {
        return {
            menu: this.sortMenu(this.addMenu([]))
        };
    },

    componentDidMount: function() {
        if ( this.isMounted() ) {
            $('body').tooltip({
              selector: '[data-toggle=tooltip]',
              template : '<div class="tooltip fsm-menu__tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner fsm-menu__tooltip-inner"></div></div>'
            });
            // grab data with ajax here
            this.updateMenu(dataMenu.menu);
        }
    },

    updateMenu: function( menu ) {
        var updatedMenu = this.sortMenu(menu);
        this.setState({ menu: updatedMenu });

    },

    sortableOptions: {
        group: "menu",
        model: 'menu',
        draggable: ".fsm-menu__item_draggable",
        handle: ".fsm-menu__dragger",
        ghostClass: "fsm-menu__item_drop",
        ref: 'menuSortable'
    },

    handleSort: function ( evt ) {
        //this.updateMenu(this.state.menu);
    },

    render: function() {
        var that = this,
            menu = this.state.menu,
            titles = [];


        menu.map(function ( item, index ) {

            if ( item.type == 'menu' ) {
                titles.push(item);
            }

        });

        return (
            <div className="row">
                <div className="col-md-8">
                    <FSMenuControl
                        menu={menu}
                        updateMenu={this.updateMenu} />

                    <div className="fsm-menu__container container-fluid" ref="menuSortable">
                    {
                        menu.map(function ( item, index ) {

                            return <FSMenuItem key={item.id} menu={menu} item={item} updateMenu={that.updateMenu} />
                        })
                    }
                    </div>
                </div>

                <StateView data={this.state.menu} />
            </div>

        );
    }
});


var StateView = React.createClass({
  render: function() {
    return (
      <pre id="fsm-json">{JSON.stringify(this.props.data, 0, 2)}</pre>
    )
  }
});

React.addons.Perf.start();
React.render(
    <FSMenu />,
    document.getElementById('fsm-menu')
);
React.addons.Perf.stop();
    React.addons.Perf.printInclusive();
