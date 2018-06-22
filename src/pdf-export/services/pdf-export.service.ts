import { Injectable } from '@angular/core';

import { Data } from '../models/data';
import { Product } from '../models/product';
import { Property } from '../models/property.interface';
import { DocRenderer } from '../models/doc-renderer';
import { DocConfig } from '../models/doc-config';
import { Check } from '../models/check';

const DOCUMENT_WIDTH = 210;
const DOCUMENT_PADDING = 8.69;
const LINE_WIDTH = 2.52;
const COLUMN_WIDTH = 43.36;
const TABLE_MARGIN_TOP = 7.4;

@Injectable()
export class PdfExportService {

    private _docRenderer: DocRenderer;

    public generatePdf(jsonData: object): void {

        Check.notNullOrUndefined(jsonData, 'jsonData');

        const data = this._parceJsonData(jsonData);

        this._docRenderer = new DocRenderer();
        const docConfig: DocConfig = { columnWidth: COLUMN_WIDTH, lineWidth: LINE_WIDTH, marginTop: TABLE_MARGIN_TOP, padding: DOCUMENT_PADDING };

        this._docRenderer.drow(data, docConfig);

        this._docRenderer.save('Test.pdf');
    }

    private _parceJsonData(jsonData: any): Data {

        Check.notNullOrUndefined(jsonData.Settings, 'jsonData.Settings');
        Check.notNullOrUndefined(jsonData.Settings.Sorting, 'jsonData.Settings.Sorting');
        Check.notEmptyArray(jsonData.Products, 'jsonData.Products');

        const data = new Data({
            sorting: jsonData.Settings.sorting
        });
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

                            const propertyValue: Property = {
                                name: property.DisplayName,
                                ifdguid: property.ifdguid,
                                value: property.NominalValue
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
}
