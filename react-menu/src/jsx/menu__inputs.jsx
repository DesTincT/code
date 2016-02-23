/**
 * Input types
 */
var FSMenuItemInput = React.createClass({
    mixins: [FSMenuInputMixin],

    getInitialState: function() {
        return {
            item: this.props.item,
            menu: this.props.menu
        }
    },

    render: function(){
        var xs = this.props.xs || 6,
            item = this.props.item,
            classes = 'col-xs-'+ xs +' fsm-menu__wrap';

        var value = this.findValue(item, this.props.name);

        return (
            <div className={classes}>
                <input
                    type="text"
                    className="form-control fsm-menu__input"
                    data-toggle="tooltip"
                    data-key={this.props.name}
                    title={this.props.title}
                    value={value}
                    onChange={this.inputChange} />
            </div>

        );
    }
});

var FSMenuItemTextarea = React.createClass({
    mixins: [FSMenuInputMixin],

    getInitialState: function() {
        return {
            item: this.props.item,
            menu: this.props.menu
        }
    },

    render: function(){
        var xs = this.props.xs || 6,
            item = this.props.item,
            classes = 'col-xs-'+ xs +' fsm-menu__wrap';

        var value = this.findValue(item, this.props.name);

        return (
            <div className={classes}>
                <textarea
                    className="form-control fsm-menu__textarea"
                    data-toggle="tooltip"
                    data-key={this.props.name}
                    title={this.props.title}
                    onChange={this.inputChange}
                    value={value} />
            </div>

        );
    }
});
