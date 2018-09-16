import * as jsPDF from 'jspdf';
import * as moment from 'moment';
import { IDocRenderer } from './doc-renderer.interface';
import { DocConfig } from './doc-config';
import { Data } from './data';
import { JsonParser } from './json-parser';
import { Product } from './product';
import { boxShadowImg } from '../../dist/models/imagesBase64/box-shadow-img';
import { logoImg } from './imagesBase64/logo-img';
import { Property } from './property.interface';
import { isArray } from 'util';
import { checkImg } from './imagesBase64/check-img';
import { unckeckImg } from './imagesBase64/uncheck-img';

const IMAGES_TOP = 35;
const IMAGES_PADING_TOP = 6.2;

export class DocRendererDetail implements IDocRenderer {

    private _doc: any;

    private _data: Data;

    private _docConfig: DocConfig;

    constructor() {
        this._doc = new jsPDF();
        this._doc.addFont('Gotham-Medium.ttf', 'GothamMedium', 'normal');
        this._doc.addFont('Gotham-Light.ttf', 'GothamLight', 'normal');
    }

    public draw(jsonData: any, docConfig: DocConfig): void {

        this._data = JsonParser.parseDataProduct(jsonData);
        this._docConfig = docConfig;

        let lastPage = 1;
        this._data.groups.forEach((group: Product[], index: number) => {

            this._drawBody(group);
            for (let i = lastPage + 1; i < this._doc.internal.pages.length; i++) {
                this._doc.setPage(i);
                this._drawHeader(group, false);
            }
            lastPage = this._doc.internal.pages.length;
            if (index < this._data.groups.length - 1) {

                this._doc.addPage();
            }
        });

        for (let i = 1; i < this._doc.internal.pages.length; i++) {
            this._doc.setPage(i);
            this._drawLayout(i);
        }
    }

    public save(): void {
        this._doc.save(this._data.settings.fileName);
    }

