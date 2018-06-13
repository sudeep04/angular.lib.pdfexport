import { Product } from './product';

export class Data {

    public get products(): Product[] {

        return this._products;
    }

    private _products: Product[];

    constructor() {

        this._products = [];
    }

    public addProduct(product: Product): void {

        this._products.push(product);
    }
}
