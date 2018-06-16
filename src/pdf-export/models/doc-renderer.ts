import * as moment from 'moment';
import { boxShadowImg } from './imagesBase64/box-shadow-img';
import { checkImg } from './imagesBase64/check-img';
import { unckeckImg } from './imagesBase64/uncheck-img';
import * as jsPDF from 'jspdf';
import 'jspdf-customfonts';
import '../assets/js/default_vfs';
import 'jspdf-autotable';
import { Data } from './data';
import { DocConfig } from './doc-config';
import { Product } from './product';
import { Property } from './property.interface';
import { logoImg } from './imagesBase64/logo-img';

const IMAGES_TOP = 35;
const IMAGES_PADING_TOP = 6.2;

export class DocRenderer {

    private _doc: any;

    constructor() {

        this._doc = new jsPDF();
        this._doc.addFont('Gotham-Medium.ttf', 'GothamMedium', 'normal');
        this._doc.addFont('Gotham-Light.ttf', 'GothamLight', 'normal');
    }

    public drow(data: Data, docConfig: DocConfig) {

        let lastPage = 1;

        data.groups.forEach((group: Product[], index: number) => {

            this._drowBody(group, docConfig);
            for (let i = lastPage + 1; i < this._doc.internal.pages.length; i++) {
                this._doc.setPage(i);
                this._drowHeader(group, docConfig, false);
            }
            lastPage = this._doc.internal.pages.length;
            if (index < data.groups.length - 1) {

                this._doc.addPage();
            }
        });

        for (let i = 1; i < this._doc.internal.pages.length; i++) {
            this._doc.setPage(i);
            this._drowLayout(i, docConfig);
        }
    }

    public save(fileName: string) {

        this._doc.save(fileName);
    }

    private _drowBody(group: Product[], docConfig: DocConfig) {

        this._drowHeader(group, docConfig, true);

        let isFirstWithoutImages = false;

        const pageWidth = this._doc.internal.pageSize.getWidth();

        const columns: any[] = [{ dataKey: 'col1', title: '' }];

        const rows: any[] = [];

        const styles = {
            fillColor: [255, 255, 255],
            lineWidth: 0,
            fontStyle: 'normal',
            cellPadding: [2.8, docConfig.lineWidth + 0.5, 2.8, docConfig.lineWidth + 0.5],
            fontSize: 9,
            textColor: 0,
            overflow: 'linebreak',
            valign: 'middle'
        };

        const columnStyles = {
            col2: { columnWidth: docConfig.columnWidth }
        };

        let borders: any[] = [];

        let checkImages: any[] = [];

        const config: any = {
            styles,
            margin: {
                top: this._doc.autoTable.previous.finalY,
                right: docConfig.padding + docConfig.lineWidth / 2,
                bottom: docConfig.padding + 3 * docConfig.lineWidth / 2 + 10,
                left: docConfig.padding + docConfig.lineWidth / 2
            },
            columnStyles: {
                col1: {}
            },
            alternateRowStyles: styles,
            showHeader: 'never',
            tableWidth: pageWidth - ((3 - group.length) * docConfig.columnWidth) - 2 * docConfig.padding - docConfig.lineWidth,
            drawCell: (cell: any, opts: any) => {

                if (opts.column.index !== 0) {

                    if (group[opts.column.index - 1].properties[opts.row.index].ckeck !== undefined) {

                        checkImages.push({
                            left: cell.x + 3,
                            top: cell.y + cell.height / 2 - 1.5,
                            width: 3,
                            height: 3,
                            check: group[opts.column.index - 1].properties[opts.row.index].ckeck
                        });
                    }
                }

                if (opts.column.dataKey === 'col1') {

                    this._doc.setFont('GothamMedium', 'normal');
                } else {

                    this._doc.setFont('GothamLight', 'normal');
                }
            },
            drawHeaderCell: (cell: any, opts: any) => {

                this._doc.setFont('GothamMedium', 'normal');
            },
            drawHeaderRow: (row: any, opts: any) => {

                borders.push({
                    left: docConfig.padding + docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - ((3 - group.length) * docConfig.columnWidth) - 2 * docConfig.padding - docConfig.lineWidth,
                    height: 0.1
                });
            },
            drawRow: (row: any, opts: any) => {

                borders.push({
                    left: docConfig.padding + docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - ((3 - group.length) * docConfig.columnWidth) - 2 * docConfig.padding - docConfig.lineWidth,
                    height: 0.1
                });
            },
            addPageContent: (data: any) => {
                this._doc.setFillColor(0, 0, 0);
                borders.forEach((border: any, index: number) => {

                    if (index < borders.length - 1) {

                        this._doc.rect(border.left, border.top, border.width, border.height, 'F');
                    }
                });
                borders = [];
                checkImages.forEach((img: any) => {

                    if (img.check) {

                        this._doc.addImage(checkImg, img.left, img.top, img.width, img.height);
                    } else {

                        this._doc.addImage(unckeckImg, img.left, img.top, img.width, img.height);
                    }
                });
                checkImages = [];
                if (!isFirstWithoutImages) {
                    isFirstWithoutImages = true;
                    data.settings.margin.top -= IMAGES_PADING_TOP + docConfig.columnWidth + docConfig.lineWidth / 2;
                }
            }
        };

        group.forEach((product: Product) => {

            columns.push({ dataKey: product.name, title: product.name });
            config.columnStyles[product.name] = { columnWidth: docConfig.columnWidth, cellPadding: [2.8, docConfig.lineWidth + 0.5, 2.8, docConfig.lineWidth + 4.5] };
            if (rows.length === 0) {
                product.properties.forEach((property: Property) => {
                    const row = { col1: property.name };

                    rows.push(row);
                });
            }
            product.properties.forEach((property: Property, index: number) => {

                if (property.value !== undefined) {

                    rows[index][product.name] = property.value.toString();
                }
            });
        });
        this._doc.autoTable(columns, rows, config);
    }

