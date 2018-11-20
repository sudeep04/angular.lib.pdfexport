import * as jsPDF from 'jspdf';
import { IDocRenderer } from './doc-renderer.interface';
import { DocConfig } from './doc-config';
import { JsonParser } from './json-parser';
import { boxShadowImg } from './imagesBase64/box-shadow-img';
import { logoImg } from './imagesBase64/logo-img';
import { Property } from './property.interface';
import { isArray } from 'util';
import { checkImg } from './imagesBase64/check-img';
import { unckeckImg } from './imagesBase64/uncheck-img';
import { DownloadElement } from './download/download-element.interface';
import { DownloadValue } from './download/download-value.interface';
import { Detail } from './detail/detail.interface';

const IMAGES_TOP = 35;
const IMAGES_PADING_TOP = 6.2;

export class DocRendererDetail extends IDocRenderer {

    private _marginsPrimaryImage: any;

    constructor() {
        super();
        this._doc = new jsPDF();
        this._doc.addFont('Gotham-Medium.ttf', 'GothamMedium', 'normal');
        this._doc.addFont('Gotham-Light.ttf', 'GothamLight', 'normal');
        this._doc.addFont('Gotham-Office.ttf', 'GothamOffice', 'normal');
    }

    public draw(jsonData: any, docConfig: DocConfig): void {

        this._data = JsonParser.parseDataProduct(jsonData);
        this._docConfig = docConfig;

        this._loadImages(0, [boxShadowImg], [], this._drawBoxImage.bind(this));

    }

    private save(): void {
        this._doc.save(this._data.settings.fileName);
    }

    // draw title  and subtitle
    private _drawHeader(): number {
        const pageWidth = this._doc.internal.pageSize.getWidth();
        const maxLineWidth = pageWidth / 2 - this._docConfig.padding * 2;

        // title
        let topIndex = 36;
        this._drawText(this._data.productDetail.name, maxLineWidth, 20, 10, topIndex, [9, 4, 3], ['GothamMedium', 'normal']);

        // subtitles
        topIndex += 9;
        this._drawText(this._data.productDetail.supplier, maxLineWidth, 20, 10, topIndex, [70, 70, 70], ['GothamOffice', 'normal']);

        return topIndex;
    }

    private _drawText(text: string, width: number, fontSize: number, marginLeft: number, marginTop: number, color: number[], font: string[] ) {

        const split = this._splitLines(text, width, fontSize);
        this._doc.setFont(font[0], font[1]);
        this._doc.setFontSize(fontSize);
        this._doc.setTextColor(color[0], color[1], color[2]);
        this._doc.text(split, marginLeft, marginTop);
    }

    private _splitLines(text: string, maxLineWidth: number, fontSize: number): any {

        const split = this._doc.setFont('helvetica', 'neue').setFontSize(fontSize).splitTextToSize(text, maxLineWidth);
        this._doc.setFont('GothamLight', 'normal');
        this._doc.setFontSize(9);
        return split;
    }

    // draw Primary Image
    private _drawBoxImage(images: HTMLImageElement[]): void {
        const img = images[0];
        const topIndex = this._drawHeader();
        const pageWidth = this._doc.internal.pageSize.getWidth();

        const imageTop = 30 - this._docConfig.lineWidth;
        const columnWidth = pageWidth - 100;
        const imageWidth = pageWidth / 2 - this._docConfig.padding * 2 + 5;

        try {
            this._doc.addImage(
                img,
                columnWidth,
                imageTop,
                imageWidth,
                imageWidth
            );
        } catch (e) {
            console.log('The box image is corrupted in some way that prevents it from being loaded  by jsPDF.');
        }
        this._marginsPrimaryImage = { columnWidth, imageTop, imageWidth , topIndex};
        this._toDataURL([this._data.productDetail.imageUrl], this._loadImages.bind(this), this._drawPrimaryImg.bind(this));

    }

    private _drawPrimaryImg(images: HTMLImageElement[]) {

        const img = images[0];
        // img.onload = (() => {
        try {
            this._doc.addImage(
                img,
                this._marginsPrimaryImage.columnWidth + 4.2,
                this._marginsPrimaryImage.imageTop + 4.2,
                this._marginsPrimaryImage.imageWidth - 8.4,
                this._marginsPrimaryImage.imageWidth - 8.4
            );
        } catch (e) {
            console.log('The primary image is corrupted in some way that prevents it from being loaded by jsPDF.');
        }
        this._drawDetails(this._marginsPrimaryImage.topIndex, { left: this._marginsPrimaryImage.columnWidth, top: this._marginsPrimaryImage.imageTop + this._marginsPrimaryImage.imageWidth });
    }

