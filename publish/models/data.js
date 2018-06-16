import { Product } from './product';
export class Data {
    get groups() {
        return this._groups;
    }
    constructor() {
        this._groups = [];
        this._groupsTemplates = [];
        this._groups.push([]);
        this._groupsTemplates.push([]);
    }
    addProduct(product) {
        if (this._groups[this._groups.length - 1].length > 2) {
            this._groups.push([]);
            this._groupsTemplates.push([]);
        }
        this._groups[this._groups.length - 1].push(product);
        this._updateGrpupTemplate(this._groupsTemplates[this._groupsTemplates.length - 1], product);
        this._groups[this._groups.length - 1] = this._getProductsStructure(this._groups[this._groups.length - 1], this._groupsTemplates[this._groupsTemplates.length - 1]);
    }
    _updateGrpupTemplate(groupTemplate, product) {
        product.properties.forEach((property) => {
            if (!groupTemplate.find((propertyName) => propertyName === property.name)) {
                groupTemplate.push(property.name);
            }
        });
    }
    _getProductsStructure(group, groupTemplate) {
        const updatedGroup = [];
        group.forEach((product) => {
            const updatedProduct = new Product(product.name, product.supplier);
            groupTemplate.forEach((propertyName, index) => {
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