    private _drowHeader(group: Product[], docConfig: DocConfig, isFirst: boolean) {

        const pageWidth = this._doc.internal.pageSize.getWidth();

        if (isFirst) {

            group.forEach((product: Product, index: number) => {

                switch (index) {
                    case 0:
                        this._doc.addImage(boxShadowImg,
                            pageWidth - (docConfig.columnWidth * 3 + docConfig.padding),
                            IMAGES_TOP + IMAGES_PADING_TOP,
                            docConfig.columnWidth,
                            docConfig.columnWidth);
                        this._doc.addImage('assets/images/product2.png',
                            pageWidth - (docConfig.columnWidth * 3 + docConfig.padding) + 3.2,
                            IMAGES_TOP + IMAGES_PADING_TOP + 3.2,
                            docConfig.columnWidth - 6.4,
                            docConfig.columnWidth - 6.4);
                        break;
                    case 1:
                        this._doc.addImage(boxShadowImg,
                            pageWidth - (docConfig.columnWidth * 2 + docConfig.padding),
                            IMAGES_TOP + IMAGES_PADING_TOP,
                            docConfig.columnWidth,
                            docConfig.columnWidth);
                        this._doc.addImage('assets/images/product1.png',
                            pageWidth - (docConfig.columnWidth * 2 + docConfig.padding) + 3.2,
                            IMAGES_TOP + IMAGES_PADING_TOP + 3.2,
                            docConfig.columnWidth - 6.4,
                            docConfig.columnWidth - 6.4);
                        break;
                    case 2:
                        this._doc.addImage(boxShadowImg,
                            pageWidth - (docConfig.columnWidth + docConfig.padding),
                            IMAGES_TOP + IMAGES_PADING_TOP,
                            docConfig.columnWidth,
                            docConfig.columnWidth);
                        this._doc.addImage('assets/images/product3.png',
                            pageWidth - (docConfig.columnWidth + docConfig.padding) + 3.2,
                            IMAGES_TOP + IMAGES_PADING_TOP + 3.2,
                            docConfig.columnWidth - 6.4,
                            docConfig.columnWidth - 6.4);
                        break;
                }
            });
        }

        const columns: any[] = [{ dataKey: 'col1', title: '' }];

        const rows: any[] = [
            { col1: 'Hersteller' }
        ];

        const styles = {
            fillColor: [246, 246, 246],
            lineWidth: 0,
            fontStyle: 'normal',
            cellPadding: [2.8, docConfig.lineWidth + 0.5, 2.8, docConfig.lineWidth + 0.5],
            fontSize: 9,
            textColor: 0,
            overflow: 'linebreak',
            valign: 'middle'
        };

        const columnStyles = {
            col2: { columnWidth: docConfig.columnWidth }
        };

        const borders: any[] = [];

        const config: any = {
            styles,
            margin: { top: isFirst ? IMAGES_TOP + IMAGES_PADING_TOP + docConfig.columnWidth + docConfig.lineWidth / 2 : IMAGES_TOP, left: docConfig.padding + docConfig.lineWidth / 2 },
            columnStyles: {
                col1: {}
            },
            alternateRowStyles: styles,
            tableWidth: pageWidth - ((3 - group.length) * docConfig.columnWidth) - 2 * docConfig.padding - docConfig.lineWidth,
            drawCell: (cell: any, opts: any) => {

                if (opts.column.dataKey === 'col1') {

                    this._doc.setFont('GothamMedium', 'normal');
                } else {

                    this._doc.setFont('GothamLight', 'normal');
                }
            },
            drawHeaderCell: (cell: any, opts: any) => {

                this._doc.setFont('GothamMedium', 'normal');
            },
            drawHeaderRow: (row: any, opts: any) => {

                borders.push({
                    left: docConfig.padding + docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - ((3 - group.length) * docConfig.columnWidth) - 2 * docConfig.padding - docConfig.lineWidth,
                    height: 0.1
                });
            },
            drawRow: (row: any, opts: any) => {

                borders.push({
                    left: docConfig.padding + docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - ((3 - group.length) * docConfig.columnWidth) - 2 * docConfig.padding - docConfig.lineWidth,
                    height: 0.1
                });
            }
        };

        group.forEach((product: Product) => {

            columns.push({ dataKey: product.name, title: product.name });
            rows[0][product.name] = product.supplier;
            config.columnStyles[product.name] = { columnWidth: docConfig.columnWidth };
        });

        this._doc.autoTable(columns, rows, config);

        this._doc.setFillColor(0, 0, 0);
        borders.forEach((border: any) => {

            this._doc.rect(border.left, border.top, border.width, border.height, 'F');
        });
    }

