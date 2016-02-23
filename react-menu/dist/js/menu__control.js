var FSMenuControlAddMenu = React.createClass({displayName: "FSMenuControlAddMenu",
    mixins: [FSMenuUpdate],

    getInitialState: function() {
        return {menu: this.props.menu};
    },

    addNewMenu: function () {
        this.props.menu = this.addMenu(this.props.menu);
        this.props.updateMenu(this.props.menu);
        event.preventDefault();
    },

    render: function(){
        return React.createElement("a", {href: "#", className: "btn btn-success fsm-menu__add-menu", 
            onClick: this.addNewMenu, title: "Add menu", "data-toggle": "tooltip"}, React.createElement("span", {className: "fa fa-plus-square-o"}), " Add menu")
    }
});

var FSMenuControlSaveMenu = React.createClass({displayName: "FSMenuControlSaveMenu",
    mixins: [FSMenuUpdate],

    getInitialState: function() {
        return {
            menu: this.props.menu
        };
    },

    saveMenu: function () {
        alert('Save button pressed');
        event.preventDefault();
    },

    render: function(){
        return React.createElement("a", {href: "#", 
                    className: "btn btn-primary pull-right fsm-menu__save-menu", 
                    onClick: this.saveMenu}, "Save")
    }
});

var FSMenuControl = React.createClass({displayName: "FSMenuControl",
    render: function(){

        return (
            React.createElement("div", {id: "fsm-menu__form", className: "fsm-menu__main-actions"}, 
                React.createElement("nav", {className: "navbar navbar-default navbar-static-top border-bottom fsm-menu__navbar"}, 
                    React.createElement(FSMenuControlAddMenu, React.__spread({},  this.props)), 
                    React.createElement(FSMenuControlSaveMenu, React.__spread({},  this.props))
                )
            )
        )
    }
});
