import { Property } from './property.interface';
export declare class Product {
    readonly name: string;
    readonly supplier: string;
    readonly properties: Property[];
    private _name;
    private _supplier;
    private _properties;
    constructor(name: string, supplier: string);
    addProperty(property: Property): void;
}