    // draw details
    private _drawDetails(topIndex: number, imageMargin: any) {
        const details = this._data.productDetail.details.sort((a: Detail, b: Detail) => {
            if (a.content.length > b.content.length) {
                return 1;
            }
            if (a.content.length < b.content.length) {
                return -1;
            }
            if (a.content.length === b.content.length) {
                return 0;
            }
        });
        // fix
        const marginTop = topIndex + 20;

        this._drawDetailsText(details, marginTop, imageMargin.top);

    }

    private _drawDetailsText(details: any[], marginTop: number, imageMargin: number) {

        if (details.length === 0 || details.every((detail: Detail) => detail.content === undefined )) {
            if (marginTop < imageMargin && this._doc.internal.getCurrentPageInfo().pageNumber === 1) {
                marginTop = imageMargin;
            }
            this._drawCheckedImage(marginTop);
        } else {
            const detail = details.pop();
            if (detail.content !== undefined) {
                const specialElementHandlers = {
                    // element with id of "bypass" - jQuery style selector
                    '#bypassme'(element: any, renderer: any) {
                        // true = "handled elsewhere, bypass text extraction"
                        return true;
                    },
                    '.hide'(element: any, renderer: any) {
                        // true = "handled elsewhere, bypass text extraction"
                        return true;
                    }
                };
                if (marginTop + 25 < this._doc.internal.pageSize.getHeight() - 36) {
                    marginTop += 10;
                } else {
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

                const div = document.createElement('div');
                const css = '<style> * { font-family: sans-serif !important; font-size: 11pt !important;}; </style>';
                div.innerHTML = css + detail.content.replace('–', '-');

                // draw title
                this._drawText(detail.name, margins.width, 20, margins.left, marginTop, [9, 4, 3], ['GothamMedium', 'normal']);

                // draw detail
                this._doc.fromHTML(
                    div,
                    margins.left,
                    marginTop // y coord
                    , {
                        width: margins.width, // max width of content on PDF
                        elementHandlers: specialElementHandlers
                    },
                    (dispose: any) => {
                        const y = (dispose.y < imageMargin && this._doc.internal.getCurrentPageInfo().pageNumber === 1) ?
                            imageMargin : dispose.y;
                        this._drawDetailsText(details, y, imageMargin);
                    },
                    margins
                );
            } else {
                this._drawDetailsText(details, marginTop, imageMargin);
            }
        }
    }

    private _drawLayout(): void {
        const img = new Image();
        img.onload = (() => {
            this._drawLayoutIter(img);
        });
        img.onerror = (() => {
            this._drawLayoutIter(null);
        });
        img.src = logoImg;
        img.crossOrigin = 'anonymous';
    }
    private _drawLayoutIter(img: HTMLImageElement): void {
        for (let i = 1; i < this._doc.internal.pages.length; i++) {
            this._doc.setPage(i);
            this._drawLayoutData(i, img);
        }
        this.save();
    }

    // draw Page Header and Footer
    private _drawLayoutData(index: number, logo: HTMLImageElement) {

        const pageWidth = this._doc.internal.pageSize.getWidth();
        const pageHeight = this._doc.internal.pageSize.getHeight();

        // draw header
        this._doc.setFont('GothamMedium', 'normal');
        this._doc.setFontSize(12);
        this._doc.setFillColor(240, 240, 240);
        this._doc.setTextColor(0, 0, 0);
        this._doc.rect(
            this._docConfig.padding + this._docConfig.lineWidth / 2,
            this._docConfig.padding + this._docConfig.lineWidth / 2,
            pageWidth - (2 * this._docConfig.padding + this._docConfig.lineWidth),
            10,
            'F'
        );
        const project = this._data.settings.captions.project;
        this._doc.text(project, 12.9, this._docConfig.padding + this._docConfig.lineWidth * 3 + 0.5);

        const verticalOffset = this._verticalOffset(project, 12, 12.9);

        this._doc.setFont('GothamLight', 'normal');
        this._doc.text(' – ' + this._data.productDetail.name, verticalOffset, this._docConfig.padding + this._docConfig.lineWidth * 3 + 0.5);

        this._doc.setFontStyle('bold')
                .setFont('GothamMedium', 'normal')
                .text(this._data.settings.translations.layout.page + ': '
                 + index + '/' + (this._doc.internal.pages.length - 1), 177,  this._docConfig.padding + this._docConfig.lineWidth * 3 + 0.5);

        // draw footer
        this._doc.setFont('GothamMedium', 'normal');
        this._doc.setFontSize(9);
        this._doc.setFillColor(240, 240, 240);
        this._doc.rect(
            this._docConfig.padding + this._docConfig.lineWidth / 2,
            pageHeight - (this._docConfig.padding + this._docConfig.lineWidth / 2 + 10),
            pageWidth - (2 * this._docConfig.padding + this._docConfig.lineWidth),
            10,
            'F'
        );
        this._doc.text('Copyright © 2018 Plan.One', 12.9, 283.2);
        if (logo) {
            this._doc.addImage(logo, 'png', 175.5, 280, 21.6, 4.1);
        }
    }

    private _verticalOffset(text: string, size: number, left: number): number {

        return left + this._doc.getStringUnitWidth(text) * size / 2.8;
    }

    // load check image
    private _drawCheckedImage(marginTop: number): void {
        const img = new Image();
        img.onload = (() => {
            this._drawUncheckedImage(marginTop, img);
        });
        img.onerror = (() => {
            this._drawUncheckedImage(marginTop, null);
        });
        img.src = checkImg;
        img.crossOrigin = 'anonymous';
    }
    // load uncheck image
    private _drawUncheckedImage(marginTop: number, check: HTMLImageElement): void {
        const img = new Image();
        img.onload = (() => {
            this._drawBody(marginTop, check, img);
        });
        img.onerror = (() => {
            this._drawBody(marginTop, check, null);
        });
        img.src = unckeckImg;
        img.crossOrigin = 'anonymous';
    }
    // draw table information
    private _drawBody( marginTop: number, checkImage: HTMLImageElement, uncheckImage: HTMLImageElement) {

        let i = 0;
        const pageWidth = this._doc.internal.pageSize.getWidth();
        const pageHeight = this._doc.internal.pageSize.getHeight();

        const product = this._data.productDetail;
        // marginTop += 8;
        if (marginTop + 45 < pageHeight ) {
            marginTop += 10;
        } else {
            this._doc.addPage();
            marginTop = 40;
        }
        this._drawTableHeader(marginTop, 'Technische Informationen');
        marginTop += 5;

        const columns: any [] = [{ dataKey: 'col1', title: '' }];
        const rows: any[] = [];

        const styles = {
            fillColor: [255, 255, 255],
            lineWidth: 0,
            fontStyle: 'normal',
            cellPadding: [2.8, this._docConfig.lineWidth + 0.5, 2.8, this._docConfig.lineWidth + 0.5],
            fontSize: 9,
            textColor: 0,
            overflow: 'linebreak',
            valign: 'top'
        };

        let borders: any[] = [];

        let checkImages: any[] = [];
        const config: any = {
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
            drawCell: (cell: any, opts: any) => {

                if (opts.column.dataKey === 'col1') {
                    this._doc.setFont('GothamMedium', 'normal');

                    // If have filters, change font, draw text
                    // and return false to turn off draw for this cell
                    if (cell.text.length > 1 && cell.raw.lastIndexOf('(') !== -1) {

                        // // Align text
                        // const FONT_ROW_RATIO = 1.15;
                        // const lineCount = cell.text.length;
                        const fontSize = opts.doc.internal.getFontSize() / opts.doc.internal.scaleFactor;
                        // let y = cell.textPos.y;

                        // // Align the top
                        // y += fontSize * (2 - FONT_ROW_RATIO);

                        // // Align middle
                        // y -= (lineCount / 2) * fontSize * FONT_ROW_RATIO;
                        const y =  cell.textPos.y + fontSize;
                        cell.text.forEach((element: string, index: number) => {
                            if (element.startsWith('(')) {
                                this._doc.setFont('GothamLight', 'normal');
                            }
                            this._doc.text(element, cell.textPos.x, y + index * 4);
                        });
                        return false;
                    }
                } else {
                    this._doc.setFont('GothamLight', 'normal');
                }

                if (opts.column.index !== 0) {

                    if (product.properties[opts.row.index].ckeck !== undefined) {

                        checkImages.push({
                            left: cell.x + 3,
                            top: cell.textPos.y,
                            width: 3,
                            height: 3,
                            check: product.properties[opts.row.index].ckeck
                        });
                    }
                }
            },
            drawHeaderCell: (cell: any, opts: any) => {

                this._doc.setFont('GothamMedium', 'normal');
            },
            drawHeaderRow: (row: any, opts: any) => {

                borders.push({
                    left: this._docConfig.padding + this._docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - 60,
                    height: 0.1
                });
            },
            drawRow: (row: any, opts: any) => {

                borders.push({
                    left: this._docConfig.padding + this._docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - 60,
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
                if (checkImage && uncheckImage) {
                    checkImages.forEach((img: any) => {

                        (img.check) ?
                            this._doc.addImage(checkImage, img.left, img.top, img.width, img.height)
                            : this._doc.addImage(uncheckImage, img.left, img.top, img.width, img.height);
                    });
                }
                checkImages = [];

                data.settings.margin.top = 40;

                if ( ++i !== 1 ) {
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
            product.properties.forEach((property: Property) => {
                const propName = this._replaceCharacter(property.name);
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

                                if (index === 0) {
                                    filterText += v;
                                } else {
                                    filterText += ', ' + v;
                                }
                            });
                        } else if (filterValue.upper !== undefined && filterValue.lower !== undefined) {
                            filterText = filterValue.lower + ' - ' + filterValue.upper;
                        } else {
                            filterText = filterValue.toString();
                        }

                        if (typeof property.unit !== 'undefined') {
                            if (direction === 'afterValue') {
                                filterText = filterText + ' ' + property.unit;
                            } else {
                                filterText = property.unit + ' ' + filterText;
                            }
                        }
                        rows.push({ col1: propName + `\n(${filterText})` });
                    } else {
                        rows.push({ col1: propName });
                    }
                } else {
                    rows.push({ col1: propName });
                }
            });
        }
        product.properties.forEach((property: Property, index: number) => {

            if (property.value !== undefined) {
                const val = this._data.translate(property.value);
                rows[index][product.name] = this._replaceCharacter(val);
            }
        });

        this._doc.autoTable(columns, rows, config);

        // load others sections
        this._drawDownloads();
        // call to load gallery
        const imagesGallery = this._data.productDetail.imageGallery;
        if (imagesGallery && imagesGallery.length > 0) {
            this._toDataURL(imagesGallery, this._loadImages.bind(this), this._drawGallery.bind(this));
        } else {
           this._drawLayout();
        }
    }

