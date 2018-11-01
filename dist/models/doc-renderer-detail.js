var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as jsPDF from 'jspdf';
import { IDocRenderer } from './doc-renderer.interface';
import { JsonParser } from './json-parser';
import { boxShadowImg } from './imagesBase64/box-shadow-img';
import { logoImg } from './imagesBase64/logo-img';
import { isArray } from 'util';
import { checkImg } from './imagesBase64/check-img';
import { unckeckImg } from './imagesBase64/uncheck-img';
//import * as htmlToText from 'html-to-text';
var IMAGES_TOP = 35;
var IMAGES_PADING_TOP = 6.2;
var DocRendererDetail = /** @class */ (function (_super) {
    __extends(DocRendererDetail, _super);
    function DocRendererDetail() {
        var _this = _super.call(this) || this;
        _this.htmlToText = require('html-to-text');
        _this._doc = new jsPDF();
        _this._doc.addFont('Gotham-Medium.ttf', 'GothamMedium', 'normal');
        _this._doc.addFont('Gotham-Light.ttf', 'GothamLight', 'normal');
        return _this;
    }
    DocRendererDetail.prototype.draw = function (jsonData, docConfig) {
        this._data = JsonParser.parseDataProduct(jsonData);
        this._docConfig = docConfig;
        this._loadImages(0, [boxShadowImg], [], this._drawBoxImage.bind(this));
    };
    DocRendererDetail.prototype.save = function () {
        this._doc.save(this._data.settings.fileName);
    };
    // draw title  and subtitle
    // draw title  and subtitle
    DocRendererDetail.prototype._drawHeader = 
    // draw title  and subtitle
    function () {
        var pageWidth = this._doc.internal.pageSize.getWidth();
        var maxLineWidth = pageWidth / 2 - this._docConfig.padding * 2;
        // title
        var topIndex = 36;
        this._drawText(this._data.productDetail.name, maxLineWidth, 20, 10, topIndex, [9, 4, 3], ['GothamMedium', 'normal']);
        // subtitles
        topIndex += 9;
        this._drawText(this._data.productDetail.supplier, maxLineWidth, 20, 10, topIndex, [80, 87, 98], ['GothamLight', 'normal']);
        return topIndex;
    };
    DocRendererDetail.prototype._drawText = function (text, width, fontSize, marginLeft, marginTop, color, font) {
        var split = this._splitLines(text, width, fontSize);
        this._doc.setFont(font[0], font[1]);
        this._doc.setFontSize(fontSize);
        this._doc.setTextColor(color[0], color[1], color[2]);
        this._doc.text(split, marginLeft, marginTop);
    };
    DocRendererDetail.prototype._splitLines = function (text, maxLineWidth, fontSize) {
        var split = this._doc.setFont('helvetica', 'neue').setFontSize(fontSize)
            .splitTextToSize(text, maxLineWidth);
        this._doc.setFont('GothamLight', 'normal');
        this._doc.setFontSize(9);
        return split;
    };
    // draw Primary Image
    // draw Primary Image
    DocRendererDetail.prototype._drawBoxImage = 
    // draw Primary Image
    function (images) {
        var img = images[0];
        var topIndex = this._drawHeader();
        var pageWidth = this._doc.internal.pageSize.getWidth();
        var imageTop = 30 - this._docConfig.lineWidth;
        var columnWidth = pageWidth - 100;
        var imageWidth = pageWidth / 2 - this._docConfig.padding * 2 + 5;
        try {
            this._doc.addImage(img, columnWidth, imageTop, imageWidth, imageWidth);
        }
        catch (e) {
            console.log('The box image is corrupted in some way that prevents it from being loaded  by jsPDF.');
        }
        this._marginsPrimaryImage = { columnWidth: columnWidth, imageTop: imageTop, imageWidth: imageWidth, topIndex: topIndex };
        this._toDataURL([this._data.productDetail.imageUrl], this._loadImages.bind(this), this._drawPrimaryImg.bind(this));
    };
    DocRendererDetail.prototype._drawPrimaryImg = function (images) {
        var img = images[0];
        // img.onload = (() => {
        try {
            this._doc.addImage(img, this._marginsPrimaryImage.columnWidth + 4.2, this._marginsPrimaryImage.imageTop + 4.2, this._marginsPrimaryImage.imageWidth - 8.4, this._marginsPrimaryImage.imageWidth - 8.4);
        }
        catch (e) {
            console.log('The primary image is corrupted in some way that prevents it from being loaded by jsPDF.');
        }
        this._drawDetails(this._marginsPrimaryImage.topIndex, { left: this._marginsPrimaryImage.columnWidth, top: this._marginsPrimaryImage.imageTop + this._marginsPrimaryImage.imageWidth });
    };
    // draw details
    // draw details
    DocRendererDetail.prototype._drawDetails = 
    // draw details
    function (topIndex, imageMargin) {
        var details = this._data.productDetail.details;
        // fix
        var marginTop = topIndex + 20;
        this._drawDetailsText(details, marginTop, imageMargin.top);
    };
    DocRendererDetail.prototype._drawDetailsText = function (details, marginTop, imageMargin) {
        var _this = this;
        if (details.length === 0) {
            if (marginTop < imageMargin && this._doc.internal.getCurrentPageInfo().pageNumber === 1) {
                marginTop = imageMargin;
            }
        }
        else {
            var elems = details.sort(function (a, b) {
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
            elems.forEach(function (detail, index) {
                var text = _this.htmlToText.fromString(detail.content, {
                    wordwrap: false,
                    ignoreHref: true,
                    ignoreImage: true,
                    preserveNewlines: false,
                    uppercaseHeadings: false,
                    format: {
                        // text, lineBreak, paragraph, anchor, heading, table, orderedList,
                        // unorderedList, listItem, horizontalLine
                        heading: (function (elem, fn, options) {
                            var h = fn(elem.children, options);
                            return h;
                        }),
                        unorderedList: (function (elem, fn, options) {
                            var resultul = '';
                            elem.children.filter(function (e) { return e.name === 'li'; }).forEach(function (li) {
                                var tmp1 = '';
                                li.children.forEach(function (item) {
                                    tmp1 += item.data + '\n';
                                });
                                resultul += ' • ' + tmp1 + '\n';
                            });
                            return resultul;
                        }),
                        orderedList: (function (elem, fn, options) {
                            var resultol = '';
                            elem.children.filter(function (e) { return e.name === 'li'; }).forEach(function (li, ind) {
                                var tmp2 = '';
                                li.children.forEach(function (item) {
                                    tmp2 += item.data + '\n';
                                });
                                resultol += (ind + 1) + '. ' + tmp2 + '\n';
                            });
                            return resultol;
                        })
                    }
                });
                var widthColumn = _this.checkWidthFirstPage(marginTop, imageMargin);
                if (index !== 0 && _this._doc.internal.getCurrentPageInfo().pageNumber === 1 && marginTop < imageMargin) {
                    marginTop = imageMargin;
                }
                // draw title
                if (marginTop + 10 > _this._doc.internal.pageSize.getHeight() - 36) {
                    _this._doc.addPage();
                    marginTop = 40;
                }
                _this._drawText(detail.name, widthColumn, 20, 10, marginTop, [9, 4, 3], ['GothamMedium', 'normal']);
                marginTop += 5;
                widthColumn = _this.checkWidthFirstPage(marginTop, imageMargin);
                var splitLines = _this._splitLines(text, widthColumn, 9);
                splitLines.forEach(function (elemtDetail) {
                    if (marginTop > _this._doc.internal.pageSize.getHeight() - 36) {
                        _this._doc.addPage();
                        marginTop = 30;
                    }
                    else {
                        marginTop += 4;
                    }
                    _this._doc.setFont('GothamLight', 'normal');
                    _this._doc.setFontSize(9);
                    _this._doc.setTextColor(0, 0, 0);
                    _this._doc.text(elemtDetail, 10, marginTop);
                });
                marginTop += 15;
            });
        }
        this._drawCheckedImage(marginTop);
    };
    DocRendererDetail.prototype.checkWidthFirstPage = function (marginTop, imageMargin) {
        return (marginTop < imageMargin && this._doc.internal.getCurrentPageInfo().pageNumber === 1) ?
            this._doc.internal.pageSize.getWidth() / 2 - this._docConfig.padding * 3 : this._doc.internal.pageSize.getWidth() - 85;
    };
    DocRendererDetail.prototype._drawLayout = function () {
        var _this = this;
        var img = new Image();
        img.onload = (function () {
            _this._drawLayoutIter(img);
        });
        img.onerror = (function () {
            _this._drawLayoutIter(null);
        });
        img.src = logoImg;
        img.crossOrigin = 'anonymous';
    };
    DocRendererDetail.prototype._drawLayoutIter = function (img) {
        for (var i = 1; i < this._doc.internal.pages.length; i++) {
            this._doc.setPage(i);
            this._drawLayoutData(i, img);
        }
        this.save();
    };
    // draw Page Header and Footer
    // draw Page Header and Footer
    DocRendererDetail.prototype._drawLayoutData = 
    // draw Page Header and Footer
    function (index, logo) {
        var pageWidth = this._doc.internal.pageSize.getWidth();
        var pageHeight = this._doc.internal.pageSize.getHeight();
        // draw header
        this._doc.setFont('GothamMedium', 'normal');
        this._doc.setFontSize(12);
        this._doc.setFillColor(240, 240, 240);
        this._doc.setTextColor(0, 0, 0);
        this._doc.rect(this._docConfig.padding + this._docConfig.lineWidth / 2, this._docConfig.padding + this._docConfig.lineWidth / 2, pageWidth - (2 * this._docConfig.padding + this._docConfig.lineWidth), 10, 'F');
        var project = this._data.settings.captions.project;
        this._doc.text(project, 12.9, this._docConfig.padding + this._docConfig.lineWidth * 3 + 0.5);
        var verticalOffset = this._verticalOffset(project, 12, 12.9);
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
        if (logo) {
            this._doc.addImage(logo, 'png', 175.5, 280, 21.6, 4.1);
        }
    };
    DocRendererDetail.prototype._verticalOffset = function (text, size, left) {
        return left + this._doc.getStringUnitWidth(text) * size / 2.8;
    };
    // load check image
    // load check image
    DocRendererDetail.prototype._drawCheckedImage = 
    // load check image
    function (marginTop) {
        var _this = this;
        var img = new Image();
        img.onload = (function () {
            _this._drawUncheckedImage(marginTop, img);
        });
        img.onerror = (function () {
            _this._drawUncheckedImage(marginTop, null);
        });
        img.src = checkImg;
        img.crossOrigin = 'anonymous';
    };
    // load uncheck image
    // load uncheck image
    DocRendererDetail.prototype._drawUncheckedImage = 
    // load uncheck image
    function (marginTop, check) {
        var _this = this;
        var img = new Image();
        img.onload = (function () {
            _this._drawBody(marginTop, check, img);
        });
        img.onerror = (function () {
            _this._drawBody(marginTop, check, null);
        });
        img.src = unckeckImg;
        img.crossOrigin = 'anonymous';
    };
    // draw table information
    // draw table information
    DocRendererDetail.prototype._drawBody = 
    // draw table information
    function (marginTop, checkImage, uncheckImage) {
        var _this = this;
        var i = 0;
        var pageWidth = this._doc.internal.pageSize.getWidth();
        var pageHeight = this._doc.internal.pageSize.getHeight();
        var product = this._data.productDetail;
        // marginTop += 8;
        if (marginTop + 45 < pageHeight) {
            marginTop += 10;
        }
        else {
            this._doc.addPage();
            marginTop = 40;
        }
        this._drawTableHeader(marginTop, 'Technische Informationen');
        marginTop += 5;
        var columns = [{ dataKey: 'col1', title: '' }];
        var rows = [];
        var styles = {
            fillColor: [255, 255, 255],
            lineWidth: 0,
            fontStyle: 'normal',
            cellPadding: [2.8, this._docConfig.lineWidth + 0.5, 2.8, this._docConfig.lineWidth + 0.5],
            fontSize: 9,
            textColor: 0,
            overflow: 'linebreak',
            valign: 'middle'
        };
        var borders = [];
        var checkImages = [];
        var config = {
            styles: styles,
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
            drawCell: function (cell, opts) {
                if (opts.column.dataKey === 'col1') {
                    _this._doc.setFont('GothamMedium', 'normal');
                    // If have filters, change font, draw text
                    // and return false to turn off draw for this cell
                    if (cell.text.length > 1 && cell.raw.lastIndexOf('(') !== -1) {
                        cell.text.forEach(function (element, index) {
                            if (element.startsWith('(')) {
                                _this._doc.setFont('GothamLight', 'normal');
                            }
                            _this._doc.text(element, cell.textPos.x, cell.textPos.y + index * 4);
                        });
                        return false;
                    }
                }
                else {
                    _this._doc.setFont('GothamLight', 'normal');
                }
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
            },
            drawHeaderCell: function (cell, opts) {
                _this._doc.setFont('GothamMedium', 'normal');
            },
            drawHeaderRow: function (row, opts) {
                borders.push({
                    left: _this._docConfig.padding + _this._docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - 60,
                    height: 0.1
                });
            },
            drawRow: function (row, opts) {
                borders.push({
                    left: _this._docConfig.padding + _this._docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - 60,
                    height: 0.1
                });
            },
            addPageContent: function (data) {
                _this._doc.setFillColor(0, 0, 0);
                borders.forEach(function (border, index) {
                    if (index < borders.length - 1) {
                        _this._doc.rect(border.left, border.top, border.width, border.height, 'F');
                    }
                });
                borders = [];
                if (checkImage && uncheckImage) {
                    checkImages.forEach(function (img) {
                        (img.check) ?
                            _this._doc.addImage(checkImage, img.left, img.top, img.width, img.height)
                            : _this._doc.addImage(uncheckImage, img.left, img.top, img.width, img.height);
                    });
                }
                checkImages = [];
                data.settings.margin.top = 40;
                if (++i !== 1) {
                    _this._drawTableHeader(36, 'Technische Informationen');
                }
            }
        };
        // fill values
        columns.push({ dataKey: product.name, title: product.name });
        var lineW = this._docConfig.lineWidth + 0.5;
        if (this._data.settings.showHighlights) {
            lineW = lineW + 4;
        }
        config.columnStyles[product.name] = {
            columnWidth: this._docConfig.columnWidth + this._docConfig.padding * 3,
            cellPadding: [2.8, lineW, 2.8, lineW]
        };
        if (rows.length === 0) {
            product.properties.forEach(function (property) {
                var propName = _this._replaceCharacter(property.name);
                if (_this._data.settings.applyFilters) {
                    var direction = property.unit !== undefined &&
                        _this._data.settings.unitsBeforeValue.find(function (unit) { return unit === property.unit; }) ?
                        'beforeValue' : 'afterValue';
                    var filterMap = new Map(_this._data.filters);
                    var filterValue = filterMap.get(property.ifdguid);
                    var filterText_1 = '';
                    if (filterValue) {
                        if (isArray(filterValue)) {
                            // List Values
                            var listValues = filterValue;
                            listValues.forEach(function (v, index) {
                                if (index === 0) {
                                    filterText_1 += v;
                                }
                                else {
                                    filterText_1 += ', ' + v;
                                }
                            });
                        }
                        else if (filterValue.upper !== undefined && filterValue.lower !== undefined) {
                            filterText_1 = filterValue.lower + ' - ' + filterValue.upper;
                        }
                        else {
                            filterText_1 = filterValue.toString();
                        }
                        if (typeof property.unit !== 'undefined') {
                            if (direction === 'afterValue') {
                                filterText_1 = filterText_1 + ' ' + property.unit;
                            }
                            else {
                                filterText_1 = property.unit + ' ' + filterText_1;
                            }
                        }
                        filterText_1 = _this._replaceCharacter(filterText_1);
                        rows.push({ col1: propName + ("\n(" + filterText_1 + ")") });
                    }
                    else {
                        rows.push({ col1: propName });
                    }
                }
                else {
                    rows.push({ col1: propName });
                }
            });
        }
        product.properties.forEach(function (property, index) {
            if (property.value !== undefined) {
                var val = _this._data.translate(property.value);
                rows[index][product.name] = _this._replaceCharacter(val);
            }
        });
        this._doc.autoTable(columns, rows, config);
        // load others sections
        this._drawDownloads();
        // call to load gallery
        var imagesGallery = this._data.productDetail.imageGallery;
        if (imagesGallery && imagesGallery.length > 0) {
            this._toDataURL(imagesGallery, this._loadImages.bind(this), this._drawGallery.bind(this));
        }
        else {
            this._drawLayout();
        }
    };
    DocRendererDetail.prototype._drawTableHeader = function (marginTop, text) {
        this._drawText(text, this._doc.internal.pageSize.getWidth(), 20, 10, marginTop, [0, 0, 0], ['GothamMedium', 'normal']);
    };
    DocRendererDetail.prototype._drawDownloads = function () {
        var _this = this;
        var i = 0;
        var pageWidth = this._doc.internal.pageSize.getWidth();
        var pageHeight = this._doc.internal.pageSize.getHeight();
        var downloads = this._data.downloads;
        var marginTop = this._doc.autoTable.previous.finalY + 15;
        // if (marginTop + 45 < pageHeight ) {
        //     marginTop += 10;
        // } else {
        this._doc.addPage();
        marginTop = 40;
        // }
        this._drawTableHeader(marginTop, 'Downloads');
        marginTop += 5;
        var columns = [{ dataKey: 'col1', title: '' }];
        var rows = [];
        var styles = {
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
        var borders = [];
        var links = [];
        var elemsPage = [];
        var config = {
            styles: styles,
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
            drawCell: function (cell, opts) {
                _this._doc.setFont(opts.column.dataKey === 'col1' ?
                    'GothamMedium' : 'GothamLight', 'normal');
            },
            drawRow: function (row, opts) {
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
                }
                else {
                    var split = _this._splitLines(downloads[row.raw.index].singleValue.name, _this._docConfig.columnWidth + _this._docConfig.padding * 2, 11);
                    row.height += split.length * 3.1;
                }
                if (row.raw.last) {
                    borders.push({
                        left: _this._docConfig.padding + _this._docConfig.lineWidth / 2,
                        top: row.y + row.height - 0.1,
                        width: pageWidth - _this._docConfig.columnWidth * 2 + 2 * _this._docConfig.padding,
                        height: 0.1
                    });
                }
                if (row.raw.index !== undefined) {
                    elemsPage.push(row.raw.index);
                }
                links.push(row.cells['col2'].textPos);
            },
            addPageContent: function (data) {
                _this._doc.setFillColor(0, 0, 0);
                borders.forEach(function (border, index) {
                    if (index < borders.length - 1) {
                        _this._doc.rect(border.left, border.top, border.width, border.height, 'F');
                    }
                });
                borders = [];
                _this._doc.setTextColor(0, 172, 165);
                var iter = 0;
                elemsPage.forEach(function (it) {
                    var elem = downloads[it];
                    if (elem.singleValue) {
                        var elemSplit = _this._splitLines(elem.singleValue.name, _this._docConfig.columnWidth + _this._docConfig.padding * 2, 11);
                        var val_1 = '';
                        elemSplit.forEach(function (element, index) {
                            val_1 += (index !== 0) ? '\n' + element : element;
                        });
                        _this._doc.textWithLink(val_1, links[iter].x, links[iter].y, {
                            url: elem.singleValue.link
                        });
                        iter++;
                    }
                    else {
                        _this._doc.setFontSize(9);
                        if (links.length > 0) {
                            elem.listValues.forEach(function (value, idx) {
                                if (links[iter] !== undefined) {
                                    var y = links[iter].y;
                                    if (idx === 0) {
                                        y -= 1.2;
                                    }
                                    else if (idx === elem.listValues.length - 1) {
                                        y += 2.75;
                                    }
                                    else {
                                        y += 0.8;
                                    }
                                    _this._doc.textWithLink(value.name, links[iter].x + 4, y, {
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
                if (++i !== 1) {
                    _this._drawTableHeader(36, 'Downloads');
                }
            }
        };
        // fill values
        columns.push({ dataKey: 'col2', title: 'col2' });
        var lineW = this._docConfig.lineWidth + 0.5;
        if (this._data.settings.showHighlights) {
            lineW = lineW + 4;
        }
        config.columnStyles['col2'] = {
            columnWidth: this._docConfig.columnWidth + this._docConfig.padding * 3,
            cellPadding: [2.8, lineW, 2.8, lineW]
        };
        var spanLines = 0;
        downloads.forEach(function (elem, index) {
            rows.push({ col1: elem.label, first: true, index: index });
            if (elem.singleValue) {
                rows[spanLines]['col2'] = '';
                rows[spanLines]['last'] = true;
                rows[spanLines]['single'] = true;
                spanLines++;
            }
            else {
                elem.listValues.forEach(function (value, idx) {
                    if (idx !== 0) {
                        rows.push({ col1: '' });
                    }
                    rows[spanLines]['col2'] = '•';
                    if (idx === elem.listValues.length - 1) {
                        rows[spanLines]['last'] = true;
                    }
                    spanLines++;
                });
            }
        });
        this._doc.autoTable(columns, rows, config);
    };
    DocRendererDetail.prototype._drawGallery = function (images) {
        var _this = this;
        if (images.length > 0) {
            this._doc.addPage();
            var pageHeight_1 = this._doc.internal.pageSize.getHeight();
            var imageWidth_1 = pageHeight_1 / 3 - (this._docConfig.padding * 2 + 2);
            var initialTop_1 = 26;
            var column1_1 = 10;
            var column2_1 = imageWidth_1 + this._docConfig.padding * 1.7;
            var imageLeft_1 = column1_1;
            var imageTop_1 = initialTop_1;
            images.forEach(function (imageUrl, i) {
                imageLeft_1 = (i % 2 !== 0) ? column2_1 : column1_1;
                if ((imageTop_1 + imageWidth_1) >= (pageHeight_1 - 20)) {
                    imageTop_1 = initialTop_1;
                    _this._doc.addPage();
                }
                try {
                    _this._doc.addImage(imageUrl, imageLeft_1, imageTop_1, imageWidth_1, imageWidth_1);
                }
                catch (e) {
                    console.log('Error loading image: ' + imageUrl);
                }
                if (i % 2 !== 0) {
                    imageTop_1 += imageWidth_1 + 4;
                }
            });
        }
        this._drawLayout();
    };
    return DocRendererDetail;
}(IDocRenderer));
export { DocRendererDetail };
//# sourceMappingURL=doc-renderer-detail.js.map