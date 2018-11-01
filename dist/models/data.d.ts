import { Product } from './product';
import { Settings } from './settings.interface';
import { DownloadElement } from './download/download-element.interface';
export declare class Data {
    readonly groups: Product[][];
    readonly settings: Settings;
    readonly filters: any[];
    readonly productDetail: Product;
    downloads: DownloadElement[];
    private _groups;
    private _properties;
    private _settings;
    private _filters;
    private _productDetail?;
    private _downloads;
    constructor(settings: Settings, filters: any[]);
    setProductDetail(product: Product): void;
    addProduct(product: Product): void;
    translate(value: string): string;
    private _updateProperties(product);
    private _match(filter, value);
    private _sortProperties(groupTemplate);
    private _getProductsStructure(group, properties);
}
