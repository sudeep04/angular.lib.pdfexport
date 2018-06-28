export class Product {
    get name() {
        return this._name;
    }
    get supplier() {
        return this._supplier;
    }
    get properties() {
        return this._properties;
    }
    constructor(name, supplier) {
        this._name = name;
        this._supplier = supplier;
        this._properties = [];
    }
    addProperty(property) {
        this._properties.push(property);
    }
}
//# sourceMappingURL=product.js.map