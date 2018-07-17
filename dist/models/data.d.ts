import { Product } from './product';
import { Settings } from './settings.interface';
export declare class Data {
    readonly groups: Product[][];
    readonly settings: Settings;
    private _groups;
    private _properties;
    private _settings;
    private _filters;
    constructor(settings: Settings, filters: any[]);
    addProduct(product: Product): void;
    private _updateProperties(product);
    private _sortProperties(groupTemplate);
    private _getProductsStructure(group, properties);
}
