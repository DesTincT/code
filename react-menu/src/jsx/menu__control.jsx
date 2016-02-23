var FSMenuControlAddMenu = React.createClass({
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
        return <a href="#" className="btn btn-success fsm-menu__add-menu"
            onClick={this.addNewMenu} title="Add menu" data-toggle="tooltip"><span className="fa fa-plus-square-o"></span> Add menu</a>
    }
});

var FSMenuControlSaveMenu = React.createClass({
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
        return <a href="#"
                    className="btn btn-primary pull-right fsm-menu__save-menu"
                    onClick={this.saveMenu}>Save</a>
    }
});

var FSMenuControl = React.createClass({
    render: function(){

        return (
            <div id="fsm-menu__form" className="fsm-menu__main-actions">
                <nav className="navbar navbar-default navbar-static-top border-bottom fsm-menu__navbar">
                    <FSMenuControlAddMenu {...this.props} />
                    <FSMenuControlSaveMenu {...this.props} />
                </nav>
            </div>
        )
    }
});
