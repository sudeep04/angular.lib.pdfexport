import * as jsPDF from 'jspdf';
import { JsonParser } from './json-parser';
import { boxShadowImg } from './imagesBase64/box-shadow-img';
import { logoImg } from './imagesBase64/logo-img';
import { isArray } from 'util';
import { checkImg } from './imagesBase64/check-img';
import { unckeckImg } from './imagesBase64/uncheck-img';
const IMAGES_TOP = 35;
const IMAGES_PADING_TOP = 6.2;
export class DocRendererDetail {
    constructor() {
        this._doc = new jsPDF();
        this._doc.addFont('Gotham-Medium.ttf', 'GothamMedium', 'normal');
        this._doc.addFont('Gotham-Light.ttf', 'GothamLight', 'normal');
    }
    draw(jsonData, docConfig) {
        this._data = JsonParser.parseDataProduct(jsonData);
        this._docConfig = docConfig;
        const topIndex = this._drawHeader();
        const imageMargin = this._drawPrimaryImage();
        this._drawDetails(topIndex, imageMargin);
        this._drawDownloads();
        this._drawGallery();
        for (let i = 1; i < this._doc.internal.pages.length; i++) {
            this._doc.setPage(i);
            this._drawLayout(i);
        }
    }
    save() {
        this._doc.save(this._data.settings.fileName);
    }
    // draw title  and subtitle
    _drawHeader() {
        const pageWidth = this._doc.internal.pageSize.getWidth();
        const maxLineWidth = pageWidth / 2 - this._docConfig.padding * 2;
        // title
        let topIndex = 36;
        this._drawText(this._data.productDetail.name, maxLineWidth, 20, 10, topIndex, [9, 4, 3], ['GothamMedium', 'normal']);
        // subtitles
        topIndex += 9;
        this._drawText(this._data.productDetail.supplier, maxLineWidth, 20, 10, topIndex, [80, 87, 98], ['GothamLight', 'normal']);
        return topIndex;
    }
    _drawText(text, width, fontSize, marginLeft, marginTop, color, font) {
        const split = this._splitLines(text, width, fontSize);
        this._doc.setFont(font[0], font[1]);
        this._doc.setFontSize(fontSize);
        this._doc.setTextColor(color[0], color[1], color[2]);
        this._doc.text(split, marginLeft, marginTop);
    }
    _splitLines(text, maxLineWidth, fontSize) {
        return this._doc.setFont('helvetica', 'neue').setFontSize(fontSize).splitTextToSize(text, maxLineWidth);
    }
    // draw Primary Image
    _drawPrimaryImage() {
        const imageUrl = this._data.productDetail.imageUrl;
        const pageWidth = this._doc.internal.pageSize.getWidth();
        const imageTop = 30 - this._docConfig.lineWidth;
        const columnWidth = pageWidth - 100;
        const imageWidth = pageWidth / 2 - this._docConfig.padding * 2 + 5;
        this._doc.addImage(boxShadowImg, columnWidth, imageTop, imageWidth, imageWidth);
        try {
            this._doc.addImage(imageUrl, columnWidth + 4.2, imageTop + 4.2, imageWidth - 8.4, imageWidth - 8.4);
        }
        catch (e) {
            this._doc.addImage(this._data.settings.placeholderUrl, columnWidth + 4.2, imageTop + 4.2, imageWidth - 8.4, imageWidth - 8.4);
        }
        return { left: columnWidth, top: imageTop + imageWidth };
    }
    // draw details
    _drawDetails(topIndex, imageMargin) {
        const details = this._data.productDetail.details;
        // fix
        const marginTop = topIndex + 20;
        this._drawDetailsText(details, marginTop, imageMargin.top);
    }
    _drawDetailsText(details, marginTop, imageMargin) {
        if (details.length === 0) {
            this._drawBody(marginTop);
        }
        else {
            const specialElementHandlers = {};
            if (marginTop + 25 < this._doc.internal.pageSize.getHeight() - 36) {
                marginTop += 10;
            }
            else {
                this._doc.addPage();
                marginTop = 40;
            }
            const widthColumn = (marginTop < imageMargin && this._doc.internal.getCurrentPageInfo().pageNumber === 1) ?
                this._doc.internal.pageSize.getWidth() / 2 - this._docConfig.padding : this._doc.internal.pageSize.getWidth() - 30;
            const margins = {
                top: 36,
                bottom: 20,
                left: 10,
                width: widthColumn
            };
            const detail = details.pop();
            const div = document.createElement('div');
            const css = '<style> * { font-family: sans-serif !important; font-size: 11pt !important;}; </style>';
            div.innerHTML = css + detail.content.replace('–', '-');
            // draw title
            this._drawText(detail.name, margins.width, 20, margins.left, marginTop, [9, 4, 3], ['GothamMedium', 'normal']);
            // draw detail
            this._doc.fromHTML(div, margins.left, marginTop, {
                width: margins.width,
                // max width of content on PDF
                elementHandlers: specialElementHandlers
            }, margins);
        }
    }
    // draw Page Header and Footer
    _drawLayout(index) {
        const pageWidth = this._doc.internal.pageSize.getWidth();
        const pageHeight = this._doc.internal.pageSize.getHeight();
        // draw header
        this._doc.setFont('GothamMedium', 'normal');
        this._doc.setFontSize(12);
        this._doc.setFillColor(240, 240, 240);
        this._doc.setTextColor(0, 0, 0);
        this._doc.rect(this._docConfig.padding + this._docConfig.lineWidth / 2, this._docConfig.padding + this._docConfig.lineWidth / 2, pageWidth - (2 * this._docConfig.padding + this._docConfig.lineWidth), 10, 'F');
        const project = this._data.settings.captions.project;
        this._doc.text(project, 12.9, this._docConfig.padding + this._docConfig.lineWidth * 3 + 0.5);
        const verticalOffset = this._verticalOffset(project, 12, 12.9);
        this._doc.setFont('GothamLight', 'normal');
        this._doc.text(' - ' + this._data.productDetail.name, verticalOffset, this._docConfig.padding + this._docConfig.lineWidth * 3 + 0.5);
        this._doc.setFontStyle('bold')
            .setFont('GothamMedium', 'normal')
            .text(this._data.settings.translations.layout.page + ': '
            + index + '/' + (this._doc.internal.pages.length - 1), 177, this._docConfig.padding + this._docConfig.lineWidth * 3 + 0.5);
        // draw footer
        this._doc.setFont('GothamMedium', 'normal');
        this._doc.setFontSize(9);
        this._doc.setFillColor(240, 240, 240);
        this._doc.rect(this._docConfig.padding + this._docConfig.lineWidth / 2, pageHeight - (this._docConfig.padding + this._docConfig.lineWidth / 2 + 10), pageWidth - (2 * this._docConfig.padding + this._docConfig.lineWidth), 10, 'F');
        this._doc.text('Copyright © 2018 Plan.One', 12.9, 283.2);
        this._doc.addImage(logoImg, 175.5, 280, 21.6, 4.1);
    }
    _verticalOffset(text, size, left) {
        return left + this._doc.getStringUnitWidth(text) * size / 2.8;
    }
    // draw table
    _drawBody(marginTop) {
        let i = 0;
        const pageWidth = this._doc.internal.pageSize.getWidth();
        const pageHeight = this._doc.internal.pageSize.getHeight();
        const product = this._data.productDetail;
        marginTop += 8;
        if (marginTop + 45 < pageHeight) {
            marginTop += 10;
        }
        else {
            this._doc.addPage();
            marginTop = 40;
        }
        this._drawTableHeader(marginTop, 'Technische Informationen');
        marginTop += 5;
        const columns = [{ dataKey: 'col1', title: '' }];
        const rows = [];
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
        let borders = [];
        let checkImages = [];
        const config = {
            styles,
            margin: {
                top: marginTop,
                right: this._docConfig.padding + this._docConfig.lineWidth / 2,
                bottom: this._docConfig.padding + 3 * this._docConfig.lineWidth / 2 + 10,
                left: this._docConfig.padding + this._docConfig.lineWidth / 2
            },
            columnStyles: {
                col1: {
                    columnWidth: this._docConfig.columnWidth + this._docConfig.padding * 2
                }
            },
            alternateRowStyles: styles,
            showHeader: 'never',
            tableWidth: pageWidth - 2 * this._docConfig.padding - this._docConfig.lineWidth,
            drawCell: (cell, opts) => {
                if (opts.column.index !== 0) {
                    if (product.properties[opts.row.index].ckeck !== undefined) {
                        checkImages.push({
                            left: cell.x + 3,
                            top: cell.y + cell.height / 2 - 1.5,
                            width: 3,
                            height: 3,
                            check: product.properties[opts.row.index].ckeck
                        });
                    }
                }
                this._doc.setFont(opts.column.dataKey === 'col1' ?
                    'GothamMedium' : 'GothamLight', 'normal');
            },
            drawHeaderCell: (cell, opts) => {
                this._doc.setFont('GothamMedium', 'normal');
            },
            drawHeaderRow: (row, opts) => {
                borders.push({
                    left: this._docConfig.padding + this._docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - 60,
                    height: 0.1
                });
            },
            drawRow: (row, opts) => {
                borders.push({
                    left: this._docConfig.padding + this._docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - 60,
                    height: 0.1
                });
            },
            addPageContent: (data) => {
                this._doc.setFillColor(0, 0, 0);
                borders.forEach((border, index) => {
                    if (index < borders.length - 1) {
                        this._doc.rect(border.left, border.top, border.width, border.height, 'F');
                    }
                });
                borders = [];
                checkImages.forEach((img) => {
                    (img.check) ?
                        this._doc.addImage(checkImg, img.left, img.top, img.width, img.height)
                        : this._doc.addImage(unckeckImg, img.left, img.top, img.width, img.height);
                });
                checkImages = [];
                data.settings.margin.top = 40;
                if (++i !== 1) {
                    this._drawTableHeader(36, 'Technische Informationen');
                }
            }
        };
        // fill values
        columns.push({ dataKey: product.name, title: product.name });
        let lineW = this._docConfig.lineWidth + 0.5;
        if (this._data.settings.showHighlights) {
            lineW = lineW + 4;
        }
        config.columnStyles[product.name] = {
            columnWidth: this._docConfig.columnWidth + this._docConfig.padding * 3,
            cellPadding: [2.8, lineW, 2.8, lineW]
        };
        if (rows.length === 0) {
            product.properties.forEach((property) => {
                let row = {};
                if (this._data.settings.applyFilters) {
                    const direction = property.unit !== undefined &&
                        this._data.settings.unitsBeforeValue.find((unit) => unit === property.unit) ?
                        'beforeValue' : 'afterValue';
                    const filterMap = new Map(this._data.filters);
                    const filterValue = filterMap.get(property.ifdguid);
                    let filterText = '';
                    if (filterValue) {
                        if (isArray(filterValue)) {
                            // List Values
                            const listValues = filterValue;
                            listValues.forEach((v, index) => {
                                const val1 = v;
                                if (index === 0) {
                                    filterText += val1;
                                }
                                else {
                                    filterText += ', ' + val1;
                                }
                            });
                        }
                        else if (filterValue.upper !== undefined && filterValue.lower !== undefined) {
                            filterText = filterValue.lower + ' - ' + filterValue.upper;
                        }
                        else {
                            filterText = filterValue.toString();
                        }
                        if (direction === 'afterValue') {
                            filterText = filterText + ' ' + property.unit;
                        }
                        else {
                            filterText = property.unit + ' ' + filterText;
                        }
                        row = { col1: property.name + `\n(${filterText})` };
                    }
                    else {
                        row = { col1: property.name };
                    }
                }
                else {
                    row = { col1: property.name };
                }
                rows.push(row);
            });
        }
        product.properties.forEach((property, index) => {
            if (property.value !== undefined) {
                rows[index][product.name] = property.value.toString();
            }
        });
        this._doc.autoTable(columns, rows, config);
    }
    _drawTableHeader(marginTop, text) {
        this._drawText(text, this._doc.internal.pageSize.getWidth(), 20, 10, marginTop, [0, 0, 0], ['GothamMedium', 'normal']);
    }
    _drawDownloads() {
        let i = 0;
        const pageWidth = this._doc.internal.pageSize.getWidth();
        const pageHeight = this._doc.internal.pageSize.getHeight();
        const product = this._data.productDetail;
        let marginTop = this._doc.autoTable.previous.finalY + 15;
        if (marginTop + 45 < pageHeight) {
            marginTop += 10;
        }
        else {
            this._doc.addPage();
            marginTop = 40;
        }
        this._drawTableHeader(marginTop, 'Downloads');
        marginTop += 5;
        const columns = [{ dataKey: 'col1', title: '' }];
        const rows = [];
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
        let borders = [];
        let checkImages = [];
        const config = {
            styles,
            margin: {
                top: marginTop,
                right: this._docConfig.padding + this._docConfig.lineWidth / 2,
                bottom: this._docConfig.padding + 3 * this._docConfig.lineWidth / 2 + 10,
                left: this._docConfig.padding + this._docConfig.lineWidth / 2
            },
            columnStyles: {
                col1: {
                    columnWidth: this._docConfig.columnWidth + this._docConfig.padding * 2
                }
            },
            alternateRowStyles: styles,
            showHeader: 'never',
            tableWidth: pageWidth - 2 * this._docConfig.padding - this._docConfig.lineWidth,
            drawCell: (cell, opts) => {
                // fix
                if (opts.column.index !== 0) {
                    if (product.properties[opts.row.index].ckeck !== undefined) {
                        checkImages.push({
                            left: cell.x + 3,
                            top: cell.y + cell.height / 2 - 1.5,
                            width: 3,
                            height: 3,
                            check: product.properties[opts.row.index].ckeck
                        });
                    }
                }
                this._doc.setFont(opts.column.dataKey === 'col1' ?
                    'GothamMedium' : 'GothamLight', 'normal');
            },
            drawHeaderCell: (cell, opts) => {
                this._doc.setFont('GothamMedium', 'normal');
            },
            drawHeaderRow: (row, opts) => {
                borders.push({
                    left: this._docConfig.padding + this._docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - 2 * this._docConfig.padding - this._docConfig.lineWidth,
                    height: 0.1
                });
            },
            drawRow: (row, opts) => {
                borders.push({
                    left: this._docConfig.padding + this._docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - this._docConfig.columnWidth * 2 + 2 * this._docConfig.padding,
                    height: 0.1
                });
            },
            addPageContent: (data) => {
                this._doc.setFillColor(0, 0, 0);
                borders.forEach((border, index) => {
                    if (index < borders.length - 1) {
                        this._doc.rect(border.left, border.top, border.width, border.height, 'F');
                    }
                });
                borders = [];
                checkImages.forEach((img) => {
                    (img.check) ?
                        this._doc.addImage(checkImg, img.left, img.top, img.width, img.height)
                        : this._doc.addImage(unckeckImg, img.left, img.top, img.width, img.height);
                });
                checkImages = [];
                data.settings.margin.top = 40;
                if (++i !== 1) {
                    this._drawTableHeader(36, 'Downloads');
                }
            }
        };
        // fill values
        columns.push({ dataKey: product.name, title: product.name });
        let lineW = this._docConfig.lineWidth + 0.5;
        if (this._data.settings.showHighlights) {
            lineW = lineW + 4;
        }
        config.columnStyles[product.name] = {
            columnWidth: this._docConfig.columnWidth + this._docConfig.padding * 3,
            cellPadding: [2.8, lineW, 2.8, lineW]
        };
        // fix
        if (rows.length === 0) {
            product.properties.forEach((property) => {
                let row = {};
                if (this._data.settings.applyFilters) {
                    const direction = property.unit !== undefined &&
                        this._data.settings.unitsBeforeValue.find((unit) => unit === property.unit) ?
                        'beforeValue' : 'afterValue';
                    const filterMap = new Map(this._data.filters);
                    const filterValue = filterMap.get(property.ifdguid);
                    let filterText = '';
                    if (filterValue) {
                        if (isArray(filterValue)) {
                            // List Values
                            const listValues = filterValue;
                            listValues.forEach((v, index) => {
                                const val1 = v;
                                if (index === 0) {
                                    filterText += val1;
                                }
                                else {
                                    filterText += ', ' + val1;
                                }
                            });
                        }
                        else if (filterValue.upper !== undefined && filterValue.lower !== undefined) {
                            filterText = filterValue.lower + ' - ' + filterValue.upper;
                        }
                        else {
                            filterText = filterValue.toString();
                        }
                        if (direction === 'afterValue') {
                            filterText = filterText + ' ' + property.unit;
                        }
                        else {
                            filterText = property.unit + ' ' + filterText;
                        }
                        row = { col1: property.name + `\n(${filterText})` };
                    }
                    else {
                        row = { col1: property.name };
                    }
                }
                else {
                    row = { col1: property.name };
                }
                rows.push(row);
            });
        }
        product.properties.forEach((property, index) => {
            if (property.value !== undefined) {
                rows[index][product.name] = property.value.toString();
            }
        });
        this._doc.autoTable(columns, rows, config);
    }
    _drawGallery() {
        this._doc.addPage();
        const pageHeight = this._doc.internal.pageSize.getHeight();
        const imageWidth = pageHeight / 3 - (this._docConfig.padding * 2 + 2);
        const initialTop = 26;
        const column1 = 10;
        const column2 = imageWidth + this._docConfig.padding * 1.7;
        let imageLeft = column1;
        let imageTop = initialTop;
        this._data.productDetail.imageGallery.forEach((imageUrl, i) => {
            imageLeft = (i % 2 !== 0) ? column2 : column1;
            if ((imageTop + imageWidth) >= (pageHeight - 20)) {
                imageTop = initialTop;
                this._doc.addPage();
            }
            try {
                this._doc.addImage(imageUrl, imageLeft, imageTop, imageWidth, imageWidth);
            }
            catch (e) {
                console.log('Error loading image: ' + imageUrl);
            }
            if (i % 2 !== 0) {
                imageTop += imageWidth + 4;
            }
        });
    }
}
//# sourceMappingURL=doc-renderer-detail.js.map