import { Data } from './data';
import { Check } from './check';
import { Product } from './product';
var JsonParser = /** @class */ (function () {
    function JsonParser() {
    }
    JsonParser.parseData = function (jsonData) {
        var _this = this;
        Check.notNullOrUndefined(jsonData, 'jsonData');
        Check.notEmptyArray(jsonData.products, 'jsonData.products');
        var settings = JsonParser.parseSettings(jsonData.settings);
        var data = new Data(settings, jsonData.property_filters);
        jsonData.products.forEach(function (jsonproduct) {
            var product = _this._parseProduct(jsonproduct, data, settings);
            data.addProduct(product);
        });
        return data;
    };
    JsonParser.parseDataProduct = function (jsonData) {
        Check.notNullOrUndefined(jsonData, 'jsonData');
        Check.notEmptyArray(jsonData.products, 'jsonData.products');
        var settings = JsonParser.parseSettings(jsonData.settings);
        var data = new Data(settings, jsonData.property_filters);
        var product = this._parseProduct(jsonData.products[0], data, settings);
        data.setProductDetail(product);
        if (jsonData.downloads) {
            data.downloads = jsonData.downloads;
        }
        return data;
    };
    JsonParser.parseSettings = function (settings) {
        var result = {
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
                    brochure: 'Broschüre',
                    cadData: 'CAD Data',
                    bimModels: 'BIM Models'
                },
                booleanValues: {
                    true: 'Yes',
                    false: 'No'
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
        if (settings.translations.booleanValues) {
            if (settings.translations.booleanValues.true) {
                result.translations.booleanValues.true = settings.translations.booleanValues.true;
            }
            if (settings.translations.booleanValues.false) {
                result.translations.booleanValues.false = settings.translations.booleanValues.false;
            }
        }
        if (settings.translations.downloadTypes) {
            var downloadTypes = settings.translations.downloadTypes;
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
    };
    JsonParser._parseProduct = function (jsonproduct, data, settings) {
        Check.notNullOrUndefined(jsonproduct.productData, 'productData');
        Check.notNullOrUndefined(jsonproduct.productData.name, 'productData.name');
        Check.notNullOrUndefined(jsonproduct.productData.supplier, 'productData.supplier');
        Check.notNullOrUndefined(jsonproduct.productData.supplier.name, 'supplier.name');
        var product = new Product(jsonproduct.productData.name, jsonproduct.productData.supplier.name);
        if (data.settings.showProductsImage) {
            if (jsonproduct.productData.primaryImage) {
                var imgUrl = data.settings.productsImageApiPath
                    + jsonproduct.productData.primaryImage.uuid + '/content/' + jsonproduct.productData.primaryImage.content + '?quality=100&background=white&mode=pad&width=720&height=720';
                product.imageUrl = imgUrl;
            }
            else {
                Check.notNullOrUndefined(settings.placeholderUrl, 'settings.placeholderUrl');
                product.imageUrl = settings.placeholderUrl;
            }
        }
        // parse propertySets
        if (jsonproduct.productData.propertySets !== undefined) {
            Check.isArray(jsonproduct.productData.propertySets, 'productData.propertySets');
            jsonproduct.productData.propertySets.forEach(function (propertySet) {
                if (propertySet.properties !== undefined) {
                    Check.isArray(propertySet.properties, 'properties');
                    propertySet.properties.forEach(function (property) {
                        Check.notNullOrUndefined(property, 'property');
                        Check.notNullOrUndefined(property.displayName, 'property.displayName');
                        var originalValue;
                        var value = '';
                        var val1 = '';
                        var val2 = '';
                        var direction = property.unit !== undefined && settings.unitsBeforeValue.find(function (unit) { return unit === property.unit; }) ?
                            'beforeValue'
                            : 'afterValue';
                        switch (property.type) {
                            case 0:
                                val1 = property.nominalValue;
                                if (property.unit) {
                                    if (direction === 'afterValue') {
                                        val1 = val1 + ' ' + property.unit;
                                    }
                                    else {
                                        val1 = property.unit + ' ' + val1;
                                    }
                                }
                                value += val1;
                                originalValue = property.nominalValue;
                                break;
                            case 1:
                                var listValues = property.listValues;
                                listValues.forEach(function (v, index) {
                                    val1 = v;
                                    if (index === 0) {
                                        value += val1;
                                    }
                                    else {
                                        value += ', ' + val1;
                                    }
                                });
                                if (property.unit) {
                                    if (direction === 'afterValue') {
                                        value = value + ' ' + property.unit;
                                    }
                                    else {
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
                                    }
                                    else {
                                        value = property.unit + ' ' + val1 + ' - ' + val2;
                                    }
                                }
                                originalValue = {
                                    upper: property.upperBoundValue,
                                    lower: property.lowerBoundValue
                                };
                                break;
                        }
                        var propertyValue = {
                            name: property.displayName,
                            ifdguid: property.ifdguid,
                            value: value,
                            originalValue: originalValue,
                            unit: property.unit,
                            type: property.type
                        };
                        if (data.settings.showHighlights && jsonproduct.productScore !== undefined && jsonproduct.productScore.filterScores !== undefined) {
                            var filterMap = new Map(jsonproduct.productScore.filterScores);
                            if (filterMap.has(property.ifdguid) && filterMap.get(property.ifdguid) !== -1) {
                                propertyValue.ckeck = filterMap.get(property.ifdguid) === 1 ? true : false;
                            }
                        }
                        product.addProperty(propertyValue);
                    });
                }
            });
        }
        // parse details
        if (jsonproduct.productData.details !== undefined) {
            Check.isArray(jsonproduct.productData.details, 'productData.details');
            product.details = jsonproduct.productData.details;
        }
        // parse downloads
        if (jsonproduct.productData.downloads !== undefined) {
            product.downloads = jsonproduct.productData.downloads;
        }
        // parse imagesGallery
        if (jsonproduct.productData.imageGallery !== undefined) {
            jsonproduct.productData.imageGallery.forEach(function (image) {
                var imgUrl = data.settings.productsImageApiPath
                    + image.uuid + '/content/'
                    + image.content
                    + '?quality=100&background=white&mode=pad&width=720&height=720';
                product.addImageGallery(imgUrl);
            });
        }
        return product;
    };
    return JsonParser;
}());
export { JsonParser };
//# sourceMappingURL=json-parser.js.map