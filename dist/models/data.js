import { Product } from './product';
var Data = /** @class */ (function () {
    function Data(settings, filters) {
        this._settings = settings;
        this._groups = [];
        this._properties = [];
        this._groups.push([]);
        this._filters = filters;
        this._downloads = [];
    }
    Object.defineProperty(Data.prototype, "groups", {
        get: function () {
            return this._groups;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data.prototype, "settings", {
        get: function () {
            return this._settings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data.prototype, "filters", {
        get: function () {
            return this._filters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data.prototype, "productDetail", {
        get: function () {
            return this._productDetail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data.prototype, "downloads", {
        get: function () {
            return this._downloads;
        },
        set: function (downloads) {
            this._downloads = JSON.parse(JSON.stringify(downloads));
        },
        enumerable: true,
        configurable: true
    });
    Data.prototype.setProductDetail = function (product) {
        this._productDetail = new Product(product.name, product.supplier);
        this._productDetail.imageUrl = product.imageUrl;
        this._productDetail.imageGallery = product.imageGallery;
        this._productDetail.properties = product.properties;
        this._productDetail.downloads = product.downloads;
        this._productDetail.details = product.details;
    };
    Data.prototype.addProduct = function (product) {
        if (this._groups[this._groups.length - 1].length > 2) {
            this._groups.push([]);
        }
        this._groups[this._groups.length - 1].push(product);
        this._updateProperties(product);
        this._groups[this._groups.length - 1] = this._getProductsStructure(this._groups[this._groups.length - 1], this._properties);
    };
    Data.prototype.translate = function (value) {
        var trans;
        if (value === 'true') {
            trans = this._settings.translations.booleanValues.true;
            return trans;
        }
        else if (value === 'false') {
            trans = this._settings.translations.booleanValues.false;
            return trans;
        }
        else {
            return value;
        }
    };
    Data.prototype._updateProperties = function (product) {
        var _this = this;
        // var filtersMap = new Map(this._filters);
        product.properties.forEach(function (property) {
            if (!_this._properties.find(function (prop) { return prop.name === property.name; })) {
                // if (!this._settings.applyFilters || (filtersMap && filtersMap.has(property.ifdguid) && this._match(filtersMap.get(property.ifdguid), property.originalValue))) {
                // if (!this._settings.applyFilters || (filtersMap && filtersMap.has(property.ifdguid) && this._match(filtersMap.get(property.ifdguid), property.originalValue))) {
                _this._properties.push(property);
                // }
            }
        });
        this._sortProperties(this._properties);
    };
    Data.prototype._match = function (filter, value) {
        if (filter.lower !== undefined && filter.upper !== undefined) {
            if (value.lower !== undefined && value.upper !== undefined) {
                return value.lower >= filter.lower && value.lower <= filter.upper && value.upper >= filter.lower && value.upper <= filter.upper;
            }
            else {
                return value >= filter.lower && value <= filter.upper;
            }
        }
        else if (Array.isArray(filter) || Array.isArray(value)) {
            for (var _i = 0, filter_1 = filter; _i < filter_1.length; _i++) {
                var i = filter_1[_i];
                if (value.indexOf(filter[i]) === -1) {
                    return false;
                }
            }
            return true;
        }
        else {
            return JSON.stringify({ value: value }) === JSON.stringify({ value: filter });
        }
    };
    Data.prototype._sortProperties = function (groupTemplate) {
        if (this._settings.sorting === 'asc') {
            groupTemplate = groupTemplate.sort(function (a, b) { return a.name > b.name ? 1 : -1; });
        }
        else {
            groupTemplate = groupTemplate.sort(function (a, b) { return a.name < b.name ? 1 : -1; });
        }
    };
    Data.prototype._getProductsStructure = function (group, properties) {
        var updatedGroup = [];
        group.forEach(function (product) {
            var updatedProduct = new Product(product.name, product.supplier);
            updatedProduct.imageUrl = product.imageUrl;
            properties.forEach(function (p, index) {
                var prop = product.properties.find(function (property) { return property.name === p.name; });
                if (prop) {
                    updatedProduct.properties.push(prop);
                }
                else {
                    updatedProduct.properties.push({ name: p.name, ifdguid: p.ifdguid, originalValue: ' ', unit: p.unit, value: ' ', type: p.type });
                }
            });
            updatedGroup.push(updatedProduct);
        });
        return updatedGroup;
    };
    return Data;
}());
export { Data };
//# sourceMappingURL=data.js.map