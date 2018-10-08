import * as jsPDF from 'jspdf';
import { JsonParser } from './json-parser';
import { boxShadowImg } from './imagesBase64/box-shadow-img';
import { logoImg } from './imagesBase64/logo-img';
import { isArray } from 'util';
import { checkImg } from './imagesBase64/check-img';
import { unckeckImg } from './imagesBase64/uncheck-img';
var IMAGES_TOP = 35;
var IMAGES_PADING_TOP = 6.2;
var DocRendererDetail = /** @class */ (function () {
    function DocRendererDetail() {
        this._doc = new jsPDF();
        this._doc.addFont('Gotham-Medium.ttf', 'GothamMedium', 'normal');
        this._doc.addFont('Gotham-Light.ttf', 'GothamLight', 'normal');
    }
    DocRendererDetail.prototype.draw = function (jsonData, docConfig) {
        this._data = JsonParser.parseDataProduct(jsonData);
        this._docConfig = docConfig;
        var topIndex = this._drawHeader();
        var imageMargin = this._drawPrimaryImage();
        this._drawDetails(topIndex, imageMargin);
        this._drawDownloads();
        this._drawGallery();
        for (var i = 1; i < this._doc.internal.pages.length; i++) {
            this._doc.setPage(i);
            this._drawLayout(i);
        }
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
        return this._doc.setFont('helvetica', 'neue').setFontSize(fontSize).splitTextToSize(text, maxLineWidth);
    };
    // draw Primary Image
    // draw Primary Image
    DocRendererDetail.prototype._drawPrimaryImage = 
    // draw Primary Image
    function () {
        var imageUrl = this._data.productDetail.imageUrl;
        var pageWidth = this._doc.internal.pageSize.getWidth();
        var imageTop = 30 - this._docConfig.lineWidth;
        var columnWidth = pageWidth - 100;
        var imageWidth = pageWidth / 2 - this._docConfig.padding * 2 + 5;
        this._doc.addImage(boxShadowImg, columnWidth, imageTop, imageWidth, imageWidth);
        try {
            this._doc.addImage(imageUrl, columnWidth + 4.2, imageTop + 4.2, imageWidth - 8.4, imageWidth - 8.4);
        }
        catch (e) {
            this._doc.addImage(this._data.settings.placeholderUrl, columnWidth + 4.2, imageTop + 4.2, imageWidth - 8.4, imageWidth - 8.4);
        }
        return { left: columnWidth, top: imageTop + imageWidth };
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
            this._drawBody(marginTop);
        }
        else {
            var specialElementHandlers = {
                // element with id of "bypass" - jQuery style selector
                '#bypassme': 
                // element with id of "bypass" - jQuery style selector
                function (element, renderer) {
                    // true = "handled elsewhere, bypass text extraction"
                    return true;
                },
                '.hide': function (element, renderer) {
                    // true = "handled elsewhere, bypass text extraction"
                    return true;
                }
            };
            if (marginTop + 25 < this._doc.internal.pageSize.getHeight() - 36) {
                marginTop += 10;
            }
            else {
                this._doc.addPage();
                marginTop = 40;
            }
            var widthColumn = (marginTop < imageMargin && this._doc.internal.getCurrentPageInfo().pageNumber === 1) ?
                this._doc.internal.pageSize.getWidth() / 2 - this._docConfig.padding : this._doc.internal.pageSize.getWidth() - 30;
            var margins = {
                top: 36,
                bottom: 20,
                left: 10,
                width: widthColumn
            };
            var detail = details.pop();
            var div = document.createElement('div');
            var css = '<style> * { font-family: sans-serif !important; font-size: 11pt !important;}; </style>';
            if (detail.content !== undefined) {
                div.innerHTML = css + detail.content.replace('–', '-');
            }
            else {
                div.innerHTML = css;
            }
            // draw title
            this._drawText(detail.name, margins.width, 20, margins.left, marginTop, [9, 4, 3], ['GothamMedium', 'normal']);
            // draw detail
            this._doc.fromHTML(div, margins.left, marginTop, {
                width: margins.width,
                // max width of content on PDF
                elementHandlers: specialElementHandlers
            }, function (dispose) {
                var y = (dispose.y < imageMargin && _this._doc.internal.getCurrentPageInfo().pageNumber === 1) ?
                    imageMargin : dispose.y;
                _this._drawDetailsText(details, y, imageMargin);
            }, margins);
        }
    };
    // draw Page Header and Footer
    // draw Page Header and Footer
    DocRendererDetail.prototype._drawLayout = 
    // draw Page Header and Footer
    function (index) {
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
        this._doc.addImage(logoImg, 175.5, 280, 21.6, 4.1);
    };
    DocRendererDetail.prototype._verticalOffset = function (text, size, left) {
        return left + this._doc.getStringUnitWidth(text) * size / 2.8;
    };
    // draw table
    // draw table
    DocRendererDetail.prototype._drawBody = 
    // draw table
    function (marginTop) {
        var _this = this;
        var i = 0;
        var pageWidth = this._doc.internal.pageSize.getWidth();
        var pageHeight = this._doc.internal.pageSize.getHeight();
        var product = this._data.productDetail;
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
                _this._doc.setFont(opts.column.dataKey === 'col1' ?
                    'GothamMedium' : 'GothamLight', 'normal');
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
                checkImages.forEach(function (img) {
                    (img.check) ?
                        _this._doc.addImage(checkImg, img.left, img.top, img.width, img.height)
                        : _this._doc.addImage(unckeckImg, img.left, img.top, img.width, img.height);
                });
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
                var row = {};
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
                                var val1 = v;
                                if (index === 0) {
                                    filterText_1 += val1;
                                }
                                else {
                                    filterText_1 += ', ' + val1;
                                }
                            });
                        }
                        else if (filterValue.upper !== undefined && filterValue.lower !== undefined) {
                            filterText_1 = filterValue.lower + ' - ' + filterValue.upper;
                        }
                        else {
                            filterText_1 = filterValue.toString();
                        }
                        if (direction === 'afterValue') {
                            filterText_1 = filterText_1 + ' ' + property.unit;
                        }
                        else {
                            filterText_1 = property.unit + ' ' + filterText_1;
                        }
                        row = { col1: property.name + ("\n(" + filterText_1 + ")") };
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
        product.properties.forEach(function (property, index) {
            if (property.value !== undefined) {
                rows[index][product.name] = _this._data.translate(property.value);
            }
        });
        this._doc.autoTable(columns, rows, config);
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
        if (marginTop + 45 < pageHeight) {
            marginTop += 10;
        }
        else {
            this._doc.addPage();
            marginTop = 40;
        }
        this._drawTableHeader(marginTop, 'Downloads');
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
            drawHeaderCell: function (cell, opts) {
                _this._doc.setFont('GothamMedium', 'normal');
            },
            drawHeaderRow: function (row, opts) {
                borders.push({
                    left: _this._docConfig.padding + _this._docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - 2 * _this._docConfig.padding - _this._docConfig.lineWidth,
                    height: 0.1
                });
            },
            drawRow: function (row, opts) {
                borders.push({
                    left: _this._docConfig.padding + _this._docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - _this._docConfig.columnWidth * 2 + 2 * _this._docConfig.padding,
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
        // fix
        if (rows.length === 0) {
            downloads.forEach(function (elem) {
                var row = {};
                row = { col1: elem.label };
                rows.push(row);
            });
        }
        downloads.forEach(function (elem, index) {
            if (elem.singleValue) {
                rows[index]['col2'] = elem.singleValue.name;
            }
            else {
                var item_1 = '';
                elem.listValues.forEach(function (value, idx) {
                    if (idx === 0) {
                        item_1 = value.name;
                    }
                    else {
                        item_1 += "\n" + value.name;
                    }
                });
                rows[index]['col2'] = item_1;
            }
            /* if (d.value !== undefined) {
            
                            rows[index][product.name] = this._data.translate(property.value);
                        } */
        });
        this._doc.autoTable(columns, rows, config);
    };
    DocRendererDetail.prototype._drawGallery = function () {
        var _this = this;
        this._doc.addPage();
        var pageHeight = this._doc.internal.pageSize.getHeight();
        var imageWidth = pageHeight / 3 - (this._docConfig.padding * 2 + 2);
        var initialTop = 26;
        var column1 = 10;
        var column2 = imageWidth + this._docConfig.padding * 1.7;
        var imageLeft = column1;
        var imageTop = initialTop;
        this._data.productDetail.imageGallery.forEach(function (imageUrl, i) {
            imageLeft = (i % 2 !== 0) ? column2 : column1;
            if ((imageTop + imageWidth) >= (pageHeight - 20)) {
                imageTop = initialTop;
                _this._doc.addPage();
            }
            try {
                _this._doc.addImage(imageUrl, imageLeft, imageTop, imageWidth, imageWidth);
            }
            catch (e) {
                console.log('Error loading image: ' + imageUrl);
            }
            if (i % 2 !== 0) {
                imageTop += imageWidth + 4;
            }
        });
    };
    return DocRendererDetail;
}());
export { DocRendererDetail };
//# sourceMappingURL=doc-renderer-detail.js.map