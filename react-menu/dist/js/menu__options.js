/**
 * Menu options for each item
 */
var FSMenuItemOptions = React.createClass({displayName: "FSMenuItemOptions",
    mixins: [FSMenuUpdate],

    getInitialState: function() {

        return {
            item: this.props.item,
            menu: this.props.menu
        };
    },

    addItem: function( event ) {

        var type = event.target.getAttribute('data-type'),
            mode = event.target.getAttribute('data-mode'),
            updatedMenus = this.addMenuItem(this.props.menu, this.props.item, type, mode);

        this.props.updateMenu(updatedMenus);

        event.preventDefault();
    },

    removeItem: function( event ) {

        var updatedMenus = this.removeMenuItem(this.props.menu, this.props.item);

        this.props.updateMenu(updatedMenus);

        event.preventDefault();
    },

    render: function(){
        var item = this.props.item;

        return (
            React.createElement("div", {className: 'col-xs-'+ this.props.xs +' fsm-menu__options'}, 
                React.createElement("div", {className: "glyphicon glyphicon-option-vertical"}), 
                React.createElement("div", {className: "fsm-menu__dropdown-toggle", "data-target": '#fsm-menu__dropdown-' + item.id, "data-toggle": "dropdown"}
                    ), 
                React.createElement("div", {className: "fsm-menu__dropdown", id: 'fsm-menu__dropdown-' + item.id}, 

                    React.createElement("ul", {className: "dropdown-menu dropdown-menu-right", role: "menu"}, 
                        React.createElement("li", null, React.createElement("a", {className: "fsm-menu__dropdown-add", href: "#", 
                            "data-type": "category", 
                            onClick: this.addItem}, "Add category")
                        ), 
                        React.createElement("li", null, React.createElement("a", {href: "#", 
                            "data-type": "dish", 
                            onClick: this.addItem}, "Add dish")
                        ), 
                        React.createElement("li", null, React.createElement("a", {href: "#", 
                            "data-mode": "copy", 
                            onClick: this.addItem}, "Dublicate")
                        ), 
                        React.createElement("li", {role: "separator", className: "divider"}), 
                        React.createElement("li", null, React.createElement("a", {href: "#", 
                            className: "bg-danger", 
                            onClick: this.removeItem}, "Remove")
                        )
                    )
                )
            )

        );
    }
});
