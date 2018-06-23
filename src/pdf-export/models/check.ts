import { ERRORS } from '../resources/errors';

export abstract class Check {

    public static notNull(value: any, parameterName: string) {

        if (value === null) {
            throw new Error(this.format(ERRORS.ARGUMENT_NULL_EXCEPTION, parameterName));
        }
    }

    public static notUndefined(value: any, parameterName: string) {

        if (value === undefined) {
            throw new Error(this.format(ERRORS.ARGUMENT_UNDEFINED_EXCEPTION, parameterName));
        }
    }

    public static notNullOrUndefined(value: any, parameterName: string) {

        this.notNull(value, parameterName);
        this.notUndefined(value, parameterName);
    }

    public static isArray(value: any, parameterName: string) {

        if (!Array.isArray(value)) {
            throw new Error(this.format(ERRORS.ARRAY_TYPEOFF_EXCEPTION, parameterName));
        }
    }

    public static notEmptyArray(value: any, parameterName: string) {

        this.isArray(value, parameterName);
        this.notNull(value, parameterName);
        this.notUndefined(value, parameterName);
    }

    private static format(value: string, ...replacements: string[]): string {

        const replacer = (match: string, ...args: any[]) => {
            const index = +args[0];

            return replacements[index] !== undefined
                ? replacements[index]
                : match
                ;
        };

        return value.replace(new RegExp('{(\\d+)}', 'g'), replacer);
    }
}
