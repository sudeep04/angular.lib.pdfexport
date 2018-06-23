import { Product } from './product';
import { Settings } from './settings.interface';
export declare class Data {
    readonly groups: Product[][];
    readonly settings: Settings;
    private _groups;
    private _groupsTemplates;
    private _settings;
    constructor(settings: Settings);
    addProduct(product: Product): void;
    private _updateGrpupTemplate(groupTemplate, product);
    private _sortGroupTemplate(groupTemplate);
    private _getProductsStructure(group, groupTemplate);
}
