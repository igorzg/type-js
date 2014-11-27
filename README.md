Type-js [![Build Status](https://travis-ci.org/igorzg/type-js.svg?branch=master)](https://travis-ci.org/igorzg/type-js)
========

Static type support for javascript
* Supported for ES5++ browsers.
* Object roots are freezed after thy are created.
* Object prototypes are freezed after thy are initialized.
* Initialized objects are prevented from extension.
* To define members to object you must provide _construct function to prototype
* In IE 8,7,6 inheritance works but extensions and changes are allowed.
```js
/// var Parent = Type.create([prototype]);
/// var Child = Parent.inherit([prototype]);
var AdminUser, Group, User;
Group = Type.create({
    _construct: function(group) {
        this._group = group;
    },
    setGroup: function(value) {
        this._group = value;
    },
    getGroup: function() {
        return this._group;
    }
});
AdminUser = Group.inherit({
    _construct: function(username) {

        this.username = username;
        this.date = new Date;
        this._super('admin'); /// this will override group because parent is group
    },
    setUser: function(value) {
        this.username = value;
    }
});
User = AdminUser.inherit({
    _construct: function(username) {
        // define

        this.username = username;
        this.date = new Date;
        this._super('test'); // this will override username to test because parent is AdminUser
        this.setGroup('user'); // this will set group to user
    },
    setPassword: function(value) {
        // this is not allowed all values must be defined in _construct
        this.password = value;
    }
});

var user = new User('igor');
user.username = 1; // throws type error because initial value is string
user.date = new RegExp; // throw type error because initial value is date
user.date = new Date; // is allowed because is correct type
user.date = null; // its allowed because all members are allowed to be null or undefined because of GC
user.date = 1; // re assigning values with wrong type throws type error
user.date = new Date; // re assigning initial value is allowed

User.prototype.one = 1; // Will throw type error because adding something to prototype after initialization is not allowed
User.one = 1; // Extending roots is not allowed

```
