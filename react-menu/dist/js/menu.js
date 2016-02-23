;(function() {
var FSMenuFixtures = {
  menu: {
    menu: {
      'id': '',
      'type': 'menu',
      'title': 'new menu',
      'descr': '',
      'weight': ''
    },
    category: {
      'id': '',
      'type': 'category',
      'title': 'New category',
      'descr': '',
      'weight': ''
    },
    dish: {
      'id': '',
      'type': 'dish',
      'title': 'New dish',
      'info': {
        'price': '',
        'adds': '',
        'wt': '',
        'descr': ''
      },
      'weight': ''
    }
  }
};
/**
 * Helper function for menu update
 * @type {Object}
 */
var FSMenuUpdate = {
  /**
   * Sometimes need to clone object instead of getting link to object
   * @method cloneObject
   * @param  {object}    obj [description]
   * @return {object}        [description]
   */
  cloneObject: function (obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  /**
   * Resets id's of items
   * @param  {object} menu Menu structure
   * @return {object} menu sorted menu
   */
  sortMenu: function (menu) {
    var i = 0;
    for (var item in menu) {
      menu[item].id = i++;
    }
    return menu;
  },
  /**
   * Finds and returns part menu with its sections and dishes
   * @method findMenu
   * @param  {array}      menu        Menu structure
   * @param  {integer}    menu_id     id of the menu to part
   * @return {array}      partMenu    menu array with its sections and dishes
   */
  findMenu: function (menu, menu_id) {
    var partMenu = [], found = 0;
    for (var item in menu) {
      if (menu[item].type == 'menu' && found) {
        break;
      }
      if (menu[item].id == menu_id && !found) {
        partMenu.push(menu[item]);
        found = 1;
      }
      if (found && menu[item].type !== 'menu') {
        partMenu.push(menu[item]);
      }
    }
    return partMenu;
  },
  /**
   * Adds new menu (menu title)
   * @method addMenu
   * @param  {array} menu Menu structure
   */
  addMenu: function (menu) {
    var fixture = this.cloneObject(FSMenuFixtures.menu['menu']);
    menu.splice(0, 0, fixture);
    return menu;
  },
  /**
   * Adds new item to {menu} after {item}
   * @method addMenuItem
   * @param  {array}     menu     Menu structure
   * @param  {object}    item     Add new item after this {item}
   * @param  {string}    type     Type: category | dish
   * @param  {string}    mode     Mode: 'copy' - dublicates {item}
   * @return {array}     menu     modified array structure
   */
  addMenuItem: function (menu, item, type, mode) {
    var updated = false;
    for (var menuIndex in menu) {
      if (item.id == menu[menuIndex].id) {
        var fixture = this.cloneObject(mode == 'copy' ? item : FSMenuFixtures.menu[type]);
        menu.splice(++menuIndex, 0, fixture);
        updated = true;
        break;
      }
    }
    return updated ? menu : console.error('Not found: ' + item);
  },
  /**
   * Removes {item} from {menu}
   * @method removeMenuItem
   * @param  {array}  menu
   * @param  {object} item
   * @return {array}     menu     modified array structure
   */
  removeMenuItem: function (menu, item) {
    var updated = false;
    for (var menuIndex in menu) {
      if (item.id == menu[menuIndex].id) {
        menu.splice(menuIndex, 1);
        updated = true;
        break;
      }
    }
    return updated ? menu : console.error('Not found: ' + item);
  }
};
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
  inputChange: function (event) {
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
  findValue: function (obj, key) {
    var keyChain = key.split(':'), found = '', menu_key = '';
    for (var k in keyChain) {
      menu_key = keyChain[k];
      found = obj[menu_key];
      if (found !== null && typeof found == 'object') {
        keyChain.shift();
        found = this.findValue(found, keyChain.join(':'));
      }
    }
    if (typeof found !== 'undefined') {
      return found;
    } else {
      console.error('Key ' + keyChain.join(':') + ' not found');
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
  changeValue: function (obj, key, value) {
    var keyChain = key.split(':'), found = '', menu_key = '';
    for (var k in keyChain) {
      menu_key = keyChain[k];
      found = obj[menu_key];
      if (found !== null && typeof found == 'object') {
        keyChain.shift();
        found = this.changeValue(found, keyChain.join(':'), value);
        break;
      }
    }
    if (typeof found !== 'undefined') {
      // дошли до последней вложенности - меняем value
      if (key.split(':').length == 1) {
        obj[menu_key] = value;
      }
      return obj;
    } else {
      console.error('Key ' + keyChain.join(':') + ' not found');
      return '';
    }
  }
};
/**
 * Input types
 */
var FSMenuItemInput = React.createClass({
  displayName: 'FSMenuItemInput',
  mixins: [FSMenuInputMixin],
  getInitialState: function () {
    return {
      item: this.props.item,
      menu: this.props.menu
    };
  },
  render: function () {
    var xs = this.props.xs || 6, item = this.props.item, classes = 'col-xs-' + xs + ' fsm-menu__wrap';
    var value = this.findValue(item, this.props.name);
    return React.createElement('div', { className: classes }, React.createElement('input', {
      type: 'text',
      className: 'form-control fsm-menu__input',
      'data-toggle': 'tooltip',
      'data-key': this.props.name,
      title: this.props.title,
      value: value,
      onChange: this.inputChange
    }));
  }
});
var FSMenuItemTextarea = React.createClass({
  displayName: 'FSMenuItemTextarea',
  mixins: [FSMenuInputMixin],
  getInitialState: function () {
    return {
      item: this.props.item,
      menu: this.props.menu
    };
  },
  render: function () {
    var xs = this.props.xs || 6, item = this.props.item, classes = 'col-xs-' + xs + ' fsm-menu__wrap';
    var value = this.findValue(item, this.props.name);
    return React.createElement('div', { className: classes }, React.createElement('textarea', {
      className: 'form-control fsm-menu__textarea',
      'data-toggle': 'tooltip',
      'data-key': this.props.name,
      title: this.props.title,
      onChange: this.inputChange,
      value: value
    }));
  }
});
/**
 * Item types in menu: title, category, dish
 */
var FSMenuItemTitle = React.createClass({
  displayName: 'FSMenuItemTitle',
  render: function () {
    var item = this.props.item;
    return React.createElement('div', { className: 'fsm-menu__row' }, React.createElement(FSMenuItemInput, React.__spread({
      name: 'title',
      xs: '11',
      title: 'Menu name'
    }, this.props)), React.createElement(FSMenuItemOptions, React.__spread({ xs: '1' }, this.props)));
  }
});
var FSMenuItemCategory = React.createClass({
  displayName: 'FSMenuItemCategory',
  render: function () {
    var item = this.props.item;
    return React.createElement('div', { className: 'fsm-menu__row' }, React.createElement('div', { className: 'col-xs-2 fsm-menu__dragger' }, React.createElement('div', { className: 'glyphicon glyphicon-menu-hamburger' })), React.createElement(FSMenuItemInput, React.__spread({}, this.props, {
      name: 'title',
      xs: '6',
      placeholder: 'Category',
      title: 'Category'
    })), React.createElement(FSMenuItemTextarea, React.__spread({}, this.props, {
      name: 'descr',
      xs: '3',
      placeholder: 'Category description',
      title: 'Category description'
    })), React.createElement(FSMenuItemOptions, React.__spread({ xs: '1' }, this.props)));
  }
});
var FSMenuItemDish = React.createClass({
  displayName: 'FSMenuItemDish',
  render: function () {
    var item = this.props.item;
    return React.createElement('div', { className: 'fsm-menu__row' }, React.createElement('div', { className: 'col-xs-2 fsm-menu__dragger' }, React.createElement('div', { className: 'glyphicon glyphicon-menu-hamburger' })), React.createElement(FSMenuItemInput, React.__spread({}, this.props, {
      name: 'title',
      xs: '5',
      placeholder: 'Name',
      title: 'Name'
    })), React.createElement(FSMenuItemInput, React.__spread({}, this.props, {
      name: 'info:price',
      xs: '2',
      placeholder: 'Price',
      title: 'Price'
    })), React.createElement(FSMenuItemInput, React.__spread({}, this.props, {
      name: 'info:wt',
      xs: '2',
      placeholder: 'Weight',
      title: 'Weight'
    })), React.createElement(FSMenuItemOptions, React.__spread({ xs: '1' }, this.props)), React.createElement(FSMenuItemTextarea, React.__spread({}, this.props, {
      name: 'descr',
      xs: '6',
      placeholder: 'Dish description',
      title: 'Dish description'
    })));
  }
});
/**
 * Wrapper for menu item
 */
var FSMenuItem = React.createClass({
  displayName: 'FSMenuItem',
  getInitialState: function () {
    return {
      item: this.props.item,
      menu: this.props.menu
    };
  },
  render: function () {
    var that = this, item = this.props.item, menu = that.props.menu;
    var fsmClass = 'row fsm-menu__item fsm-menu__item_' + item.type;
    var menuItem = false;
    // разные шаблоны в зависимости от типа объекта
    switch (item.type) {
    case 'menu': {
        if (item.id !== 0) {
          fsmClass += ' fsm-menu__item_draggable';
        }
        menuItem = React.createElement(FSMenuItemTitle, React.__spread({}, that.props));
      }
      break;
    case 'category': {
        fsmClass += ' fsm-menu__item_draggable';
        menuItem = React.createElement(FSMenuItemCategory, React.__spread({}, that.props));
      }
      break;
    case 'dish': {
        fsmClass += ' fsm-menu__item_draggable';
        menuItem = React.createElement(FSMenuItemDish, React.__spread({}, that.props));
      }
      break;
    }
    return React.createElement('div', {
      key: item.id,
      className: fsmClass
    }, menuItem);
  }
});
/**
 * Menu options for each item
 */
var FSMenuItemOptions = React.createClass({
  displayName: 'FSMenuItemOptions',
  mixins: [FSMenuUpdate],
  getInitialState: function () {
    return {
      item: this.props.item,
      menu: this.props.menu
    };
  },
  addItem: function (event) {
    var type = event.target.getAttribute('data-type'), mode = event.target.getAttribute('data-mode'), updatedMenus = this.addMenuItem(this.props.menu, this.props.item, type, mode);
    this.props.updateMenu(updatedMenus);
    event.preventDefault();
  },
  removeItem: function (event) {
    var updatedMenus = this.removeMenuItem(this.props.menu, this.props.item);
    this.props.updateMenu(updatedMenus);
    event.preventDefault();
  },
  render: function () {
    var item = this.props.item;
    return React.createElement('div', { className: 'col-xs-' + this.props.xs + ' fsm-menu__options' }, React.createElement('div', { className: 'glyphicon glyphicon-option-vertical' }), React.createElement('div', {
      className: 'fsm-menu__dropdown-toggle',
      'data-target': '#fsm-menu__dropdown-' + item.id,
      'data-toggle': 'dropdown'
    }), React.createElement('div', {
      className: 'fsm-menu__dropdown',
      id: 'fsm-menu__dropdown-' + item.id
    }, React.createElement('ul', {
      className: 'dropdown-menu dropdown-menu-right',
      role: 'menu'
    }, React.createElement('li', null, React.createElement('a', {
      className: 'fsm-menu__dropdown-add',
      href: '#',
      'data-type': 'category',
      onClick: this.addItem
    }, 'Add category')), React.createElement('li', null, React.createElement('a', {
      href: '#',
      'data-type': 'dish',
      onClick: this.addItem
    }, 'Add dish')), React.createElement('li', null, React.createElement('a', {
      href: '#',
      'data-mode': 'copy',
      onClick: this.addItem
    }, 'Dublicate')), React.createElement('li', {
      role: 'separator',
      className: 'divider'
    }), React.createElement('li', null, React.createElement('a', {
      href: '#',
      className: 'bg-danger',
      onClick: this.removeItem
    }, 'Remove')))));
  }
});
var FSMenuControlAddMenu = React.createClass({
  displayName: 'FSMenuControlAddMenu',
  mixins: [FSMenuUpdate],
  getInitialState: function () {
    return { menu: this.props.menu };
  },
  addNewMenu: function () {
    this.props.menu = this.addMenu(this.props.menu);
    this.props.updateMenu(this.props.menu);
    event.preventDefault();
  },
  render: function () {
    return React.createElement('a', {
      href: '#',
      className: 'btn btn-success fsm-menu__add-menu',
      onClick: this.addNewMenu,
      title: 'Add menu',
      'data-toggle': 'tooltip'
    }, React.createElement('span', { className: 'fa fa-plus-square-o' }), ' Add menu');
  }
});
var FSMenuControlSaveMenu = React.createClass({
  displayName: 'FSMenuControlSaveMenu',
  mixins: [FSMenuUpdate],
  getInitialState: function () {
    return { menu: this.props.menu };
  },
  saveMenu: function () {
    alert('Save button pressed');
    event.preventDefault();
  },
  render: function () {
    return React.createElement('a', {
      href: '#',
      className: 'btn btn-primary pull-right fsm-menu__save-menu',
      onClick: this.saveMenu
    }, 'Save');
  }
});
var FSMenuControl = React.createClass({
  displayName: 'FSMenuControl',
  render: function () {
    return React.createElement('div', {
      id: 'fsm-menu__form',
      className: 'fsm-menu__main-actions'
    }, React.createElement('nav', { className: 'navbar navbar-default navbar-static-top border-bottom fsm-menu__navbar' }, React.createElement(FSMenuControlAddMenu, React.__spread({}, this.props)), React.createElement(FSMenuControlSaveMenu, React.__spread({}, this.props))));
  }
});
var FSMenuTitle = React.createClass({
  displayName: 'FSMenuTitle',
  render: function () {
    var item = this.props.item;
    return React.createElement('div', { className: 'fsm-menu__title row' }, React.createElement('div', { className: 'col-xs-2 fsm-menu__dragger' }, React.createElement('div', { className: 'glyphicon glyphicon-menu-hamburger' })), React.createElement('div', { className: 'col-xs-10 fsm-menu__wrap' }, item.title));
  }
});
var FSMenuTitles = React.createClass({
  displayName: 'FSMenuTitles',
  mixins: [
    SortableMixin,
    FSMenuUpdate
  ],
  sortableOptions: {
    group: 'titles',
    model: 'titles',
    draggable: '.fsm-menu__title',
    handle: '.fsm-menu__dragger',
    ghostClass: 'fsm-menu__title_drop',
    ref: 'titlesSortable'
  },
  getInitialState: function () {
    return { titles: this.props.titles };
  },
  handleSort: function (evt) {
    var updatedMenu = [];
    this.state.titles.map(function (title, index) {
      var foundedMenu = this.findMenu(this.props.menu, title.id);
      for (index in foundedMenu) {
        updatedMenu.splice(updatedMenu.length, 0, foundedMenu[index]);
      }
    }.bind(this));
    this.props.updateMenu(updatedMenu);
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({ titles: nextProps.titles });
  },
  render: function () {
    return React.createElement('div', {
      className: 'fsm-menu__titles',
      ref: 'titlesSortable'
    }, this.state.titles.map(function (item, index) {
      return React.createElement(FSMenuTitle, {
        key: item.id,
        item: item
      });
    }));
  }
});
/** @jsx React.DOM */
var PureRenderMixin = React.addons.PureRenderMixin;
var dataMenu = {
  'menu': [
    {
      'id': 1,
      'type': 'menu',
      'title': 'Menu 1',
      'descr': 'Very nice menu 1',
      'info': {
        'adds': '',
        'wt': ''
      },
      'weight': 1
    },
    {
      'id': 2,
      'type': 'category',
      'title': 'Drinks',
      'descr': 'Juices and Waters',
      'info': {
        'adds': '100/400',
        'wt': '500ml'
      },
      'weight': 2
    },
    {
      'id': 3,
      'type': 'dish',
      'title': 'Apple Pie',
      'descr': 'Tasty and fresh',
      'info': {
        'price': '150',
        'adds': '',
        'wt': '10/500/44'
      },
      'weight': 3
    },
    {
      'id': 4,
      'type': 'menu',
      'title': 'Hot!',
      'descr': 'Primary discounts and actions',
      'info': {
        'adds': '',
        'wt': ''
      },
      'weight': 1
    },
    {
      'id': 5,
      'type': 'category',
      'title': 'Soup',
      'descr': 'Any soup of your choice',
      'info': {
        'adds': '',
        'wt': ''
      },
      'weight': 2
    },
    {
      'id': 6,
      'type': 'dish',
      'title': 'Borsch',
      'descr': 'russian main cuisine',
      'info': {
        'price': '150',
        'adds': '',
        'wt': '10/500/44'
      },
      'weight': 3
    }
  ]
};
var FSMenu = React.createClass({
  displayName: 'FSMenu',
  mixins: [
    SortableMixin,
    FSMenuUpdate
  ],
  getInitialState: function () {
    return { menu: this.sortMenu(this.addMenu([])) };
  },
  componentDidMount: function () {
    if (this.isMounted()) {
      $('body').tooltip({
        selector: '[data-toggle=tooltip]',
        template: '<div class="tooltip fsm-menu__tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner fsm-menu__tooltip-inner"></div></div>'
      });
      // grab data with ajax here
      this.updateMenu(dataMenu.menu);
    }
  },
  updateMenu: function (menu) {
    var updatedMenu = this.sortMenu(menu);
    this.setState({ menu: updatedMenu });
  },
  sortableOptions: {
    group: 'menu',
    model: 'menu',
    draggable: '.fsm-menu__item_draggable',
    handle: '.fsm-menu__dragger',
    ghostClass: 'fsm-menu__item_drop',
    ref: 'menuSortable'
  },
  handleSort: function (evt) {
  },
  render: function () {
    var that = this, menu = this.state.menu, titles = [];
    menu.map(function (item, index) {
      if (item.type == 'menu') {
        titles.push(item);
      }
    });
    return React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-md-8' }, React.createElement(FSMenuControl, {
      menu: menu,
      updateMenu: this.updateMenu
    }), React.createElement('div', {
      className: 'fsm-menu__container container-fluid',
      ref: 'menuSortable'
    }, menu.map(function (item, index) {
      return React.createElement(FSMenuItem, {
        key: item.id,
        menu: menu,
        item: item,
        updateMenu: that.updateMenu
      });
    }))), React.createElement(StateView, { data: this.state.menu }));
  }
});
var StateView = React.createClass({
  displayName: 'StateView',
  render: function () {
    return React.createElement('pre', { id: 'fsm-json' }, JSON.stringify(this.props.data, 0, 2));
  }
});
React.addons.Perf.start();
React.render(React.createElement(FSMenu, null), document.getElementById('fsm-menu'));
React.addons.Perf.stop();
React.addons.Perf.printInclusive();
}());