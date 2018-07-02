import { Product } from './product';
export class Data {
    get groups() {
        return this._groups;
    }
    get settings() {
        return this._settings;
    }
    constructor(settings, filters) {
        this._settings = settings;
        this._groups = [];
        this._properties = [];
        this._groups.push([]);
        this._filters = filters;
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
        product.properties.forEach((property) => {
            if (!this._properties.find((propertyName) => propertyName === property.name)) {
                if (this._settings.applyFilters) {
                    if (this._filters && this._filters.find((filter) => filter === property.name)) {
                        this._properties.push(property.name);
                    }
                }
            }
        });
        this._sortProperties(this._properties);
    }
    _sortProperties(groupTemplate) {
        if (this._settings.sorting === 'assc') {
            groupTemplate = groupTemplate.sort();
        }
        else {
            groupTemplate = groupTemplate.sort((a, b) => a < b ? 1 : -1);
        }
    }
    _getProductsStructure(group, properties) {
        const updatedGroup = [];
        group.forEach((product) => {
            const updatedProduct = new Product(product.name, product.supplier);
            properties.forEach((propertyName, index) => {
                const prop = product.properties.find((property) => property.name === propertyName);
                if (prop) {
                    updatedProduct.properties.push(prop);
                }
                else {
                    updatedProduct.properties.push({ name: propertyName });
                }
            });
            updatedGroup.push(updatedProduct);
        });
        return updatedGroup;
    }
}
//# sourceMappingURL=data.js.map