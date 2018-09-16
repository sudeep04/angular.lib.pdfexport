import { Data } from './data';
import { Check } from './check';
import { Product } from './product';
import { Property } from './property.interface';
import { Settings } from './settings.interface';

export abstract class JsonParser {

    public static parseData(jsonData: any): Data {

        Check.notNullOrUndefined(jsonData, 'jsonData');
        Check.notEmptyArray(jsonData.products, 'jsonData.products');

        const settings: Settings = JsonParser.parseSettings(jsonData.settings);
        const data = new Data(settings, jsonData.property_filters);

        jsonData.products.forEach((jsonproduct: any) => {
            const product = this._parseProduct(jsonproduct, data, settings);
            data.addProduct(product);
        });

        return data;
    }

    public static parseDataProduct(jsonData: any): Data {

        Check.notNullOrUndefined(jsonData, 'jsonData');
        Check.notNullOrUndefined(jsonData.product, 'jsonData.product');

        const settings: Settings = JsonParser.parseSettings(jsonData.settings);
        const data = new Data(settings, jsonData.property_filters);

        const product = this._parseProduct(jsonData.product, data, settings);
        data.addProduct(product);

        return data;
    }

    public static parseSettings(settings: any): Settings {

        const result: Settings = {
            sorting: 'asc',
            captions: {
                project: 'Projekt',
                bearbeiter: 'Bearbeiter'
            },
            translations: {
                layout: {
                    page: 'Seite',
                    date: 'Datum',
                    supplierName: 'Hersteller'
                },
                downloadTypes: {
                    brochure : 'Broschüre',
                    cadData : 'CAD Data',
                    bimModels: 'BIM Models'
                }
            },
            showProductsImage: true,
            logo: {
                show: false,
                type: 'text',
                data: ''
            },
            productsImageApiPath: 'https://plan.one/api/v1/files/',
            unitsBeforeValue: [],
            applyFilters: false,
            showHighlights: false,
            fileName: 'product-comparison.pdf'
        };
        // sorting
        if (settings.sorting && (settings.sorting === 'dsc' || settings.sorting === 'asc')) {

            result.sorting = settings.sorting;
        }
        // captions
        if (settings.captions) {

            if (settings.captions.project) {

                result.captions.project = settings.captions.project;
            }

            if (settings.captions.bearbeiter) {

                result.captions.bearbeiter = settings.captions.bearbeiter;
            }
        }
        // translations
        if (settings.translations.layout) {

            if (settings.translations.layout.page) {

                result.translations.layout.page = settings.translations.layout.page;
            }

            if (settings.translations.layout.date) {

                result.translations.layout.date = settings.translations.layout.date;
            }

            if (settings.translations.layout.supplierName) {

                result.translations.layout.supplierName = settings.translations.layout.supplierName;
            }

        }
        if (settings.translations.downloadTypes) {
            const downloadTypes = settings.translations.downloadTypes;

            if (downloadTypes.brochure) {
                result.translations.downloadTypes.brochure = downloadTypes.brochure;
            }

            if (downloadTypes.cadData) {
                result.translations.downloadTypes.cadData = downloadTypes.cadData;
            }

            if (downloadTypes.bimModels) {
                result.translations.downloadTypes.bimModels = downloadTypes.bimModels;
            }
        }
        // show Products Image
        if (settings.showProductsImage !== undefined) {

            result.showProductsImage = settings.showProductsImage;
        }

        if (settings.productsImageApiPath !== undefined) {
            result.productsImageApiPath = settings.productsImageApiPath;
        }

        // logo
        if (settings.logo) {

            if (settings.logo.type === 'text' || settings.logo.type === 'url') {

                result.logo.type = settings.logo.type;
            }

            if (settings.logo.show !== undefined) {

                result.logo.show = settings.logo.show;
            }

            if (settings.logo.data !== undefined) {

                result.logo.data = settings.logo.data;
            }
        }
        // units before value
        if (settings.unitsBeforeValue) {

            result.unitsBeforeValue = settings.unitsBeforeValue;
        }
        // apply filters
        if (settings.applyFilters) {

            result.applyFilters = settings.applyFilters;
        }
        // show highlights
        if (settings.showHighlights) {

            result.showHighlights = settings.showHighlights;
        }
        // placeholder  url
        if (settings.placeholderUrl) {

            result.placeholderUrl = settings.placeholderUrl;
        }
        // filename
        if (settings.fileName) {

            result.fileName = settings.fileName;
        }

        return result;
    }