    private _drawTableHeader(marginTop: number, text: string) {
        this._drawText(text, this._doc.internal.pageSize.getWidth(), 20, 10, marginTop, [0, 0, 0], ['GothamMedium', 'normal']);
    }

    private _drawDownloads() {
        let i = 0;
        const pageWidth = this._doc.internal.pageSize.getWidth();
        const pageHeight = this._doc.internal.pageSize.getHeight();

        const downloads = this._data.downloads;
        let marginTop = this._doc.autoTable.previous.finalY + 15;

        if (downloads && downloads.length > 0) {
        this._doc.addPage();
        marginTop = 40;
        this._drawTableHeader(marginTop, 'Downloads');
        marginTop += 5;

        const columns: any [] = [{ dataKey: 'col1', title: '' }];
        const rows: any[] = [];

        const styles = {
            fillColor: [255, 255, 255],
            lineWidth: 0,
            fontStyle: 'normal',
            // top...left
            cellPadding: [2.8, this._docConfig.lineWidth + 0.5, 2.8, this._docConfig.lineWidth + 0.5],
            fontSize: 9,
            textColor: 0,
            overflow: 'linebreak',
            valign: 'middle'
        };

        let borders: any[] = [];
        let links: any[] = [];
        let elemsPage: number[] = [];
        const config: any = {
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
            drawCell: (cell: any, opts: any) => {

                this._doc.setFont(opts.column.dataKey === 'col1' ?
                'GothamMedium' : 'GothamLight', 'normal');
            },
            drawRow: (row: any, opts: any) => {
                if (!row.raw.first && !row.raw.last) {
                    row.height = 5;
                }
                if (!row.raw.single) {
                    if (row.raw.last) {
                        row.cells['col1'].styles.cellPadding[0] = 0;
                        row.cells['col1'].styles.cellPadding[2] = 2.5;
                        row.cells['col1'].styles.valign = 'top';
                        row.cells['col2'].styles.cellPadding[0] = 0;
                        row.cells['col2'].styles.cellPadding[2] = 2.5;
                        row.cells['col2'].styles.valign = 'top';
                        row.height = 7;
                    }
                    if (row.raw.first) {
                        row.cells['col1'].styles.cellPadding[2] = 0;
                        row.cells['col1'].styles.valign = 'bottom';
                        row.cells['col2'].styles.cellPadding[2] = 0;
                        row.cells['col2'].styles.valign = 'bottom';
                        row.height = 7;
                    }
                } else {
                    const split = this._splitLines(downloads[row.raw.index].singleValue.name, this._docConfig.columnWidth + this._docConfig.padding * 2, 11);
                    row.height += split.length * 3.1;
                }

                if (row.raw.last) {

                    borders.push({
                        left: this._docConfig.padding + this._docConfig.lineWidth / 2,
                        top: row.y + row.height - 0.1,
                        width: pageWidth - this._docConfig.columnWidth * 2 + 2 * this._docConfig.padding,
                        height: 0.1
                    });
                }
                if (row.raw.index !== undefined) {
                    elemsPage.push(row.raw.index);
                }

                links.push(row.cells['col2'].textPos);
            },
            addPageContent: (data: any) => {

                this._doc.setFillColor(0, 0, 0);
                borders.forEach((border: any, index: number) => {

                    if (index < borders.length - 1) {
                        this._doc.rect(border.left, border.top, border.width, border.height, 'F');
                    }
                });
                borders = [];

                this._doc.setTextColor(0, 172, 165);
                let iter: number = 0;

                elemsPage.forEach((it: number) => {
                    const elem = downloads[it];
                    if (elem.singleValue) {
                        const elemSplit = this._splitLines(elem.singleValue.name, this._docConfig.columnWidth + this._docConfig.padding * 2, 11);

                        let val = '';
                        elemSplit.forEach((element: string, index: number) => {
                            val += (index !== 0) ? '\n' + element : element;
                        });
                        this._doc.textWithLink(val, links[iter].x, links[iter].y, {
                            url: elem.singleValue.link
                          });
                        iter++;
                    } else {
                        this._doc.setFontSize(9);
                        if (links.length > 0) {
                        elem.listValues.forEach((value: DownloadValue, idx: number) => {
                            if (links[iter] !== undefined) {
                            let y = links[iter].y;
                            if (idx === 0) {
                                y -= 1.2;
                            } else if (idx === elem.listValues.length - 1) {
                                y += 2.75;
                            } else {
                                y += 0.8;
                            }
                            this._doc.textWithLink(value.name, links[iter].x + 4 , y , {
                                url: value.link
                              });
                            }
                            iter++;
                        });
                        }
                    }
                });

                links = [];
                elemsPage = [];

                data.settings.margin.top = 40;

                if ( ++i !== 1 ) {
                    this._drawTableHeader(36, 'Downloads');
                }

            }
        };

        // fill values

        columns.push({ dataKey: 'col2', title: 'col2' });

        let lineW = this._docConfig.lineWidth + 0.5;
        if (this._data.settings.showHighlights) {
            lineW = lineW + 4;
        }

        config.columnStyles['col2'] = {
            columnWidth: this._docConfig.columnWidth + this._docConfig.padding * 3,
            cellPadding: [2.8, lineW, 2.8, lineW]
        };

        let spanLines = 0;
        downloads.forEach((elem: DownloadElement, index: number) => {
            rows.push({ col1: elem.label, first: true, index});
            if (elem.singleValue) {
                rows[spanLines]['col2'] = '';
                rows[spanLines]['last'] = true;
                rows[spanLines]['single'] = true;
                spanLines++;
            } else {
                elem.listValues.forEach((value: DownloadValue, idx: number) => {
                    if (idx !== 0) { rows.push({ col1: '' }); }
                    rows[spanLines]['col2'] = '•';
                    if (idx === elem.listValues.length - 1) {
                        rows[spanLines]['last'] = true;
                    }
                    spanLines++;
                });
            }
        });

        this._doc.autoTable(columns, rows, config);
        }
    }

    private _drawGallery(images: HTMLImageElement[]): void {
        if (images.length > 0) {
            this._doc.addPage();

            const pageHeight = this._doc.internal.pageSize.getHeight();
            const imageWidth = pageHeight / 3 - (this._docConfig.padding * 2 + 2);

            const initialTop = 26;
            const column1 = 10;
            const column2 = imageWidth + this._docConfig.padding * 1.7;

            let imageLeft = column1;
            let imageTop = initialTop;

            images.forEach((imageUrl: HTMLImageElement, i: number) => {

                imageLeft = (i % 2 !== 0) ? column2 : column1;

                if ((imageTop + imageWidth) >= (pageHeight - 20)) {
                    imageTop = initialTop;
                    this._doc.addPage();
                }
                try {
                    this._doc.addImage(
                        imageUrl,
                        imageLeft,
                        imageTop,
                        imageWidth,
                        imageWidth
                    );
                } catch (e) {
                    console.log('Error loading image: ' + imageUrl);
                }
                if (i % 2 !== 0) {
                    imageTop += imageWidth + 4;
                }
            });
        }
        this._drawLayout();

    }
}
