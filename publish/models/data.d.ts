import { Product } from './product';
export declare class Data {
    readonly products: Product[];
    private _products;
    constructor();
    addProduct(product: Product): void;
}
