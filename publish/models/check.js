import { ERRORS } from '../resources/errors';
export class Check {
    static notNull(value, parameterName) {
        if (value === null) {
            throw new Error(this.format(ERRORS.ARGUMENT_NULL_EXCEPTION, parameterName));
        }
    }
    static notUndefined(value, parameterName) {
        if (value === undefined) {
            throw new Error(this.format(ERRORS.ARGUMENT_UNDEFINED_EXCEPTION, parameterName));
        }
    }
    static notNullOrUndefined(value, parameterName) {
        this.notNull(value, parameterName);
        this.notUndefined(value, parameterName);
    }
    static isArray(value, parameterName) {
        if (!Array.isArray(value)) {
            throw new Error(this.format(ERRORS.ARRAY_TYPEOFF_EXCEPTION, parameterName));
        }
    }
    static notEmptyArray(value, parameterName) {
        this.isArray(value, parameterName);
        this.notNull(value, parameterName);
        this.notUndefined(value, parameterName);
        if (!value.length) {
            throw new Error(this.format(ERRORS.EMPTY_ARRAY_EXCEPTION, parameterName));
        }
    }
    static format(value, ...replacements) {
        const replacer = (match, ...args) => {
            const index = +args[0];
            return replacements[index] !== undefined
                ? replacements[index]
                : match;
        };
        return value.replace(new RegExp('{(\\d+)}', 'g'), replacer);
    }
}
//# sourceMappingURL=check.js.map