import { Product } from './product';
export declare class Data {
    readonly groups: Product[][];
    private _groups;
    private _groupsTemplates;
    constructor();
    addProduct(product: Product): void;
    private _updateGrpupTemplate(groupTemplate, product);
    private _getProductsStructure(group, groupTemplate);
}
