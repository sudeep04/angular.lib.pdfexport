import { Product } from './product';
export class Data {
    get groups() {
        return this._groups;
    }
    get settings() {
        return this._settings;
    }
    get filters() {
        return this._filters;
    }
    get productDetail() {
        return this._productDetail;
    }
    constructor(settings, filters) {
        this._settings = settings;
        this._groups = [];
        this._properties = [];
        this._groups.push([]);
        this._filters = filters;
    }
    setProductDetail(product) {
        this._productDetail = new Product(product.name, product.supplier);
        this._productDetail.imageUrl = product.imageUrl;
        this._productDetail.imageGallery = product.imageGallery;
        this._productDetail.properties = product.properties;
        this._productDetail.downloads = product.downloads;
        this._productDetail.details = product.details;
    }
    addProduct(product) {
        if (this._groups[this._groups.length - 1].length > 2) {
            this._groups.push([]);
        }
        this._groups[this._groups.length - 1].push(product);
        this._updateProperties(product);
        this._groups[this._groups.length - 1] = this._getProductsStructure(this._groups[this._groups.length - 1], this._properties);
    }
    _updateProperties(product) {
        // var filtersMap = new Map(this._filters);
        product.properties.forEach((property) => {
            if (!this._properties.find((prop) => prop.name === property.name)) {
                // if (!this._settings.applyFilters || (filtersMap && filtersMap.has(property.ifdguid) && this._match(filtersMap.get(property.ifdguid), property.originalValue))) {
                this._properties.push(property);
                // }
            }
        });
        this._sortProperties(this._properties);
    }
    _match(filter, value) {
        if (filter.lower !== undefined && filter.upper !== undefined) {
            if (value.lower !== undefined && value.upper !== undefined) {
                return value.lower >= filter.lower && value.lower <= filter.upper && value.upper >= filter.lower && value.upper <= filter.upper;
            }
            else {
                return value >= filter.lower && value <= filter.upper;
            }
        }
        else if (Array.isArray(filter) || Array.isArray(value)) {
            for (const i of filter) {
                if (value.indexOf(filter[i]) === -1) {
                    return false;
                }
            }
            return true;
        }
        else {
            return JSON.stringify({ value }) === JSON.stringify({ value: filter });
        }
    }
    _sortProperties(groupTemplate) {
        if (this._settings.sorting === 'asc') {
            groupTemplate = groupTemplate.sort((a, b) => a.name > b.name ? 1 : -1);
        }
        else {
            groupTemplate = groupTemplate.sort((a, b) => a.name < b.name ? 1 : -1);
        }
    }
    _getProductsStructure(group, properties) {
        const updatedGroup = [];
        group.forEach((product) => {
            const updatedProduct = new Product(product.name, product.supplier);
            updatedProduct.imageUrl = product.imageUrl;
            properties.forEach((p, index) => {
                const prop = product.properties.find((property) => property.name === p.name);
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
    }
}
//# sourceMappingURL=data.js.map