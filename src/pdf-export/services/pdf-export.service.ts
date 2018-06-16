import { Injectable } from '@angular/core';

import { Data } from '../models/data';
import { Product } from '../models/product';
import { Property } from '../models/property.interface';
import { PageConfig } from '../models/page-config';
import { TableConfig } from '../models/table-config';
import { DocRenderer } from '../models/doc-renderer';
import { DocConfig } from '../models/doc-config';

const DOCUMENT_WIDTH = 210;
const DOCUMENT_PADDING = 8.69;
const LINE_WIDTH = 2.52;
const COLUMN_WIDTH = 43.36;
const TABLE_MARGIN_TOP = 7.4;

@Injectable()
export class PdfExportService {

    private _docRenderer: DocRenderer;

    public generatePdf(jsonData: any): void {

        const data = this._parceJsonData(jsonData);

        if (!this._docRenderer) {

            this._docRenderer = new DocRenderer();
        }
        const docConfig: DocConfig = { columnWidth: COLUMN_WIDTH, lineWidth: LINE_WIDTH, marginTop: TABLE_MARGIN_TOP, padding: DOCUMENT_PADDING };

        this._docRenderer.drow(data, docConfig);

        this._docRenderer.save('Test.pdf');
    }

    private _parceJsonData(jsonData: any): Data {

        const data = new Data();
        jsonData.Products.forEach((jsonProduct: any) => {

            const product = new Product(jsonProduct.ProductData.Name, jsonProduct.ProductData.Supplier.Name);

            jsonProduct.ProductData.PropertySets.forEach((propertySet: any) => {

                propertySet.Properties.forEach((property: any) => {

                    const propertyValue: Property = {
                        name: property.DisplayName,
                        ifdguid: property.ifdguid,
                        value: property.NominalValue
                    };
                    if (jsonProduct.Score.parameter_components[property.ifdguid] !== undefined) {

                        propertyValue.ckeck = jsonProduct.Score.parameter_components[property.ifdguid] === property.NominalValue ? true : false;
                    }

                    product.addProperty(propertyValue);
                });
            });
            data.addProduct(product);
        });

        return data;
    }
}
