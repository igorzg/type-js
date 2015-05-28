Type-js [![Build Status](https://travis-ci.org/igorzg/type-js.svg?branch=master)](https://travis-ci.org/igorzg/type-js)
========

Type checking support for javascript
* All types are checked at runtime
* Supported for ES5++ browsers.
* Object roots are freezed after thy are created.
* Initialized objects are prevented from extension.
* To define object you must provide two objects to Type.create(type_definition, prototype);
* _construct function is executed when object is constructed to inherit use _super(arguments) inside of _construct
* _invoke is executed before _construct cross inherited objects on each object construction
* _super() use _super(arguments) call to call inherited method.
* _super is not allowed to be executed inside _invoke call
* In IE 8,7,6 inheritance works but extensions and changes are allowed.


```
javascript
/// var Parent = Type.create([type definition], [prototype]);
/// var Child = Parent.inherit([type definition], [prototype]);


var AdminUser, Group, User;
Group = Type.create({
    _group: Type.STRING,
    invoked: Type.STRING
}, {
    _invoke:    function(group) { this.invoked = group; },
    _construct: function(group) { this._group = group; },
    setGroup:   function(value) { this._group = value; },
    getGroup:   function()      { return this._group; }
});

AdminUser = Group.inherit({
    username: Type.STIRNG,
    date: Type.DATE
},{
    _construct: function(username) {
        this.username = username;
        this.date = new Date;
        this._super('admin'); /// this will override group because parent is group
    },
    setUser: function(value) { this.username = value; }
});

User = AdminUser.inherit({
    username: Type.STIRNG,
    date: Type.DATE
},{
    _construct: function(username) {
        this.username = username;
        this.date = new Date;
        this._super('test'); // this will override username to test because parent is AdminUser
        this.setGroup('user'); // this will set group to user
    },
    setPassword: function(value) {
        // this is not allowed all members must be defined at initialization proces (in _construct)
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

### Available type checks as class methods

```
Type.isBoolean(value)
Type.isUndefined(value)
Type.isString(value)
Type.isNumber(value)
Type.isArray(value)
Type.isNull(value)
Type.isFunction(value)
Type.isDate(value)
Type.isRegExp(value)
Type.isObject(value)
```

### Special methods

```
_construct // initialize after object create
_super     // call parent overloaded method
```