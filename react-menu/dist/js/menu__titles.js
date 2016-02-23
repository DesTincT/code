var FSMenuTitle = React.createClass({displayName: "FSMenuTitle",

    render: function(){
        var item = this.props.item;
        return (
            React.createElement("div", {className: "fsm-menu__title row"}, 
                React.createElement("div", {className: "col-xs-2 fsm-menu__dragger"}, React.createElement("div", {className: "glyphicon glyphicon-menu-hamburger"})), 
                React.createElement("div", {className: "col-xs-10 fsm-menu__wrap"}, 
                
                    item.title
                
                )

            )
        )
    }
});

var FSMenuTitles = React.createClass({displayName: "FSMenuTitles",
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
            React.createElement("div", {className: "fsm-menu__titles", ref: "titlesSortable"}, 
                
                    this.state.titles.map(function ( item, index ) {
                        return React.createElement(FSMenuTitle, {key: item.id, item: item})
                    })
                
            )
        )
    }
});
