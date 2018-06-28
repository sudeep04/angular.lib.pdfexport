import { Data } from './data';
import { Check } from './check';
import { Product } from './product';
import { Property } from './property.interface';
import { Settings } from './settings.interface';

export abstract class JsonParser {

    public static parseData(jsonData: any): Data {

        Check.notNullOrUndefined(jsonData, 'jsonData');
        Check.notEmptyArray(jsonData.Products, 'jsonData.Products');

        const settings: Settings = JsonParser.parseSettings(jsonData.Settings);
        const data = new Data(settings);

        jsonData.Products.forEach((jsonProduct: any) => {

            Check.notNullOrUndefined(jsonProduct, 'Product');
            Check.notNullOrUndefined(jsonProduct.ProductData, 'ProductData');
            Check.notNullOrUndefined(jsonProduct.ProductData.Name, 'ProductData.Name');
            Check.notNullOrUndefined(jsonProduct.ProductData.Supplier, 'ProductData.Supplier');
            Check.notNullOrUndefined(jsonProduct.ProductData.Supplier.Name, 'Supplier.Name');

            const product = new Product(jsonProduct.ProductData.Name, jsonProduct.ProductData.Supplier.Name);

            if (jsonProduct.ProductData.PropertySets !== undefined) {

                Check.isArray(jsonProduct.ProductData.PropertySets, 'ProductData.PropertySets');

                jsonProduct.ProductData.PropertySets.forEach((propertySet: any) => {

                    if (propertySet.Properties !== undefined) {

                        Check.isArray(propertySet.Properties, 'Properties');

                        propertySet.Properties.forEach((property: any) => {

                            Check.notNullOrUndefined(property, 'Property');
                            Check.notNullOrUndefined(property.DisplayName, 'Property.DisplayName');

                            let value: string = '';
                            let val1: string = '';
                            let val2: string = '';

                            switch (property.Type) {
                                case 'IfcPropertySingleValue':
                                    val1 = property.NominalValue;

                                    if (property.Unit) {

                                        const direction: 'afterValue' | 'beforeValue' = settings.units[property.Unit.Name] ? settings.units[property.Unit.Name] : 'afterValue';
                                        if (direction === 'afterValue') {
                                            val1 = val1 + ' ' + property.Unit.Name;
                                        } else {
                                            val1 = property.Unit.Name + ' ' + val1;
                                        }
                                    }
                                    value += val1;
                                    break;
                                case 'IfcPropertyListValue':
                                    const listValues: string[] = property.ListValues;
                                    listValues.forEach((v: string, index: number) => {
                                        val1 = v;
                                        if (property.Unit) {

                                            const direction: 'afterValue' | 'beforeValue' = settings.units[property.Unit.Name] ? settings.units[property.Unit.Name] : 'afterValue';
                                            if (direction === 'afterValue') {
                                                val1 = val1 + ' ' + property.Unit.Name;
                                            } else {
                                                val1 = property.Unit.Name + ' ' + val1;
                                            }
                                        }
                                        if (index === 0) {
                                            value += val1;
                                        } else {
                                            value += ', ' + val1;
                                        }
                                    });
                                    break;
                                case 'IfcPropertyBoundedValue':
                                    val1 = property.UpperBoundValue;
                                    val2 = property.LowerBoundValue;

                                    if (property.Unit) {

                                        const direction: 'afterValue' | 'beforeValue' = settings.units[property.Unit.Name] ? settings.units[property.Unit.Name] : 'afterValue';
                                        if (direction === 'afterValue') {
                                            val1 = val1 + ' ' + property.Unit.Name;
                                            val2 = val2 + ' ' + property.Unit.Name;
                                        } else {
                                            val1 = property.Unit.Name + ' ' + val1;
                                            val2 = property.Unit.Name + ' ' + val2;
                                        }
                                    }
                                    value += val1 + ' - ' + val2;
                                    break;
                            }

                            const propertyValue: Property = {
                                name: property.DisplayName,
                                ifdguid: property.ifdguid,
                                value
                            };

                            if (jsonProduct.Score !== undefined && jsonProduct.Score.parameter_components !== undefined) {

                                if (jsonProduct.Score.parameter_components[property.ifdguid] !== undefined) {

                                    propertyValue.ckeck = jsonProduct.Score.parameter_components[property.ifdguid] === property.NominalValue ? true : false;
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

    public static parseSettings(settings: any): Settings {

        const result: Settings = {
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
            units: {}
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

        if (settings.Units) {

            result.units = settings.Units;
        }

        return result;
    }
}
