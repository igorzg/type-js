(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('Class', factory);
    } else if (typeof exports === 'object' && typeof module === 'object') {
        // Node
        module.exports = factory();
    } else {
        // Browser globals
        root.Class = factory();
    }
}(this, function () {
    "use strict";
    var initializing = false;
    /**
     * @license Mit Licence 2014
     * @since 0.0.1
     * @author Igor Ivanovic
     * @name Class
     *
     * @constructor
     * @description
     * Define class constructor
     */
    function Class() {}

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method Class#create
     *
     * @description
     * Create an class
     */
    Class.create = function Class_create(prop) {
        var _super = this.prototype, prototype;

        initializing = true;
        prototype = new this();
        initializing = false;

        Object.keys(prop).forEach(function it(key) {
            if (isFunction(prop[key]) && isFunction(_super[key]) && /\b_super\b/.test(prop[key])) {
                defineProperty(prototype, key, (function (name, fn) {
                    return function () {
                        var tmp = this._super, ret;
                        this._super = _super[name];
                        ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                })(key, prop[key]), "function");
            } else {
                defineProperty(prototype, key, prop[key], getType(prop[key]));
            }
        });

        function Class() {
            if (!initializing && this._construct) {
                this._construct.apply(this, arguments);
                Object.keys(this).forEach(function it(key) {
                    defineProperty(this, key, this[key], getType(this[key]));
                }.bind(this));
                try {
                    Object.preventExtensions(Class.prototype);
                    Object.preventExtensions(this);
                } catch (e) {
                    console.log('ES5 is not supported by your browser', e);
                }
            }
        }
        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.inherit = Class_create;
        return Class;
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method Class#defineProperty
     *
     * @description
     * Define property
     */
    function defineProperty(obj, key, value, type) {
        var iVal = value, nType = type;
        Object.defineProperty(obj, key, {
            set: function (nVal) {

                // if initial value is undefined or null
                if (!nType && Class.isInitialized(nVal)) {
                    nType = Class.getType(nVal);
                    // assert type
                } else if (Class.isInitialized(nVal) && !Class.assert(nType, nVal)) {
                    throw new TypeError('"' + getType(nVal) + '" value: (' + nVal + '), is expected to be: "' + nType + '" type.');
                }
                iVal = nVal;
            },
            get: function () {
                return iVal;
            }
        });
    }

    Class.defineProperty = defineProperty;
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method Class#assert
     *
     * @description
     * Assert type
     */
    Class.assert = function (type, value) {
        return type === Class.getType(value);
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function isInital
     *
     * @description
     * Check if vaule is initial
     */
    Class.isInitialized = function (value) {
        return !Class.isUndefined(value) && !Class.isNull(value);
    };
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function getType
     *
     * @description
     * Get correct type of value
     */
    function getType(value) {
        if (Class.isBoolean(value)) {
            return 'boolean';
        } else if (Class.isUndefined(value)) {
            return 'undefined';
        } else if (Class.isString(value)) {
            return 'string';
        } else if (Class.isNumber(value)) {
            return 'number';
        } else if (Class.isArray(value)) {
            return 'array';
        } else if (Class.isNull(value)) {
            return 'null';
        } else if (Class.isFunction(value)) {
            return 'function';
        } else if (Class.isDate(value)) {
            return 'date';
        } else if (Class.isRegExp(value)) {
            return 'regexp';
        } else if (Class.isObject(value)) {
            return 'object';
        }
        throw new TypeError(value);
    }

    Class.getType = getType;
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function isBoolean
     *
     * @description
     * Check if value is boolean
     */
    Class.isBoolean = function (value) {
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
    Class.isUndefined = function (value) {
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
    Class.isString = function (value) {
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
    Class.isNumber = function (value) {
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
    Class.isArray = function (value) {
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
    Class.isNull = function (value) {
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
    function isFunction(value) {
        return typeof value === 'function';
    }

    Class.isFunction = isFunction;

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function isArray
     *
     * @description
     * Check if value is array
     */
    Class.isDate = function (value) {
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
    Class.isRegExp = function (value) {
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
    Class.isObject = function (value) {
        return !Class.isNull(value) && typeof value === 'object';
    };


    return Class;
}));
