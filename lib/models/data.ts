import { Product } from './product';
import { Property } from './property.interface';
import { Settings } from './settings.interface';

export class Data {

    public get groups(): Product[][] {

        return this._groups;
    }

    public get settings(): Settings {

        return this._settings;
    }

    private _groups: Product[][];

    private _properties: string[];

    private _settings: Settings;

    private _filters: any[];

    constructor(settings: Settings, filters: any[]) {

        this._settings = settings;
        this._groups = [];
        this._properties = [];
        this._groups.push([]);
        this._filters = filters;
    }

    public addProduct(product: Product): void {

        if (this._groups[this._groups.length - 1].length > 2) {

            this._groups.push([]);
        }
        this._groups[this._groups.length - 1].push(product);
        this._updateProperties(product);
        this._groups[this._groups.length - 1] = this._getProductsStructure(this._groups[this._groups.length - 1], this._properties);
    }

    private _updateProperties(product: Product): void {

        product.properties.forEach((property: Property) => {
            if (!this._properties.find((propertyName: string) => propertyName === property.name)) {
                if (!this._settings.applyFilters || (this._filters && this._filters.find((filter: any) => filter.id === property.ifdguid && this._match(filter.value, property.originalValue)))) {

                    this._properties.push(property.name);
                }
            }
        });

        this._sortProperties(this._properties);
    }

    private _match(filter:any, value: any): boolean {

        if(filter.lower && filter.upper){
            if(value.lower && value.upper){
                return value.lower>=filter.lower && value.lower<=filter.upper && value.upper>=filter.lower && value.upper<=filter.upper;
            }else{
                return value>=filter.lower && value<=filter.upper;
            }
        }else{
            return JSON.stringify({value}) === JSON.stringify({value:filter});
        }
    }

    private _sortProperties(groupTemplate: string[]) {

        if (this._settings.sorting === 'asc') {

            groupTemplate = groupTemplate.sort();
        } else {

            groupTemplate = groupTemplate.sort((a: string, b: string) => a < b ? 1 : -1);
        }
    }

    private _getProductsStructure(group: Product[], properties: string[]): Product[] {

        const updatedGroup: Product[] = [];

        group.forEach((product: Product) => {

            const updatedProduct = new Product(product.name, product.supplier);

            updatedProduct.addImageUrl(product.imageUrl);
            

            properties.forEach((propertyName: string, index: number) => {

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
