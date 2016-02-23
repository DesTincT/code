/**
 * Menu options for each item
 */
var FSMenuItemOptions = React.createClass({
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
            <div className={'col-xs-'+ this.props.xs +' fsm-menu__options'}>
                <div className="glyphicon glyphicon-option-vertical"></div>
                <div className="fsm-menu__dropdown-toggle" data-target={'#fsm-menu__dropdown-' + item.id} data-toggle="dropdown">
                    </div>
                <div className="fsm-menu__dropdown" id={'fsm-menu__dropdown-' + item.id}>

                    <ul className="dropdown-menu dropdown-menu-right" role="menu">
                        <li><a className="fsm-menu__dropdown-add" href="#"
                            data-type="category"
                            onClick={this.addItem}>Add category</a>
                        </li>
                        <li><a href="#"
                            data-type="dish"
                            onClick={this.addItem}>Add dish</a>
                        </li>
                        <li><a href="#"
                            data-mode="copy"
                            onClick={this.addItem}>Dublicate</a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li><a href="#"
                            className="bg-danger"
                            onClick={this.removeItem}>Remove</a>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
});
