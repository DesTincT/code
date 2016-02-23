/**
 * Mixins for input changes logic
 * @type {Object}
 */
var FSMenuInputMixin = {


    /**
     * Changes value in state object
     * @method inputChange
     * @param  {object}    event Event of changed input
     */
    inputChange: function( event ){
        var menu_key = event.target.getAttribute('data-key');

        this.props.item = this.changeValue(this.props.item, menu_key, event.target.value);
        this.setState({ item: this.props.item });

        //dev
        this.props.updateMenu(this.props.menu);
    },


    /**
     * Finds value of given key
     * @method findValue
     * @param  {object}  obj [description]
     * @param  {string}  key representing key in json
     * @return {string}      value found or ''
     */
    findValue: function( obj, key ){

        var keyChain = key.split(':'),
            found = '',
            menu_key = '';

        for ( var k in keyChain ) {
            menu_key = keyChain[k];
            found = obj[menu_key];

            if ( found !== null && typeof(found)=="object" ) {
                keyChain.shift();
                found = this.findValue(found, keyChain.join(':'));
            }
        }

        if ( typeof(found) !== 'undefined' ) {
            return found;
        } else {
            console.error('Key ' + keyChain.join(':') +' not found');
            return '';
        }

    },

    /**
     * Changes value in obj
     * @method changeValue
     * @param  {object}    obj   json object
     * @param  {string}    key   given info:price:etc string
     * @param  {string}    value value to change on
     * @return {object}    obj   changed obj or ''
     */
    changeValue: function( obj, key, value ){

        var keyChain = key.split(':'),
            found = '',
            menu_key = '';

        for ( var k in keyChain ) {
            menu_key = keyChain[k];
            found = obj[menu_key];

            if ( found !== null && typeof(found)=="object" ) {
                keyChain.shift();
                found = this.changeValue(found, keyChain.join(':'), value);
                break;
            }
        }

        if ( typeof(found) !== 'undefined' ) {

            // дошли до последней вложенности - меняем value
            if ( key.split(':').length == 1 ) {
                obj[menu_key] = value;
            }

            return obj;
        } else {
            console.error('Key ' + keyChain.join(':') +' not found');
            return '';
        }

    }
}
