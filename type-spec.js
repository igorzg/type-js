describe('Typejs', function () {
    "use strict";

    var AdminUser, Group, User;
    beforeEach(function () {
        Group = Type.create({
            _group: Type.STRING
        }, {
            _construct: function Group_construct(group) {
                this._group = group;
            },
            setGroup: function (value) {
                this._group = value;
            },
            getGroup: function () {
                return this._group;
            }
        });
        AdminUser = Group.inherit({
            username: Type.STRING,
            date: Type.DATE
        }, {
            _construct: function AdminUser_construct(username) {

                this.username = username;
                this.date = new Date;
                this._super('admin'); /// this will override group because parent is group
            },
            setUser: function (value) {
                this.username = value;
            }
        });
        User = AdminUser.inherit({
            username: Type.STRING,
            date: Type.DATE
        }, {
            _construct: function User_construct(username) {
                // define

                this.username = username;
                this.date = new Date;
                this._super('test'); // this will override username to test because parent is AdminUser
                this.setGroup('user'); // this will set group to user
            },
            setPassword: function (value) {
                // this is not allowed all values must be defined in _construct
                this.password = value;
            }
        });
    });

    it('Should be null', function () {
        expect(Type.isNull({})).toBe(false);
        expect(Type.isNull([])).toBe(false);
        expect(Type.isNull(function () {
        })).toBe(false);
        expect(Type.isNull(undefined)).toBe(false);
        expect(Type.isNull(new Date)).toBe(false);
        expect(Type.isNull(new RegExp)).toBe(false);
        expect(Type.isNull("")).toBe(false);
        expect(Type.isNull(1)).toBe(false);
        expect(Type.isNull(0)).toBe(false);
        expect(Type.isNull(false)).toBe(false);
        expect(Type.isNull(true)).toBe(false);
        expect(Type.isNull(null)).toBe(true);
    });


    it('Should be object', function () {
        expect(Type.isObject({})).toBe(true);
        expect(Type.isObject([])).toBe(true);
        expect(Type.isObject(function () {
        })).toBe(false);
        expect(Type.isObject(undefined)).toBe(false);
        expect(Type.isObject(new Date)).toBe(true);
        expect(Type.isObject(new RegExp)).toBe(true);
        expect(Type.isObject("")).toBe(false);
        expect(Type.isObject(1)).toBe(false);
        expect(Type.isObject(0)).toBe(false);
        expect(Type.isObject(false)).toBe(false);
        expect(Type.isObject(true)).toBe(false);
        expect(Type.isObject(null)).toBe(false);
    });


    it('Should be regex', function () {
        expect(Type.isRegExp({})).toBe(false);
        expect(Type.isRegExp([])).toBe(false);
        expect(Type.isRegExp(function () {
        })).toBe(false);
        expect(Type.isRegExp(undefined)).toBe(false);
        expect(Type.isRegExp(new Date)).toBe(false);
        expect(Type.isRegExp(new RegExp)).toBe(true);
        expect(Type.isRegExp("")).toBe(false);
        expect(Type.isRegExp(1)).toBe(false);
        expect(Type.isRegExp(0)).toBe(false);
        expect(Type.isRegExp(false)).toBe(false);
        expect(Type.isRegExp(true)).toBe(false);
        expect(Type.isRegExp(null)).toBe(false);
    });


    it('Should be date', function () {
        expect(Type.isDate({})).toBe(false);
        expect(Type.isDate([])).toBe(false);
        expect(Type.isDate(function () {
        })).toBe(false);
        expect(Type.isDate(undefined)).toBe(false);
        expect(Type.isDate(new Date)).toBe(true);
        expect(Type.isDate(new RegExp)).toBe(false);
        expect(Type.isDate("")).toBe(false);
        expect(Type.isDate(1)).toBe(false);
        expect(Type.isDate(0)).toBe(false);
        expect(Type.isDate(false)).toBe(false);
        expect(Type.isDate(true)).toBe(false);
        expect(Type.isDate(null)).toBe(false);
    });


    it('Should be function', function () {
        expect(Type.isFunction({})).toBe(false);
        expect(Type.isFunction([])).toBe(false);
        expect(Type.isFunction(function () {
        })).toBe(true);
        expect(Type.isFunction(undefined)).toBe(false);
        expect(Type.isFunction(new Date)).toBe(false);
        expect(Type.isFunction(new RegExp)).toBe(false);
        expect(Type.isFunction("")).toBe(false);
        expect(Type.isFunction(1)).toBe(false);
        expect(Type.isFunction(0)).toBe(false);
        expect(Type.isFunction(false)).toBe(false);
        expect(Type.isFunction(true)).toBe(false);
        expect(Type.isFunction(null)).toBe(false);
    });


    it('Should be array', function () {
        expect(Type.isArray({})).toBe(false);
        expect(Type.isArray([])).toBe(true);
        expect(Type.isArray(function () {
        })).toBe(false);
        expect(Type.isArray(undefined)).toBe(false);
        expect(Type.isArray(new Date)).toBe(false);
        expect(Type.isArray(new RegExp)).toBe(false);
        expect(Type.isArray("")).toBe(false);
        expect(Type.isArray(1)).toBe(false);
        expect(Type.isArray(0)).toBe(false);
        expect(Type.isArray(false)).toBe(false);
        expect(Type.isArray(true)).toBe(false);
        expect(Type.isArray(null)).toBe(false);
    });


    it('Should be number', function () {
        expect(Type.isNumber({})).toBe(false);
        expect(Type.isNumber([])).toBe(false);
        expect(Type.isNumber(function () {
        })).toBe(false);
        expect(Type.isNumber(undefined)).toBe(false);
        expect(Type.isNumber(new Date)).toBe(false);
        expect(Type.isNumber(new RegExp)).toBe(false);
        expect(Type.isNumber("")).toBe(false);
        expect(Type.isNumber(1)).toBe(true);
        expect(Type.isNumber(0)).toBe(true);
        expect(Type.isNumber(NaN)).toBe(true);
        expect(Type.isNumber(false)).toBe(false);
        expect(Type.isNumber(true)).toBe(false);
        expect(Type.isNumber(null)).toBe(false);
    });


    it('Should be string', function () {
        expect(Type.isString({})).toBe(false);
        expect(Type.isString([])).toBe(false);
        expect(Type.isString(function () {
        })).toBe(false);
        expect(Type.isString(undefined)).toBe(false);
        expect(Type.isString(new Date)).toBe(false);
        expect(Type.isString(new RegExp)).toBe(false);
        expect(Type.isString("")).toBe(true);
        expect(Type.isString(1)).toBe(false);
        expect(Type.isString(0)).toBe(false);
        expect(Type.isString(NaN)).toBe(false);
        expect(Type.isString(false)).toBe(false);
        expect(Type.isString(true)).toBe(false);
        expect(Type.isString(null)).toBe(false);
    });


    it('Should be boolean', function () {
        expect(Type.isBoolean({})).toBe(false);
        expect(Type.isBoolean([])).toBe(false);
        expect(Type.isBoolean(function () {
        })).toBe(false);
        expect(Type.isBoolean(undefined)).toBe(false);
        expect(Type.isBoolean(new Date)).toBe(false);
        expect(Type.isBoolean(new RegExp)).toBe(false);
        expect(Type.isBoolean("")).toBe(false);
        expect(Type.isBoolean(1)).toBe(false);
        expect(Type.isBoolean(0)).toBe(false);
        expect(Type.isBoolean(NaN)).toBe(false);
        expect(Type.isBoolean(false)).toBe(true);
        expect(Type.isBoolean(true)).toBe(true);
        expect(Type.isBoolean(null)).toBe(false);
    });

    it('Should be undefined', function () {
        expect(Type.isUndefined({})).toBe(false);
        expect(Type.isUndefined([])).toBe(false);
        expect(Type.isUndefined(function () {
        })).toBe(false);
        expect(Type.isUndefined(undefined)).toBe(true);
        expect(Type.isUndefined(new Date)).toBe(false);
        expect(Type.isUndefined(new RegExp)).toBe(false);
        expect(Type.isUndefined("")).toBe(false);
        expect(Type.isUndefined(1)).toBe(false);
        expect(Type.isUndefined(0)).toBe(false);
        expect(Type.isUndefined(NaN)).toBe(false);
        expect(Type.isUndefined(false)).toBe(false);
        expect(Type.isUndefined(true)).toBe(false);
        expect(Type.isUndefined(null)).toBe(false);
    });

    it('Should be initialized', function () {
        expect(Type.isInitialized({})).toBe(true);
        expect(Type.isInitialized([])).toBe(true);
        expect(Type.isInitialized(function () {
        })).toBe(true);
        expect(Type.isInitialized(undefined)).toBe(false);
        expect(Type.isInitialized(new Date)).toBe(true);
        expect(Type.isInitialized(new RegExp)).toBe(true);
        expect(Type.isInitialized("")).toBe(true);
        expect(Type.isInitialized(1)).toBe(true);
        expect(Type.isInitialized(0)).toBe(true);
        expect(Type.isInitialized(NaN)).toBe(true);
        expect(Type.isInitialized(false)).toBe(true);
        expect(Type.isInitialized(true)).toBe(true);
        expect(Type.isInitialized(null)).toBe(false);
    });


    it('Should be get correct type', function () {
        expect(Type.getType({})).toBe("object");
        expect(Type.getType([])).toBe("array");
        expect(Type.getType(function () {
        })).toBe("function");
        expect(Type.getType(undefined)).toBe("undefined");
        expect(Type.getType(new Date)).toBe("date");
        expect(Type.getType(new RegExp)).toBe("regexp");
        expect(Type.getType("")).toBe("string");
        expect(Type.getType(1)).toBe("number");
        expect(Type.getType(0)).toBe("number");
        expect(Type.getType(NaN)).toBe("number");
        expect(Type.getType(Number.POSITIVE_INFINITY)).toBe("number");
        expect(Type.getType(Number.NEGATIVE_INFINITY)).toBe("number");
        expect(Type.getType(false)).toBe("boolean");
        expect(Type.getType(true)).toBe("boolean");
        expect(Type.getType(null)).toBe("null");
    });


    it('Should be asserted correctly', function () {
        expect(Type.assert(Type.OBJECT, {})).toBe(true);
        expect(Type.assert(Type.ARRAY, [])).toBe(true);
        expect(Type.assert(Type.FUNCTION, function () {
        })).toBe(true);
        expect(Type.assert(Type.UNDEFINED, undefined)).toBe(true);
        expect(Type.assert(Type.DATE, new Date)).toBe(true);
        expect(Type.assert(Type.REGEX, new RegExp)).toBe(true);
        expect(Type.assert(Type.STRING, "")).toBe(true);
        expect(Type.assert(Type.NUMBER, 1)).toBe(true);
        expect(Type.assert(Type.NUMBER, 0)).toBe(true);
        expect(Type.assert(Type.NUMBER, NaN)).toBe(true);
        expect(Type.assert(Type.NUMBER, Number.POSITIVE_INFINITY)).toBe(true);
        expect(Type.assert(Type.NUMBER, Number.NEGATIVE_INFINITY)).toBe(true);
        expect(Type.assert(Type.BOOLEAN, false)).toBe(true);
        expect(Type.assert(Type.BOOLEAN, true)).toBe(true);
        expect(Type.assert(Type.NULL, null)).toBe(true);
        expect(Type.assert(Type.NULL, undefined)).toBe(false);
    });


    it('Should be create class', function () {
        var us = new User('igor');
        expect(us instanceof Type).toBe(true);
        expect(us instanceof Group).toBe(true);
        expect(us instanceof AdminUser).toBe(true);
        expect(us instanceof User).toBe(true);
        expect(us.username).toBe('test');
        expect(us.getGroup()).toBe('user');
    });



    it('Root Should be immutable after is created', function () {
        var message = tryCatch(function () {
            User.one = 1;
        });
        expect(message).toBe("Can't add property one, object is not extensible");
    });

    it('After object is initialized it should prevent extensions', function () {
        var us = new User('igor'),
            us2 = new User('igor2'),
            us3 = new User('igor2'),message;
        message = tryCatch(function () {
            us.o = 1;
        });
        expect(message).toBe("Can't add property o, object is not extensible");
    });


    it('Should create class and test type behavior', function () {

        var us = new User('igor'), message;

        us.username = 'igor';
        expect(us.username).toBe('igor');
        message = tryCatch(function () {
            us.username = 1
        });
        expect(message).toBe('key: username, value: "number" (1), is expected to be: "string" type.');
        message = tryCatch(function () {
            us.username = null
        });
        expect(message).toBe(true);
        message = tryCatch(function () {
            us.username = function () {
            }
        });
        expect(message).toBe('key: username, value: "function" (function () { }), is expected to be: "string" type.');
        message = tryCatch(function () {
            us.username = new RegExp;
        });
        expect(message).toBe('key: username, value: "regexp" (/(?:)/), is expected to be: "string" type.');
        message = tryCatch(function () {
            us.date = 1;
        });
        expect(message).toBe('key: date, value: "number" (1), is expected to be: "date" type.');

        message = tryCatch(function () {
            us.one = 1;
        });
        expect(message).toBe("Can't add property one, object is not extensible");



        message = tryCatch(function () {
            Type.one = 1;
        });
        expect(message).toBe("Can't add property one, object is not extensible");

        message = tryCatch(function () {
            Type.ARRAY = 1;
        });
        expect(message).toBe("Cannot assign to read only property 'ARRAY' of function Type() {}");


        message = tryCatch(function () {
            us.setPassword('password');
        });
        expect(message).toBe("Can't add property password, object is not extensible");

        message = tryCatch(function () {
            User.one = 1;
        });
        expect(message).toBe("Can't add property one, object is not extensible");

    });


    it('Object should have own properties and do typecheck', function () {
        var Test = Type.create(
            {
                date: Type.DATE,
                one: Type.NUMBER,
                two: Type.STRING
            }, {
                _construct: function (one, two) {
                    this.date = new Date;
                    this.one = one;
                    this.two = two;
                }
            });
        var t1 = new Test(1, 'two'),
            t2 = new Test(6, 'sec'), message;

        expect(t1.hasOwnProperty("date")).toBe(false);
        expect(t1.hasOwnProperty("one")).toBe(false);
        expect(t1.hasOwnProperty("two")).toBe(false);
        expect(Object.keys(t1).length).toBe(1);

        message = tryCatch(function () {
            t1.one = "test";
        });
        expect(message).toBe('key: one, value: "string" (test), is expected to be: "number" type.');
    });

    it('should destroy and test properties', function () {
       var User = Type.create({
            username: Type.STRING,
            date: Type.DATE
        }, {
            _construct: function (username) {
                this.username = username;
                this.date = new Date;
            },
            setPassword: function (value) {
                this.password = value;
            }
        });
        var us = new User('igor'),
            us2 = new User('igor2'),
            us3 = new User('igor3');
        expect(us.username).toBe('igor');
        expect(us2.username).toBe('igor2');
        expect(us3.username).toBe('igor3');

        us.destroy();
        us2.destroy();
        us3.destroy();

        expect(us.__dynamic__).toBe(null);
        expect(us2.__dynamic__).toBe(null);
        expect(us3.__dynamic__).toBe(null);

        var message = tryCatch(function () { us.setPassword('123')});

        expect(message).toBe("Can't add property password, object is not extensible");
    });


    it('setter should al ways be correct type', function () {

        var message = tryCatch(function () {
            Type.create({
                username: Type.STRING,
                date: "invalid"
            }, {
                _construct: function (username) {
                    this.username = username;
                    this.date = new Date;
                }
            });
        });

        expect(message).toBe('Type must be valid type, provided is: invalid');


        var message = tryCatch(function () {
            Type.create({
                username: Type.STRING,
                date: "null"
            }, {
                _construct: function (username) {
                    this.username = username;
                    this.date = new Date;
                }
            });
        });

        expect(message).toBe('type cannot be:null');
    });



    it('invoke should be invoked correctly', function () {
        Group = Type.create({
            _group: Type.STRING,
            child: Type.OBJECT
        }, {
            _invoke: function (group) {
                this.child = {current: group};
                return this.child;
            },
            _construct: function (group) {
                this._group = group;
            },
            setGroup: function (value) {
                this._group = value;
            },
            getGroup: function () {
                return this._group;
            }
        });
        AdminUser = Group.inherit({
            username: Type.STRING,
            date: Type.DATE
        }, {
            _invoke: function (parent, username) {
                this.child = {parent: parent, current: username};
                try {
                    this._super('SUPER IS NOT WORKING HERE');
                } catch (e) {
                    expect(e.message).toBe("undefined is not a function");
                }
                return this.child;
            },
            _construct: function (username) {
                this.username = username;
                this.date = new Date;
            }
        });
        User = AdminUser.inherit({
            username: Type.STRING,
            date: Type.DATE
        }, {
            _invoke: function (parent, username) {
                this.child = {parent: parent, current: username};
                return this.child;
            },
            _construct: function (username) {
                this.username = username;
            }
        });
        var us = new User('igor');

        expect(Type.isObject(us.child)).toBe(true);
        expect(us.child.parent.parent.current).toBe('igor');
        expect(us.child.parent.current).toBe('igor');
        expect(us.child.current).toBe('igor');
    });


    it('invoke should be invoked correctly 2', function () {
        Group = Type.create({
            _group: Type.STRING,
            child: Type.OBJECT
        }, {
            _invoke: function (group) {
                this.child = {current: group};
                return this.child;
            },
            _construct: function (group) {
                this._group = group;
            },
            setGroup: function (value) {
                this._group = value;
            },
            getGroup: function () {
                return this._group;
            }
        });
        AdminUser = Group.inherit({
            username: Type.STRING,
            date: Type.DATE
        }, {
            _construct: function (username) {
                this.username = username;
                this.date = new Date;
            }
        });
        User = AdminUser.inherit({
            username: Type.STRING,
            date: Type.DATE
        }, {
            _invoke: function (parent, username) {
                this.child = {parent: parent, current: username};
                return this.child;
            },
            _construct: function (username) {
                this.username = username;
            }
        });
        var us = new User('igor');
        expect(Type.isObject(us.child)).toBe(true);

        expect(us.child.parent.current.current).toBe('igor');
        expect(us.child.current).toBe('igor');
    });



    it('invoke should be invoked correctly 3', function () {
        Group = Type.create({
            _group: Type.STRING,
            child: Type.OBJECT
        }, {
            _invoke: function (group) {
                this.child = {current: group};
                return this.child;
            },
            _construct: function (group) {
                this._group = group;
            },
            setGroup: function (value) {
                this._group = value;
            },
            getGroup: function () {
                return this._group;
            }
        });
        AdminUser = Group.inherit({
            username: Type.STRING,
            date: Type.DATE
        }, {
            _construct: function (username) {
                this.username = username;
                this.date = new Date;
            }
        });
        User = AdminUser.inherit({
            username: Type.STRING,
            date: Type.DATE
        }, {
            _construct: function (username) {
                this.username = username;
            }
        });
        var us = new User('igor');
        expect(Type.isObject(us.child)).toBe(true);
        expect(us.child.current.current.current.current).toBe('igor');

    });


    it('invoke should be invoked correctly 4', function () {
        Group = Type.create({
            _group: Type.STRING,
            child: Type.OBJECT
        }, {
            _invoke: function (group) {
                this.child = {current: group};
            },
            _construct: function (group) {
                this._group = group;
            },
            setGroup: function (value) {
                this._group = value;
            },
            getGroup: function () {
                return this._group;
            }
        });
        AdminUser = Group.inherit({
            username: Type.STRING,
            date: Type.DATE
        }, {
            _construct: function (username) {
                this.username = username;
                this.date = new Date;
            }
        });
        User = AdminUser.inherit({
            username: Type.STRING,
            date: Type.DATE
        }, {
            _construct: function (username) {
                this.username = username;
            }
        });
        var us = new User('igor');
        expect(Type.isObject(us.child)).toBe(true);
        expect(us.child.current).toBe('igor');

    });



    it('it shoud be al ways constructed!', function () {


        var message = tryCatch(function() {
            User('igor');
        });

        expect(message).toBe("Object must be constructed");
    });

    xit('benchmark group', function () {
        var Test = Type.create({
            _group: Type.STRING
        }, {
            _construct: function (group) {
                this._group = group;
            },
            setGroup: function (value) {
                this._group = value;
            },
            getGroup: function () {
                return this._group;
            }
        });
        var start = new Date().getTime(), end, sec, count = 1000000;
        var i = count;
        while (i > 0) {
            new Test('admin');

            --i;
        }
        end = new Date().getTime();
        sec = Math.round((end - start) / 1000);
        console.log('OPS/sec', count / sec);
        console.log('OPS/ms', (count / sec) / 1000);
        console.log(sec);
    });

    function tryCatch(callback) {
        try {
            callback();
        } catch (e) {

            return e.message.replace('\n', '').replace(/\s+/g, ' ');
        }
        return true;
    }
});
