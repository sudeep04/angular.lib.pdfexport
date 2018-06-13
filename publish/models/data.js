export class Data {
    get products() {
        return this._products;
    }
    constructor() {
        this._products = [];
    }
    addProduct(product) {
        this._products.push(product);
    }
}
//# sourceMappingURL=data.js.map