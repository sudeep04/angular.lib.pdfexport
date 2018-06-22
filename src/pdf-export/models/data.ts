import { Product } from './product';
import { Property } from './property.interface';
import { Settings } from './settings.interface';

export class Data {

    public get groups(): Product[][] {

        return this._groups;
    }

    private _groups: Product[][];

    private _groupsTemplates: string[][];

    private _settings: Settings;

    constructor(settings: Settings) {

        this._settings = settings;
        this._groups = [];
        this._groupsTemplates = [];
        this._groups.push([]);
        this._groupsTemplates.push([]);
    }

    public addProduct(product: Product): void {

        if (this._groups[this._groups.length - 1].length > 2) {

            this._groups.push([]);
            this._groupsTemplates.push([]);
        }
        this._groups[this._groups.length - 1].push(product);
        this._updateGrpupTemplate(this._groupsTemplates[this._groupsTemplates.length - 1], product);
        this._groups[this._groups.length - 1] = this._getProductsStructure(this._groups[this._groups.length - 1], this._groupsTemplates[this._groupsTemplates.length - 1]);
    }

    private _updateGrpupTemplate(groupTemplate: string[], product: Product): void {

        product.properties.forEach((property: Property) => {
            if (!groupTemplate.find((propertyName: string) => propertyName === property.name)) {
                groupTemplate.push(property.name);
            }
        });
    }

    private _getProductsStructure(group: Product[], groupTemplate: string[]): Product[] {

        const updatedGroup: Product[] = [];

        group.forEach((product: Product) => {

            const updatedProduct = new Product(product.name, product.supplier);

            groupTemplate.forEach((propertyName: string, index: number) => {

                const prop = product.properties.find((property: Property) => property.name === propertyName);
                if (prop) {
                    updatedProduct.properties.push(prop);
                } else {

                    updatedProduct.properties.push({ name: propertyName });
                }
            });
            updatedGroup.push(updatedProduct);
        });
        return updatedGroup;
    }
}