    private static _parseProduct(jsonproduct: any, data: any, settings: any): Product {

        Check.notNullOrUndefined(jsonproduct, 'product');
        Check.notNullOrUndefined(jsonproduct.productData, 'productData');
        Check.notNullOrUndefined(jsonproduct.productData.name, 'productData.name');
        Check.notNullOrUndefined(jsonproduct.productData.supplier, 'productData.supplier');
        Check.notNullOrUndefined(jsonproduct.productData.supplier.name, 'supplier.name');

        const product = new Product(jsonproduct.productData.name, jsonproduct.productData.supplier.name);

        if (data.settings.showProductsImage) {
            if (jsonproduct.productData.primaryImage) {
                const imgUrl = data.settings.productsImageApiPath
                    + jsonproduct.productData.primaryImage.uuid + '/content/' + jsonproduct.productData.primaryImage.content  + '?quality=80&background=white&mode=pad&width=160&height=160';
                product.addImageUrl(imgUrl);
            } else {

                Check.notNullOrUndefined(settings.placeholderUrl, 'settings.placeholderUrl');
                product.addImageUrl(settings.placeholderUrl);
            }
        }

        if (jsonproduct.productData.propertySets !== undefined) {

            Check.isArray(jsonproduct.productData.propertySets, 'productData.propertySets');

            jsonproduct.productData.propertySets.forEach((propertySet: any) => {

                if (propertySet.properties !== undefined) {

                    Check.isArray(propertySet.properties, 'properties');

                    propertySet.properties.forEach((property: any) => {

                        Check.notNullOrUndefined(property, 'property');
                        Check.notNullOrUndefined(property.displayName, 'property.displayName');

                        let originalValue: any;
                        let value: string = '';
                        let val1: string = '';
                        let val2: string = '';
                        const direction: 'afterValue' | 'beforeValue'
                            = property.unit !== undefined && settings.unitsBeforeValue.find((unit: string) => unit === property.unit) ?
                                'beforeValue'
                                : 'afterValue';

                        switch (property.type) {
                            case 0:
                                val1 = property.nominalValue;

                                if (property.unit) {

                                    if (direction === 'afterValue') {
                                        val1 = val1 + ' ' + property.unit;
                                    } else {
                                        val1 = property.unit + ' ' + val1;
                                    }
                                }
                                value += val1;
                                originalValue = property.nominalValue;
                                break;
                            case 1:
                                const listValues: string[] = property.listValues;
                                listValues.forEach((v: string, index: number) => {
                                    val1 = v;

                                    if (index === 0) {
                                        value += val1;
                                    } else {
                                        value += ', ' + val1;
                                    }
                                });
                                if (property.unit) {

                                    if (direction === 'afterValue') {
                                        value = value + ' ' + property.unit;
                                    } else {
                                        value = property.unit + ' ' + value;
                                    }
                                }
                                originalValue = property.listValues;
                                break;
                            case 2:
                                val1 = property.lowerBoundValue;
                                val2 = property.upperBoundValue;
                                value = val1 + ' - ' + val2;

                                if (property.unit) {

                                    if (direction === 'afterValue') {
                                        value = val1 + ' - ' + val2 + ' ' + property.unit;
                                    } else {
                                        value = property.unit + ' ' + val1 + ' - ' + val2;
                                    }
                                }
                                originalValue = {
                                    upper: property.upperBoundValue,
                                    lower: property.lowerBoundValue
                                };
                                break;
                        }

                        const propertyValue: Property = {
                            name: property.displayName,
                            ifdguid: property.ifdguid,
                            value,
                            originalValue,
                            unit: property.unit,
                            type: property.type
                        };

                        if (data.settings.showHighlights && jsonproduct.productScore !== undefined && jsonproduct.productScore.filterScores !== undefined) {
                            const filterMap = new Map(jsonproduct.productScore.filterScores);

                            if (filterMap.has(property.ifdguid) && filterMap.get(property.ifdguid) !== -1) {
                                  propertyValue.ckeck = filterMap.get(property.ifdguid) === 1 ? true : false;
                            }
                        }

                        product.addProperty(propertyValue);
                    });
                }
            });
        }
        return product;

    }

}
