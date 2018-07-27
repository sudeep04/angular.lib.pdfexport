export class Product {
    get name() {
        return this._name;
    }
    get supplier() {
        return this._supplier;
    }
    get imageUrl() {
        return this._imageUrl;
    }
    get properties() {
        return this._properties;
    }
    constructor(name, supplier) {
        this._name = name;
        this._supplier = supplier;
        this._properties = [];
        this._imageUrl = "";
    }
    addProperty(property) {
        this._properties.push(property);
    }
    addImageUrl(imageUrl) {
        this._imageUrl = imageUrl;
    }
}
//# sourceMappingURL=product.js.map