    // draw content
    private _drawBody(group: Product[]) {
        // draw header for first page
        this._drawHeader(group, this._data.settings.showProductsImage);

        // table config
        let isFirstWithoutImages = !this._data.settings.showProductsImage;

        const pageWidth = this._doc.internal.pageSize.getWidth();

        const columns: any[] = [{ dataKey: 'col1', title: '' }];

        const rows: any[] = [];

        const styles = {
            fillColor: [255, 255, 255],
            lineWidth: 0,
            fontStyle: 'normal',
            cellPadding: [2.8, this._docConfig.lineWidth + 0.5, 2.8, this._docConfig.lineWidth + 0.5],
            fontSize: 9,
            textColor: 0,
            overflow: 'linebreak',
            valign: 'middle'
        };

        let borders: any[] = [];

        let checkImages: any[] = [];

        const config: any = {
            styles,
            margin: {
                top: this._doc.autoTable.previous.finalY,
                right: this._docConfig.padding + this._docConfig.lineWidth / 2,
                bottom: this._docConfig.padding + 3 * this._docConfig.lineWidth / 2 + 10,
                left: this._docConfig.padding + this._docConfig.lineWidth / 2
            },
            columnStyles: {
                col1: {}
            },
            alternateRowStyles: styles,
            showHeader: 'never',
            tableWidth: pageWidth - 2 * this._docConfig.padding - this._docConfig.lineWidth,
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

                this._doc.setFont(opts.column.dataKey === 'col1' ?
                'GothamMedium' : 'GothamLight', 'normal');

            },
            drawHeaderCell: (cell: any, opts: any) => {

                this._doc.setFont('GothamMedium', 'normal');
            },
            drawHeaderRow: (row: any, opts: any) => {

                borders.push({
                    left: this._docConfig.padding + this._docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - 2 * this._docConfig.padding - this._docConfig.lineWidth,
                    height: 0.1
                });
            },
            drawRow: (row: any, opts: any) => {

                borders.push({
                    left: this._docConfig.padding + this._docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - 2 * this._docConfig.padding - this._docConfig.lineWidth,
                    height: 0.1
                });
            },
            addPageContent: (data: any) => {
                this._doc.setFillColor(0, 0, 0);
                borders.forEach((border: any, index: number) => {

                    if (index < borders.length - 1) {

                        this._doc.rect(
                            border.left, border.top, border.width, border.height, 'F'
                        );
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
                    data.settings.margin.top -= IMAGES_PADING_TOP + this._docConfig.columnWidth + this._docConfig.lineWidth / 2;
                }
            }
        };

        // fill values
        group.forEach((product: Product) => {

            columns.push({ dataKey: product.name, title: product.name });

            let lineW = this._docConfig.lineWidth + 0.5;
            if (this._data.settings.showHighlights) {
                lineW = lineW + 4;
            }

            config.columnStyles[product.name] = {
                columnWidth: pageWidth / 2 - this._docConfig.padding * 2,
                cellPadding: [2.8, this._docConfig.lineWidth + 0.5, 2.8, lineW]
            };

            if (rows.length === 0) {
                product.properties.forEach((property: Property) => {
                    let row = {};
                    if (this._data.settings.applyFilters) {

                        const direction: 'afterValue' | 'beforeValue'
                            = property.unit !== undefined &&
                            this._data.settings.unitsBeforeValue.find((unit: string) => unit === property.unit) ?
                                'beforeValue' : 'afterValue';

                        const filterMap = new Map(this._data.filters);
                        const filterValue = filterMap.get(property.ifdguid) as any;
                        let filterText = '';

                        if (filterValue) {
                            if (isArray(filterValue)) {
                                // List Values
                                const listValues: string[] = filterValue;
                                listValues.forEach((v: string, index: number) => {
                                    const val1 = v;

                                    if (index === 0) {
                                        filterText += val1;
                                    } else {
                                        filterText += ', ' + val1;
                                    }
                                });
                            } else if (filterValue.upper !== undefined && filterValue.lower !== undefined) {
                                filterText = filterValue.lower + ' - ' + filterValue.upper;
                            } else {
                                filterText = filterValue.toString();
                            }

                            if (direction === 'afterValue') {
                                filterText = filterText + ' ' + property.unit;
                            } else {
                                filterText = property.unit + ' ' + filterText;
                            }
                            row = { col1: property.name + `\n(${filterText})` };
                        } else {
                            row = { col1: property.name };
                        }
                    } else {
                        row = { col1: property.name };
                    }
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

    // draw Primary Image and TableHeader
    private _drawHeader(group: Product[], showProductsImage: boolean) {

        const pageWidth = this._doc.internal.pageSize.getWidth();

        if (group && group.length === 1) {
            const product = group[0];
            if (showProductsImage) {
                this._drawPrimaryImage(product, pageWidth);
            }
            this._formatTableHeader(product, showProductsImage);
        }
    }

    // draw Primary Image
    private _drawPrimaryImage(product: Product, pageWidth: number, column: number = 1) {
        this._doc.addImage(
            boxShadowImg,
            pageWidth - (this._docConfig.columnWidth * column  + this._docConfig.padding),
            IMAGES_TOP + IMAGES_PADING_TOP,
            this._docConfig.columnWidth,
            this._docConfig.columnWidth
        );
        try {
            this._doc.addImage(
                // data image
                product.imageUrl,
                // x - left
                pageWidth - (this._docConfig.columnWidth * column + this._docConfig.padding) + 3.2,
                // y - top
                IMAGES_TOP + IMAGES_PADING_TOP + 3.2,
                // width
                this._docConfig.columnWidth - 6.4,
                // height
                this._docConfig.columnWidth - 6.4
            );
        } catch (e) {
            this._doc.addImage(this._data.settings.placeholderUrl,
                pageWidth - (this._docConfig.columnWidth * column + this._docConfig.padding) + 3.2,
                IMAGES_TOP + IMAGES_PADING_TOP + 3.2,
                this._docConfig.columnWidth - 6.4,
                this._docConfig.columnWidth - 6.4);
        }
    }

    // draw Table Header
    private _formatTableHeader(product: Product, showProductsImage: boolean = false) {

        const pageWidth = this._doc.internal.pageSize.getWidth();

        const styles = {
            fillColor: [246, 246, 246],
            lineWidth: 0,
            fontStyle: 'normal',
            cellPadding: [2.8, this._docConfig.lineWidth + 0.5, 2.8, this._docConfig.lineWidth + 0.5],
            fontSize: 9,
            textColor: 0,
            overflow: 'linebreak',
            valign: 'middle'
        };
        const borders: any[] = [];

        const config: any = {
            styles,
            margin: {
                top: showProductsImage ? IMAGES_TOP + IMAGES_PADING_TOP + this._docConfig.columnWidth + this._docConfig.lineWidth / 2 : IMAGES_TOP,
                left: this._docConfig.padding + this._docConfig.lineWidth / 2
            },
            columnStyles: {
                col1: {}
            },
            alternateRowStyles: styles,
            tableWidth: pageWidth - 2 * this._docConfig.padding - this._docConfig.lineWidth,
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

                // set border row
                borders.push({
                    left: this._docConfig.padding + this._docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - 2 * this._docConfig.padding - this._docConfig.lineWidth,
                    height: 0.1
                });
            },
            drawRow: (row: any, opts: any) => {

                // set border row
                borders.push({
                    left: this._docConfig.padding + this._docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - 2 * this._docConfig.padding - this._docConfig.lineWidth,
                    height: 0.1
                });
            }
        };

        // first column
        const columns: any[] = [{ dataKey: 'col1', title: '' }];
        const rows: any[] = [
            { col1: this._data.settings.translations.layout.supplierName }
        ];

        // second column
        columns.push({ dataKey: product.name, title: product.name });
        rows[0][product.name] = product.supplier;

        config.columnStyles[product.name] = {
            columnWidth: pageWidth / 2 - this._docConfig.padding * 2
        };

        this._doc.autoTable(columns, rows, config);
        this._doc.setFillColor(0, 0, 0);
        borders.forEach((border: any) => {
            this._doc.rect(border.left, border.top, border.width, border.height, 'F');
        });
    }

    // draw Page Header and Footer
    private _drawLayout(index: number) {

        const pageWidth = this._doc.internal.pageSize.getWidth();
        const pageHeight = this._doc.internal.pageSize.getHeight();

        const columns = [
            { dataKey: 'col1'},
            { dataKey: 'col2'}
        ];

        const rows = [
            // page header
            {
                col1: this._data.settings.captions.project,
                col2: this._data.settings.translations.layout.date + ': ' + moment(Date.now()).format('DD.MM.YY')
            },
            {
                col1: this._data.settings.captions.bearbeiter,
                col2: this._data.settings.translations.layout.page + ': '
                + ('0' + index).slice(-2) + ('0' + (this._doc.internal.pages.length - 1)).slice(-2)
            }
        ];

        const styles = {
            fillColor: [246, 246, 246],
            lineWidth: this._docConfig.lineWidth,
            lineColor: 255,
            cellPadding: [4.4, 4.3, 3.28, 4.3],
            fontSize: 12,
            textColor: 0
        };

        const columnStyles = {
            col2: { columnWidth: this._docConfig.columnWidth }
        };

        const config: any = {
            styles,
            alternateRowStyles: styles,
            columnStyles,
            margin: {
                top: this._docConfig.padding,
                left: this._docConfig.padding
            },
            showHeader: 'never',
            tableWidth: this._data.settings.logo.show ?
                pageWidth - (2 * this._docConfig.padding + this._docConfig.columnWidth) :
                pageWidth - (2 * this._docConfig.padding),
            drawCell: (cell: any, opts: any) => {
                this._doc.setFont('GothamMedium', 'normal');
            }
        };

        this._doc.autoTable(columns, rows, config);

        // draw logo
        const tableHeight = this._doc.autoTable.previous.finalY - this._doc.autoTable.previous.pageStartY - this._docConfig.lineWidth;

        if (this._data.settings.logo.show) {
            // image
            if (this._data.settings.logo.type === 'url') {

                this._doc.addImage(
                    this._data.settings.logo.data,
                    pageWidth - this._docConfig.columnWidth - this._docConfig.padding +         this._docConfig.lineWidth / 2,
                    this._docConfig.padding + this._docConfig.lineWidth / 2,
                    this._docConfig.columnWidth - this._docConfig.lineWidth,
                    tableHeight
                );
            }
            // text
            if (this._data.settings.logo.type === 'text') {
                this._doc.setFont('GothamMedium', 'normal');

                let fontSize = 14;
                while ((this._doc.getStringUnitWidth(this._data.settings.logo.data) * fontSize) / 2.88 > this._docConfig.columnWidth - this._docConfig.lineWidth) {
                    fontSize--;
                }
                const logoWidth = (this._doc.getStringUnitWidth(this._data.settings.logo.data) * fontSize) / 2.88;

                this._doc.setFontSize(fontSize);
                this._doc.text(
                    this._data.settings.logo.data,
                    pageWidth - this._docConfig.columnWidth - this._docConfig.padding +
                        this._docConfig.lineWidth / 2 + (this._docConfig.columnWidth -
                        this._docConfig.lineWidth - logoWidth) / 2,
                    this._docConfig.padding + this._docConfig.lineWidth + tableHeight / 2
                );
            }
        }

        // draw footer
        this._doc.setFont('GothamMedium', 'normal');
        this._doc.setFontSize(9);
        this._doc.setFillColor(246, 246, 246);
        this._doc.rect(
            this._docConfig.padding + this._docConfig.lineWidth / 2,
            pageHeight - (this._docConfig.padding + this._docConfig.lineWidth / 2 + 10),
            pageWidth - (2 * this._docConfig.padding + this._docConfig.lineWidth),
            10,
            'F'
        );
        this._doc.text('Copyright © 2018 Plan.One', 12.9, 283.2);

        this._doc.addImage(logoImg, 175.5, 280, 21.6, 4.1);

    }
}