    private _drowLayout(index: number, docConfig: DocConfig) {

        const pageWidth = this._doc.internal.pageSize.getWidth();
        const pageHeight = this._doc.internal.pageSize.getHeight();

        const columns = [
            { dataKey: 'col1' },
            { dataKey: 'col2' }
        ];

        const rows = [
            { col1: 'Architekturbüro', col2: 'Datum: ' + moment(Date.now()).format('DD.MM.YY') },
            { col1: 'Projekt', col2: 'Seite: ' + ('0' + index).slice(-2) + '/' + ('0' + (this._doc.internal.pages.length - 1)).slice(-2) }
        ];

        const styles = {
            fillColor: [246, 246, 246],
            lineWidth: docConfig.lineWidth,
            lineColor: 255,
            cellPadding: [4.4, 4.3, 3.28, 4.3],
            fontSize: 12,
            textColor: 0
        };

        const columnStyles = {
            col2: { columnWidth: docConfig.columnWidth }
        };

        const config: any = {
            styles,
            alternateRowStyles: styles,
            columnStyles,
            margin: { top: docConfig.padding, left: docConfig.padding },
            showHeader: 'never',
            tableWidth: pageWidth - (2 * docConfig.padding + docConfig.columnWidth),
            drawCell: (cell: any, opts: any) => {

                this._doc.setFont('GothamMedium', 'normal');
            }
        };

        this._doc.autoTable(columns, rows, config);

        this._doc.addImage('assets/images/logo.png',
            pageWidth - docConfig.columnWidth - docConfig.padding + docConfig.lineWidth / 2,
            docConfig.padding + docConfig.lineWidth / 2,
            docConfig.columnWidth - docConfig.lineWidth,
            this._doc.autoTable.previous.finalY - this._doc.autoTable.previous.pageStartY - docConfig.lineWidth);

        this._doc.setFont('GothamMedium', 'normal');
        this._doc.setFillColor(246, 246, 246);
        this._doc.rect(docConfig.padding + docConfig.lineWidth / 2,
            pageHeight - (docConfig.padding + docConfig.lineWidth / 2 + 10),
            pageWidth - (2 * docConfig.padding + docConfig.lineWidth), 10, 'F');
        this._doc.setFontSize(9);
        this._doc.text('Copyright © 2018 Plan.One', 12.9, 283.2);

        this._doc.addImage(logoImg, 175.5, 280, 21.6, 4.1);
    }
}
