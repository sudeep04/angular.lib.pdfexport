import { Data } from './data';
import { Check } from './check';
import { Product } from './product';
export class JsonParser {
    static parseData(jsonData) {
        Check.notNullOrUndefined(jsonData, 'jsonData');
        Check.notEmptyArray(jsonData.Products, 'jsonData.Products');
        const settings = JsonParser.parseSettings(jsonData.Settings);
        const data = new Data(settings, jsonData.property_filters);
        jsonData.Products.forEach((jsonProduct) => {
            Check.notNullOrUndefined(jsonProduct, 'Product');
            Check.notNullOrUndefined(jsonProduct.ProductData, 'ProductData');
            Check.notNullOrUndefined(jsonProduct.ProductData.Name, 'ProductData.Name');
            Check.notNullOrUndefined(jsonProduct.ProductData.Supplier, 'ProductData.Supplier');
            Check.notNullOrUndefined(jsonProduct.ProductData.Supplier.Name, 'Supplier.Name');
            const product = new Product(jsonProduct.ProductData.Name, jsonProduct.ProductData.Supplier.Name);
            if (jsonProduct.ProductData.PropertySets !== undefined) {
                Check.isArray(jsonProduct.ProductData.PropertySets, 'ProductData.PropertySets');
                jsonProduct.ProductData.PropertySets.forEach((propertySet) => {
                    if (propertySet.Properties !== undefined) {
                        Check.isArray(propertySet.Properties, 'Properties');
                        propertySet.Properties.forEach((property) => {
                            Check.notNullOrUndefined(property, 'Property');
                            Check.notNullOrUndefined(property.DisplayName, 'Property.DisplayName');
                            let originalValue;
                            let value = '';
                            let val1 = '';
                            let val2 = '';
                            const direction = property.Unit !== undefined && settings.unitsBeforeValue.find((unit) => unit === property.Unit.Name) ?
                                'beforeValue'
                                : 'afterValue';
                            switch (property.Type) {
                                case 'IfcPropertySingleValue':
                                    val1 = property.NominalValue;
                                    if (property.Unit) {
                                        if (direction === 'afterValue') {
                                            val1 = val1 + ' ' + property.Unit.Name;
                                        }
                                        else {
                                            val1 = property.Unit.Name + ' ' + val1;
                                        }
                                    }
                                    value += val1;
                                    originalValue = property.NominalValue;
                                    break;
                                case 'IfcPropertyListValue':
                                    const listValues = property.ListValues;
                                    listValues.forEach((v, index) => {
                                        val1 = v;
                                        if (index === 0) {
                                            value += val1;
                                        }
                                        else {
                                            value += ', ' + val1;
                                        }
                                    });
                                    if (property.Unit) {
                                        if (direction === 'afterValue') {
                                            value = value + ' ' + property.Unit.Name;
                                        }
                                        else {
                                            value = property.Unit.Name + ' ' + value;
                                        }
                                    }
                                    originalValue = property.ListValues;
                                    break;
                                case 'IfcPropertyBoundedValue':
                                    val1 = property.LowerBoundValue;
                                    val2 = property.UpperBoundValue;
                                    if (property.Unit) {
                                        if (direction === 'afterValue') {
                                            value = val1 + ' - ' + val2 + ' ' + property.Unit.Name;
                                        }
                                        else {
                                            value = property.Unit.Name + ' ' + val1 + ' - ' + val2;
                                        }
                                    }
                                    originalValue = {
                                        upper: property.UpperBoundValue,
                                        lower: property.LowerBoundValue
                                    };
                                    break;
                            }
                            const propertyValue = {
                                name: property.DisplayName,
                                ifdguid: property.ifdguid,
                                value,
                                originalValue
                            };
                            if (jsonProduct.Score !== undefined && jsonProduct.Score.parameters_components !== undefined) {
                                if (jsonProduct.Score.parameters_components[property.ifdguid] !== undefined) {
                                    propertyValue.ckeck = jsonProduct.Score.parameters_components[property.ifdguid] === 1 ? true : false;
                                }
                            }
                            product.addProperty(propertyValue);
                        });
                    }
                });
            }
            data.addProduct(product);
        });
        return data;
    }
    static parseSettings(settings) {
        const result = {
            sorting: 'assc',
            captions: {
                architectureOffice: 'Architekturbüro',
                project: 'Projekt'
            },
            showProductsImage: true,
            logo: {
                show: false,
                type: 'text',
                data: ''
            },
            unitsBeforeValue: [],
            applyFilters: false
        };
        if (settings.Sorting && (settings.Sorting === 'desc' || settings.Sorting === 'assc')) {
            result.sorting = settings.Sorting;
        }
        if (settings.Captions) {
            if (settings.Captions.ArchitectureOffice) {
                result.captions.architectureOffice = settings.Captions.ArchitectureOffice;
            }
            if (settings.Captions.Project) {
                result.captions.project = settings.Captions.Project;
            }
        }
        if (settings.ShowProductsImage !== undefined) {
            result.showProductsImage = settings.ShowProductsImage;
        }
        if (settings.Logo) {
            if (settings.Logo.Type === 'text' || settings.Logo.Type === 'url') {
                result.logo.type = settings.Logo.Type;
            }
            if (settings.Logo.Show !== undefined) {
                result.logo.show = settings.Logo.Show;
            }
            if (settings.Logo.Data !== undefined) {
                result.logo.data = settings.Logo.Data;
            }
        }
        if (settings.UnitsBeforeValue) {
            result.unitsBeforeValue = settings.UnitsBeforeValue;
        }
        if (settings.ApplyFilters) {
            result.applyFilters = settings.ApplyFilters;
        }
        return result;
    }
}
//# sourceMappingURL=json-parser.js.map