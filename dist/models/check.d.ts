export declare abstract class Check {
    static notNull(value: any, parameterName: string): void;
    static notUndefined(value: any, parameterName: string): void;
    static notNullOrUndefined(value: any, parameterName: string): void;
    static isArray(value: any, parameterName: string): void;
    static notEmptyArray(value: any, parameterName: string): void;
    private static format(value, ...replacements);
}
