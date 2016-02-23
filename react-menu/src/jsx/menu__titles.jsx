var FSMenuTitle = React.createClass({

    render: function(){
        var item = this.props.item;
        return (
            <div className="fsm-menu__title row">
                <div className="col-xs-2 fsm-menu__dragger"><div className="glyphicon glyphicon-menu-hamburger"></div></div>
                <div className="col-xs-10 fsm-menu__wrap">
                {
                    item.title
                }
                </div>

            </div>
        )
    }
});

var FSMenuTitles = React.createClass({
    mixins: [SortableMixin, FSMenuUpdate],

    sortableOptions: {
        group: "titles",
        model: 'titles',
        draggable: ".fsm-menu__title",
        handle: ".fsm-menu__dragger",
        ghostClass: "fsm-menu__title_drop",
        ref: 'titlesSortable'
    },

    getInitialState: function() {
        return {
            titles: this.props.titles
        };
    },

    handleSort: function ( evt ) {

        var updatedMenu = [];

        this.state.titles.map(function ( title, index ) {

            var foundedMenu = this.findMenu( this.props.menu, title.id );

            for ( index in foundedMenu ) {
                updatedMenu.splice(updatedMenu.length, 0, foundedMenu[index]);
            }

        }.bind(this));


        this.props.updateMenu(updatedMenu);
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            titles: nextProps.titles
        });
    },

    render: function(){

        return (
            <div className="fsm-menu__titles" ref="titlesSortable">
                {
                    this.state.titles.map(function ( item, index ) {
                        return <FSMenuTitle key={item.id} item={item} />
                    })
                }
            </div>
        )
    }
});
