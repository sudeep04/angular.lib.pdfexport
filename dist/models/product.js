var Product = /** @class */ (function () {
    function Product(name, supplier) {
        this._name = name;
        this._supplier = supplier;
        this._properties = [];
        this._imageUrl = '';
        this._details = [];
        this._imageGallery = [];
    }
    Object.defineProperty(Product.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "supplier", {
        get: function () {
            return this._supplier;
        },
        set: function (supplier) {
            this._supplier = supplier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "imageUrl", {
        get: function () {
            return this._imageUrl;
        },
        set: function (imageUrl) {
            this._imageUrl = imageUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "imageGallery", {
        get: function () {
            return this._imageGallery;
        },
        set: function (imageGallery) {
            this._imageGallery = JSON.parse(JSON.stringify(imageGallery));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "properties", {
        get: function () {
            return this._properties;
        },
        set: function (properties) {
            this._properties = JSON.parse(JSON.stringify(properties));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "downloads", {
        get: function () {
            return this._downloads;
        },
        set: function (downloads) {
            this._downloads = JSON.parse(JSON.stringify(downloads));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "details", {
        get: function () {
            return this._details;
        },
        set: function (details) {
            this._details = JSON.parse(JSON.stringify(details));
        },
        enumerable: true,
        configurable: true
    });
    Product.prototype.addProperty = function (property) {
        this._properties.push(property);
    };
    Product.prototype.addImageGallery = function (imageUrl) {
        this._imageGallery.push(imageUrl);
    };
    return Product;
}());
export { Product };
//# sourceMappingURL=product.js.map