import { ERRORS } from '../resources/errors';
var Check = /** @class */ (function () {
    function Check() {
    }
    Check.notNull = function (value, parameterName) {
        if (value === null) {
            throw new Error(this.format(ERRORS.ARGUMENT_NULL_EXCEPTION, parameterName));
        }
    };
    Check.notUndefined = function (value, parameterName) {
        if (value === undefined) {
            throw new Error(this.format(ERRORS.ARGUMENT_UNDEFINED_EXCEPTION, parameterName));
        }
    };
    Check.notNullOrUndefined = function (value, parameterName) {
        this.notNull(value, parameterName);
        this.notUndefined(value, parameterName);
    };
    Check.isArray = function (value, parameterName) {
        if (!Array.isArray(value)) {
            throw new Error(this.format(ERRORS.ARRAY_TYPEOFF_EXCEPTION, parameterName));
        }
    };
    Check.notEmptyArray = function (value, parameterName) {
        this.isArray(value, parameterName);
        this.notNull(value, parameterName);
        this.notUndefined(value, parameterName);
    };
    Check.format = function (value) {
        var replacements = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            replacements[_i - 1] = arguments[_i];
        }
        var replacer = function (match) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var index = +args[0];
            return replacements[index] !== undefined
                ? replacements[index]
                : match;
        };
        return value.replace(new RegExp('{(\\d+)}', 'g'), replacer);
    };
    return Check;
}());
export { Check };
//# sourceMappingURL=check.js.map