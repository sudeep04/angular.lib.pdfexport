import { Product } from './product';
import { Property } from './property.interface';
import { Settings } from './settings.interface';
import { DownloadElement } from './download/download-element.interface';

export class Data {

    public get groups(): Product[][] {

        return this._groups;
    }

    public get settings(): Settings {

        return this._settings;
    }

    public get filters(): any[] {

        return this._filters;
    }

    public get productDetail() {

        return this._productDetail;
    }

    public get downloads(): DownloadElement[] {
        return this._downloads;
    }

    public set downloads(downloads: DownloadElement[]) {
        this._downloads = JSON.parse(JSON.stringify(downloads));
    }

    private _groups: Product[][];

    private _properties: Property[];

    private _settings: Settings;

    private _filters: any[];

    private _productDetail?: Product;

    private _downloads: DownloadElement[];

    constructor(settings: Settings, filters: any[]) {

        this._settings = settings;
        this._groups = [];
        this._properties = [];
        this._groups.push([]);
        this._filters = filters;
        this._downloads = [];
    }

    public setProductDetail(product: Product) {

        this._productDetail = new Product(product.name, product.supplier);
        this._productDetail.imageUrl = product.imageUrl;
        this._productDetail.imageGallery = product.imageGallery;
        this._productDetail.properties = product.properties;
        this._productDetail.downloads = product.downloads;
        this._productDetail.details = product.details;
    }

    public addProduct(product: Product): void {

        if (this._groups[this._groups.length - 1].length > 2) {

            this._groups.push([]);
        }
        this._groups[this._groups.length - 1].push(product);
        this._updateProperties(product);
        this._groups[this._groups.length - 1] = this._getProductsStructure(this._groups[this._groups.length - 1], this._properties);
    }

    public translate(value: string): string {
        let trans: string;
        if (value === 'true') {
            trans = this._settings.translations.booleanValues.true;
            return trans;
        } else if (value === 'false') {
            trans = this._settings.translations.booleanValues.false;
            return trans;
        } else {
            return value;
        }
    }

    private _updateProperties(product: Product): void {

        // var filtersMap = new Map(this._filters);

        product.properties.forEach((property: Property) => {
            if (!this._properties.find((prop: Property) => prop.name === property.name)) {
                // if (!this._settings.applyFilters || (filtersMap && filtersMap.has(property.ifdguid) && this._match(filtersMap.get(property.ifdguid), property.originalValue))) {

                    this._properties.push(property);
                // }
            }
        });

        this._sortProperties(this._properties);
    }

    private _match(filter: any, value: any): boolean {

        if (filter.lower !== undefined && filter.upper !== undefined) {
            if (value.lower !== undefined && value.upper !== undefined) {
                return value.lower >= filter.lower && value.lower <= filter.upper && value.upper >= filter.lower && value.upper <= filter.upper;
            } else {
                return value >= filter.lower && value <= filter.upper;
            }
        } else if (Array.isArray(filter) || Array.isArray(value)) {
            for (const i of filter) {
                if (value.indexOf(filter[i]) === -1) {
                    return false;
                }
            }
            return true;
        } else {
            return JSON.stringify({value}) === JSON.stringify({value: filter});
        }
    }

    private _sortProperties(groupTemplate: Property[]) {

        if (this._settings.sorting === 'asc') {

            groupTemplate = groupTemplate.sort((a: Property, b: Property) => a.name > b.name ? 1 : -1);
        } else {

            groupTemplate = groupTemplate.sort((a: Property, b: Property) => a.name < b.name ? 1 : -1);
        }
    }

    private _getProductsStructure(group: Product[], properties: Property[]): Product[] {

        const updatedGroup: Product[] = [];

        group.forEach((product: Product) => {

            const updatedProduct = new Product(product.name, product.supplier);

            updatedProduct.imageUrl = product.imageUrl;

            properties.forEach((p: Property, index: number) => {

                const prop = product.properties.find((property: Property) => property.name === p.name);
                if (prop) {
                    updatedProduct.properties.push(prop);
                } else {

                    updatedProduct.properties.push({ name: p.name, ifdguid: p.ifdguid, originalValue: ' ', unit: p.unit, value: ' ', type: p.type });
                }
            });
            updatedGroup.push(updatedProduct);
        });
        return updatedGroup;
    }
}
