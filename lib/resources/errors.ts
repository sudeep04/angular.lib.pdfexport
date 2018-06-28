export interface ErrorDictionary {

    ARGUMENT_NULL_EXCEPTION: string;
    ARGUMENT_UNDEFINED_EXCEPTION: string;
    ARRAY_TYPEOFF_EXCEPTION: string;
    EMPTY_ARRAY_EXCEPTION: string;
}

export const ERRORS: ErrorDictionary = {
    ARGUMENT_NULL_EXCEPTION: 'Property {0} can not be null.',
    ARGUMENT_UNDEFINED_EXCEPTION: 'Property {0} can not be undefined.',
    ARRAY_TYPEOFF_EXCEPTION: 'Property {0} must be an array.',
    EMPTY_ARRAY_EXCEPTION: 'Property {0} can not be an empty array.'
};
