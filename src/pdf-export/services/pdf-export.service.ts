import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-customfonts';
import '../assets/js/default_vfs';
import 'jspdf-autotable';

import { Data } from '../models/data';
import { Product } from '../models/product';
import { Property } from '../models/property.interface';
import { HeaderPainter } from '../models/header-painter';
import { FooterPainter } from '../models/footer-painter';
import { ProductsPainter } from '../models/products-painter';
import { PageConfig } from '../models/page-config';
import { TableConfig } from '../models/table-config';

const DOCUMENT_WIDTH = 210;
const DOCUMENT_PADDING = 8.69;
const LINE_WIDTH = 2.52;
const COLUMN_WIDTH = 43.36;
const TABLE_MARGIN_TOP = 7.4;

@Injectable()
export class PdfExportService {

    private _doc: any;

    private _headerPainter: HeaderPainter;

    private _footerPainter: FooterPainter;

    private _productsPainter: ProductsPainter;

    public generatePdf(jsonData: any): void {

        const data = this._parceJsonData(jsonData);

        if (!this._doc) {

            this._init();
        }

        this._buildProducts(data.products);

        this._doc.save('Test.pdf');
    }

    private _init(): void {

        this._doc = new jsPDF();
        this._doc.addFont('Gotham-Medium.ttf', 'GothamMedium', 'normal');
        this._doc.addFont('Gotham-Light.ttf', 'GothamLight', 'normal');
        this._headerPainter = new HeaderPainter();
        this._footerPainter = new FooterPainter();
        this._productsPainter = new ProductsPainter();
    }

    private _buildProducts(products: Product[]): void {

        const productsGroups = this._getProductsGoups(products);
        const pageCount = productsGroups.length;
        let pageNo = 1;

        productsGroups.forEach((group) => {

            const pageConfig: PageConfig = { pageNo, pageCount, padding: DOCUMENT_PADDING };
            const tableConfig: TableConfig = { columnWidth: COLUMN_WIDTH, lineWidth: LINE_WIDTH, marginTop: TABLE_MARGIN_TOP };

            this._headerPainter.drow(this._doc, pageConfig, tableConfig);
            this._productsPainter.drow(group, this._doc, pageConfig, tableConfig);
            this._footerPainter.drow(this._doc, pageConfig, tableConfig);

            if (pageNo !== pageCount) {

                this._doc.addPage();
                pageNo++;
            }
        });
    }

    private _getProductsGoups(products: Product[]): Product[][] {

        const productsGroups: Product[][] = [];
        let i = 2;

        products.forEach((product) => {
            if (i < 2) {

                productsGroups[productsGroups.length - 1].push(product);
                i++;
            } else {

                productsGroups.push([]);
                productsGroups[productsGroups.length - 1].push(product);
                i = 0;
            }
        });

        return productsGroups;
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
