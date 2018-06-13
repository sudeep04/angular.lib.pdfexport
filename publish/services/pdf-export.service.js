import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-customfonts';
import '../../assets/js/default_vfs';
import 'jspdf-autotable';
import { Data } from '../models/data';
import { Product } from '../models/product';
import { HeaderPainter } from '../models/header-painter';
import { FooterPainter } from '../models/footer-painter';
import { ProductsPainter } from '../models/products-painter';
const DOCUMENT_WIDTH = 210;
const DOCUMENT_PADDING = 8.69;
const LINE_WIDTH = 2.52;
const COLUMN_WIDTH = 43.36;
const TABLE_MARGIN_TOP = 7.4;
export class PdfExportService {
    generatePdf(jsonData) {
        const data = this._parceJsonData(jsonData);
        if (!this._doc) {
            this._init();
        }
        this._buildProducts(data.products);
        this._doc.save('Test.pdf');
    }
    _init() {
        this._doc = new jsPDF();
        this._doc.addFont('Gotham-Medium.ttf', 'GothamMedium', 'normal');
        this._doc.addFont('Gotham-Light.ttf', 'GothamLight', 'normal');
        this._headerPainter = new HeaderPainter();
        this._footerPainter = new FooterPainter();
        this._productsPainter = new ProductsPainter();
    }
    _buildProducts(products) {
        const productsGroups = this._getProductsGoups(products);
        const pageCount = productsGroups.length;
        let pageNo = 1;
        productsGroups.forEach((group) => {
            const pageConfig = { pageNo, pageCount, padding: DOCUMENT_PADDING };
            const tableConfig = { columnWidth: COLUMN_WIDTH, lineWidth: LINE_WIDTH, marginTop: TABLE_MARGIN_TOP };
            this._headerPainter.drow(this._doc, pageConfig, tableConfig);
            this._productsPainter.drow(group, this._doc, pageConfig, tableConfig);
            this._footerPainter.drow(this._doc, pageConfig, tableConfig);
            if (pageNo !== pageCount) {
                this._doc.addPage();
                pageNo++;
            }
        });
    }
    _getProductsGoups(products) {
        const productsGroups = [];
        let i = 2;
        products.forEach((product) => {
            if (i < 2) {
                productsGroups[productsGroups.length - 1].push(product);
                i++;
            }
            else {
                productsGroups.push([]);
                productsGroups[productsGroups.length - 1].push(product);
                i = 0;
            }
        });
        return productsGroups;
    }
    _parceJsonData(jsonData) {
        const data = new Data();
        jsonData.Products.forEach((jsonProduct) => {
            const product = new Product(jsonProduct.ProductData.Name, jsonProduct.ProductData.Supplier.Name);
            jsonProduct.ProductData.PropertySets.forEach((propertySet) => {
                propertySet.Properties.forEach((property) => {
                    if (product.properties.length <= 15) {
                        const propertyValue = {
                            name: property.DisplayName,
                            ifdguid: property.ifdguid,
                            value: property.NominalValue
                        };
                        if (jsonProduct.Score.parameter_components[property.ifdguid] !== undefined) {
                            propertyValue.ckeck = jsonProduct.Score.parameter_components[property.ifdguid] === property.NominalValue ? true : false;
                        }
                        product.addProperty(propertyValue);
                    }
                });
            });
            data.addProduct(product);
        });
        return data;
    }
}
PdfExportService.decorators = [
    { type: Injectable },
];
//# sourceMappingURL=pdf-export.service.js.map