(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('Type', factory);
    } else if (typeof exports === 'object' && typeof module === 'object') {
        // Node
        module.exports = factory();
    } else {
        // Browser globals
        root.Type = factory();
    }
}(this, function () {
    "use strict";
    var initializing = false, prototype, superRegx = /\b_super\b/;

    /**
     * @license Mit Licence 2014
     * @since 0.0.1
     * @author Igor Ivanovic
     * @name handleSuper
     * @description
     * handle inheritance call
     */
    function handleSuper(name, fn, _super) {
        return function () {
            var tmp = this._super, ret;
            this._super = _super[name];
            ret = fn.apply(this, arguments);
            this._super = tmp;
            return ret;
        };
    }

    /**
     * @license Mit Licence 2014
     * @since 0.0.1
     * @author Igor Ivanovic
     * @name Type
     *
     * @constructor
     * @description
     * Define Type constructor
     */
    function Type() {}
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method Type#create
     *
     * @description
     * Create an Type
     */
    Type.create = function (prop) {
        var _super = this.prototype, prototype;

        if (!Type.assert(Type.OBJECT, prop)) {
            throw new TypeError('prototype object: "' + Type.getType(prop) + '"  is expected to be: "' + Type.OBJECT + '" type.');
        }

        initializing = true;
        prototype = new this;
        initializing = false;

        Object.keys(prop).forEach(function it(key) {
            if (Type.isFunction(prop[key]) && Type.isFunction(_super[key]) && superRegx.test(prop[key])) {
                prototype[key] = handleSuper(key, prop[key], _super);
            } else {
                prototype[key] = prop[key];
            }
        });

        function Class() {
            if (!initializing) {
                if (Type.isFunction(this._construct)) {
                    this._construct.apply(this, arguments);
                    Object.keys(this).forEach(Type.defineProperty.bind(this, this));
                }
                try {
                    Object.freeze(Class.prototype);
                    Object.preventExtensions(this);
                } catch (e) {
                    console.log('ES5 is not supported by your browser', e);
                }
            }
        }

        Class.prototype = prototype;
        Class.prototype.constructor = Type;
        Class.inherit = Type.create;

        try {
            Object.freeze(Class);
        } catch (e) {
            console.log('ES5 is not supported by your browser', e);
        }

        return Class;
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method Type#defineProperty
     *
     * @description
     * Define property
     */
    Type.defineProperty = function (obj, key) {
        var value = obj[key], type;
        type = Type.isInitialized(value) ? Type.getType(value) : false;
        Object.defineProperty(obj, key, {
            set: function (nVal) {

                // if initial value is undefined or null
                if (!type && Type.isInitialized(nVal)) {
                    type = Type.getType(nVal);
                    // assert type
                } else if (Type.isInitialized(nVal) && !Type.assert(type, nVal)) {
                    throw new TypeError('"' + Type.getType(nVal) + '" value: (' + nVal + '), is expected to be: "' + type + '" type.');
                }
                value = nVal;
            },
            get: function () {
                return value;
            }
        });
    };

    Type.OBJECT = "object";
    Type.STIRNG = "string";
    Type.ARRAY = "array";
    Type.REGEX = "regexp";
    Type.NUMBER = "number";
    Type.BOOLEAN = "boolean";
    Type.UNDEFINED = "undefined";
    Type.NULL = "null";
    Type.FUNCTION = "function";
    Type.DATE = "date";
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method Type#assert
     *
     * @description
     * Assert type
     */
    Type.assert = function (type, value) {
        return type === Type.getType(value);
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function isInital
     *
     * @description
     * Check if vaule is initial
     */
    Type.isInitialized = function (value) {
        return !Type.isUndefined(value) && !Type.isNull(value);
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function getType
     *
     * @description
     * Get correct type of value
     */
    Type.getType = function (value) {
        if (Type.isBoolean(value)) {
            return Type.BOOLEAN;
        } else if (Type.isUndefined(value)) {
            return Type.UNDEFINED;
        } else if (Type.isString(value)) {
            return Type.STIRNG;
        } else if (Type.isNumber(value)) {
            return Type.NUMBER;
        } else if (Type.isArray(value)) {
            return Type.ARRAY;
        } else if (Type.isNull(value)) {
            return Type.NULL;
        } else if (Type.isFunction(value)) {
            return Type.FUNCTION;
        } else if (Type.isDate(value)) {
            return Type.DATE;
        } else if (Type.isRegExp(value)) {
            return Type.REGEX;
        } else if (Type.isObject(value)) {
            return Type.OBJECT;
        }
        throw new TypeError(value);
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function isBoolean
     *
     * @description
     * Check if value is boolean
     */
    Type.isBoolean = function (value) {
        return typeof value === 'boolean';
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function isUndefined
     *
     * @description
     * Check if value is un-defined
     */
    Type.isUndefined = function (value) {
        return typeof value === 'undefined';
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function isString
     *
     * @description
     * Check if value is string
     */
    Type.isString = function (value) {
        return typeof value === 'string';
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function isNumber
     *
     * @description
     * Check if value is isNumber
     */
    Type.isNumber = function (value) {
        return typeof value === 'number';
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function isArray
     *
     * @description
     * Check if value is array
     */
    Type.isArray = function (value) {
        return Array.isArray(value);
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function isNull
     *
     * @description
     * Check if value is funciton
     */
    Type.isNull = function (value) {
        return value === null;
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function isFunction
     *
     * @description
     * Check if value is funciton
     */
    Type.isFunction = function (value) {
        return typeof value === 'function';
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function isArray
     *
     * @description
     * Check if value is array
     */
    Type.isDate = function (value) {
        return Object.prototype.toString.call(value) === '[object Date]';
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function isRegExp
     *
     * @description
     * Check if object is an regular expression
     */
    Type.isRegExp = function (value) {
        return Object.prototype.toString.call(value) === '[object RegExp]';
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function isObject
     *
     * @description
     * Check if value is object
     */
    Type.isObject = function (value) {
        return !Type.isNull(value) && typeof value === 'object';
    };

    try {
        Object.freeze(Type);
    } catch (e) {
        console.log('ES5 is not supported by your browser', e);
    }

    return Type;
}));
