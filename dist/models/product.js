export class Product {
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get supplier() {
        return this._supplier;
    }
    set supplier(supplier) {
        this._supplier = supplier;
    }
    get imageUrl() {
        return this._imageUrl;
    }
    set imageUrl(imageUrl) {
        this._imageUrl = imageUrl;
    }
    get imageGallery() {
        return this._imageGallery;
    }
    set imageGallery(imageGallery) {
        this._imageGallery = JSON.parse(JSON.stringify(imageGallery));
    }
    get properties() {
        return this._properties;
    }
    set properties(properties) {
        this._properties = JSON.parse(JSON.stringify(properties));
    }
    get downloads() {
        return this._downloads;
    }
    set downloads(downloads) {
        this._downloads = JSON.parse(JSON.stringify(downloads));
    }
    get details() {
        return this._details;
    }
    set details(details) {
        this._details = JSON.parse(JSON.stringify(details));
    }
    constructor(name, supplier) {
        this._name = name;
        this._supplier = supplier;
        this._properties = [];
        this._imageUrl = '';
        this._details = [];
        this._imageGallery = [];
    }
    addProperty(property) {
        this._properties.push(property);
    }
    addImageGallery(imageUrl) {
        this._imageGallery.push(imageUrl);
    }
}
//# sourceMappingURL=product.js.map