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
import * as moment from 'moment';
import { boxShadowImg } from './imagesBase64/box-shadow-img';
import { checkImg } from './imagesBase64/check-img';
import { unckeckImg } from './imagesBase64/uncheck-img';
import * as jsPDF from 'jspdf';
import 'jspdf-customfonts';
import '../assets/js/default_vfs';
import 'jspdf-autotable';
import { logoImg } from './imagesBase64/logo-img';
import { JsonParser } from './json-parser';
import { isArray } from 'util';
import { IDocRenderer } from './doc-renderer.interface';
var IMAGES_TOP = 35;
var IMAGES_PADING_TOP = 6.2;
// const HEADER_TOP = 48;
var 
// const HEADER_TOP = 48;
DocRenderer = /** @class */ (function (_super) {
    __extends(DocRenderer, _super);
    function DocRenderer() {
        var _this = _super.call(this) || this;
        _this._doc = new jsPDF();
        _this._doc.addFont('Gotham-Medium.ttf', 'GothamMedium', 'normal');
        _this._doc.addFont('Gotham-Light.ttf', 'GothamLight', 'normal');
        return _this;
    }
    DocRenderer.prototype.draw = function (jsonData, docConfig) {
        this._data = JsonParser.parseData(jsonData);
        this._docConfig = docConfig;
        this._loadImagesTables();
    };
    DocRenderer.prototype._loadImagesTables = function () {
        //if (this._data.settings.applyFilters) {
        var elems = [checkImg, unckeckImg, boxShadowImg];
        var elemsHTML = [];
        this._loadImages(0, elems, elemsHTML, this._drawElems.bind(this));
        // } else {
        //     this._drawElems([]);
        // }
    };
    DocRenderer.prototype._drawElems = function (output) {
        if (output && output.length === 3) {
            this._checkedHTMLImage = output[0];
            this._uncheckedHTMLImage = output[1];
            this._boxShadowImage = output[2];
        }
        // loadImages
        if (this._data.settings.showProductsImage) {
            var elems_1 = [];
            this._data.groups.forEach(function (group) {
                group.forEach(function (product) {
                    elems_1.push(product.imageUrl);
                });
            });
            this._toDataURL(elems_1, this._loadImages.bind(this), this._drawElemsData.bind(this));
        }
        else {
            this._drawElemsData([]);
        }
    };
    DocRenderer.prototype._drawElemsData = function (images) {
        var _this = this;
        var lastPage = 1;
        this._data.groups.forEach(function (group, index) {
            _this._drawBody(group, images, index);
            for (var i = lastPage + 1; i < _this._doc.internal.pages.length; i++) {
                _this._doc.setPage(i);
                _this._drawHeader(group, false, null, null);
            }
            lastPage = _this._doc.internal.pages.length;
            if (index < _this._data.groups.length - 1) {
                _this._doc.addPage();
            }
        });
        this._drawLayout();
    };
    DocRenderer.prototype._save = function () {
        this._doc.save(this._data.settings.fileName);
    };
    DocRenderer.prototype._drawBody = function (group, images, indexParent) {
        var _this = this;
        this._drawHeader(group, this._data.settings.showProductsImage, images, indexParent);
        var isFirstWithoutImages = !this._data.settings.showProductsImage;
        var pageWidth = this._doc.internal.pageSize.getWidth();
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
        var columnStyles = {
            col2: { columnWidth: this._docConfig.columnWidth }
        };
        var borders = [];
        var checkImages = [];
        var filtersIndex = [];
        var spanp = 0;
        var lastRow = -1;
        var config = {
            styles: styles,
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
            tableWidth: pageWidth - ((3 - group.length) * this._docConfig.columnWidth) - 2 * this._docConfig.padding - this._docConfig.lineWidth,
            drawCell: function (cell, opts) {
                var filterPos = filtersIndex.findIndex(function (v) { return v === opts.row.index; });
                _this._doc.setFont(opts.column.dataKey === 'col1' && filterPos === -1 ?
                    'GothamMedium' : 'GothamLight', 'normal');
                if (filterPos !== -1) {
                    cell.textPos.y -= 1.8;
                    cell.height -= 4;
                    cell.contentHeight = cell.height;
                    if (lastRow !== opts.row.index) {
                        lastRow = opts.row.index;
                        spanp++;
                    }
                }
                var previousFilter = filtersIndex.findIndex(function (v) { return v === (opts.row.index + 1); });
                if (previousFilter !== -1) {
                    cell.textPos.y += 1.8;
                    if (opts.column.dataKey !== 'col1') {
                        cell.textPos.y += 1.9;
                        cell.height += 7;
                    }
                }
                if (opts.column.index !== 0) {
                    if (group[opts.column.index - 1].properties[opts.row.index - spanp].ckeck !== undefined && filterPos === -1) {
                        checkImages.push({
                            left: cell.x + 3,
                            top: cell.y + cell.height / 2 - 1.5,
                            width: 3,
                            height: 3,
                            check: group[opts.column.index - 1].properties[opts.row.index - spanp].ckeck
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
                    width: pageWidth - ((3 - group.length) * _this._docConfig.columnWidth) - 2 * _this._docConfig.padding - _this._docConfig.lineWidth,
                    height: 0.1
                });
            },
            drawRow: function (row, opts) {
                if (filtersIndex.findIndex(function (v) { return v === opts.row.index + 1; }) === -1) {
                    borders.push({
                        left: _this._docConfig.padding + _this._docConfig.lineWidth / 2,
                        top: row.y + row.height - 0.1,
                        width: pageWidth - ((3 - group.length) * _this._docConfig.columnWidth) - 2 * _this._docConfig.padding - _this._docConfig.lineWidth,
                        height: 0.1
                    });
                }
            },
            addPageContent: function (data) {
                _this._doc.setFillColor(0, 0, 0);
                borders.forEach(function (border, index) {
                    if (index < borders.length - 1) {
                        _this._doc.rect(border.left, border.top, border.width, border.height, 'F');
                    }
                });
                borders = [];
                if (_this._checkedHTMLImage && _this._uncheckedHTMLImage) {
                    checkImages.forEach(function (img) {
                        if (img.check) {
                            _this._doc.addImage(_this._checkedHTMLImage, img.left, img.top, img.width, img.height);
                        }
                        else {
                            _this._doc.addImage(_this._uncheckedHTMLImage, img.left, img.top, img.width, img.height);
                        }
                    });
                }
                checkImages = [];
                if (!isFirstWithoutImages) {
                    isFirstWithoutImages = true;
                    data.settings.margin.top -= IMAGES_PADING_TOP + _this._docConfig.columnWidth + _this._docConfig.lineWidth / 2;
                }
            }
        };
        group.forEach(function (product) {
            columns.push({ dataKey: product.name, title: product.name });
            var lineW = _this._docConfig.lineWidth + 0.5;
            if (_this._data.settings.showHighlights) {
                lineW = lineW + 4;
            }
            config.columnStyles[product.name] = { columnWidth: _this._docConfig.columnWidth, cellPadding: [2.8, _this._docConfig.lineWidth + 0.5, 2.8, lineW] };
            if (rows.length === 0) {
                product.properties.forEach(function (property) {
                    if (_this._data.settings.applyFilters) {
                        var direction = property.unit !== undefined && _this._data.settings.unitsBeforeValue.find(function (unit) { return unit === property.unit; }) ?
                            'beforeValue'
                            : 'afterValue';
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
                            if (typeof property.unit === 'undefined') {
                                filterText_1 = filterText_1;
                            }
                            else {
                                if (direction === 'afterValue') {
                                    filterText_1 = filterText_1 + ' ' + property.unit.toString();
                                }
                                else {
                                    filterText_1 = property.unit + ' ' + filterText_1;
                                }
                            }
                            rows.push({ col1: property.name });
                            filtersIndex.push(rows.push({ col1: "(" + filterText_1 + ")" }) - 1);
                        }
                        else {
                            rows.push({ col1: property.name });
                        }
                    }
                    else {
                        rows.push({ col1: property.name });
                    }
                });
            }
            var span = 0;
            rows.forEach(function (value, idx) {
                if (filtersIndex.findIndex(function (e) { return e === idx; }) !== -1) {
                    span++;
                    rows[idx][product.name] = '';
                }
                else {
                    var prd = product.properties[idx - span];
                    if (prd.value !== undefined) {
                        rows[idx][product.name] = _this._data.translate(prd.value);
                    }
                }
            });
        });
        this._doc.autoTable(columns, rows, config);
    };
    DocRenderer.prototype._drawHeader = function (group, showProductsImage, images, indexParent) {
        var _this = this;
        var pageWidth = this._doc.internal.pageSize.getWidth();
        if (showProductsImage) {
            group.forEach(function (product, index) {
                switch (index) {
                    case 0:
                        _this._doc.addImage(_this._boxShadowImage, pageWidth - (_this._docConfig.columnWidth * 3 + _this._docConfig.padding), IMAGES_TOP + IMAGES_PADING_TOP, _this._docConfig.columnWidth, _this._docConfig.columnWidth);
                        try {
                            _this._doc.addImage(images[indexParent * 3 + index], pageWidth - (_this._docConfig.columnWidth * 3 + _this._docConfig.padding) + 3.2, IMAGES_TOP + IMAGES_PADING_TOP + 3.2, _this._docConfig.columnWidth - 6.4, _this._docConfig.columnWidth - 6.4);
                        }
                        catch (e) {
                            console.log('Error loading image by jsPDF ');
                        }
                        break;
                    case 1:
                        _this._doc.addImage(_this._boxShadowImage, pageWidth - (_this._docConfig.columnWidth * 2 + _this._docConfig.padding), IMAGES_TOP + IMAGES_PADING_TOP, _this._docConfig.columnWidth, _this._docConfig.columnWidth);
                        try {
                            _this._doc.addImage(images[indexParent * 3 + index], pageWidth - (_this._docConfig.columnWidth * 2 + _this._docConfig.padding) + 3.2, IMAGES_TOP + IMAGES_PADING_TOP + 3.2, _this._docConfig.columnWidth - 6.4, _this._docConfig.columnWidth - 6.4);
                        }
                        catch (e) {
                            console.log('Error loading image by jsPDF ');
                        }
                        break;
                    case 2:
                        _this._doc.addImage(_this._boxShadowImage, pageWidth - (_this._docConfig.columnWidth + _this._docConfig.padding), IMAGES_TOP + IMAGES_PADING_TOP, _this._docConfig.columnWidth, _this._docConfig.columnWidth);
                        try {
                            _this._doc.addImage(images[indexParent * 3 + index], pageWidth - (_this._docConfig.columnWidth + _this._docConfig.padding) + 3.2, IMAGES_TOP + IMAGES_PADING_TOP + 3.2, _this._docConfig.columnWidth - 6.4, _this._docConfig.columnWidth - 6.4);
                        }
                        catch (e) {
                            console.log('Error loading image by jsPDF ');
                        }
                        break;
                }
            });
        }
        var columns = [{ dataKey: 'col1', title: '' }];
        var rows = [
            { col1: this._data.settings.translations.layout.supplierName }
        ];
        var styles = {
            fillColor: [246, 246, 246],
            lineWidth: 0,
            fontStyle: 'normal',
            cellPadding: [2.8, this._docConfig.lineWidth + 0.5, 2.8, this._docConfig.lineWidth + 0.5],
            fontSize: 9,
            textColor: 0,
            overflow: 'linebreak',
            valign: 'middle'
        };
        var columnStyles = {
            col2: { columnWidth: this._docConfig.columnWidth }
        };
        var borders = [];
        var config = {
            styles: styles,
            margin: {
                top: showProductsImage ? IMAGES_TOP + IMAGES_PADING_TOP + this._docConfig.columnWidth + this._docConfig.lineWidth / 2 : IMAGES_TOP,
                left: this._docConfig.padding + this._docConfig.lineWidth / 2
            },
            columnStyles: {
                col1: {}
            },
            alternateRowStyles: styles,
            tableWidth: pageWidth - ((3 - group.length) * this._docConfig.columnWidth) - 2 * this._docConfig.padding - this._docConfig.lineWidth,
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
                    width: pageWidth - ((3 - group.length) * _this._docConfig.columnWidth) - 2 * _this._docConfig.padding - _this._docConfig.lineWidth,
                    height: 0.1
                });
            },
            drawRow: function (row, opts) {
                borders.push({
                    left: _this._docConfig.padding + _this._docConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - ((3 - group.length) * _this._docConfig.columnWidth) - 2 * _this._docConfig.padding - _this._docConfig.lineWidth,
                    height: 0.1
                });
            }
        };
        group.forEach(function (product) {
            var productName = product.name;
            if (product.name.length === 26 || product.name.length === 27) {
                var x = productName.split(' ');
                x[x.length - 1] = '\n' + x[x.length - 1];
                productName = x.join(' ');
            }
            columns.push({ dataKey: product.name, title: productName });
            rows[0][product.name] = product.supplier;
            config.columnStyles[product.name] = { columnWidth: _this._docConfig.columnWidth };
        });
        this._doc.autoTable(columns, rows, config);
        this._doc.setFillColor(0, 0, 0);
        borders.forEach(function (border) {
            _this._doc.rect(border.left, border.top, border.width, border.height, 'F');
        });
    };
    DocRenderer.prototype._drawLayout = function () {
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
    DocRenderer.prototype._drawLayoutIter = function (img) {
        for (var i = 1; i < this._doc.internal.pages.length; i++) {
            this._doc.setPage(i);
            this._drawLayoutData(i, img);
        }
        this._save();
    };
    DocRenderer.prototype._drawLayoutData = function (index, logo) {
        var _this = this;
        var pageWidth = this._doc.internal.pageSize.getWidth();
        var pageHeight = this._doc.internal.pageSize.getHeight();
        var columns = [
            { dataKey: 'col1' },
            { dataKey: 'col2' }
        ];
        var rows = [
            { col1: this._data.settings.captions.project, col2: this._data.settings.translations.layout.date + ': ' + moment(Date.now()).format('DD.MM.YY') },
            {
                col1: this._data.settings.captions.bearbeiter, col2: this._data.settings.translations.layout.page + ': ' + ('0' + index).slice(-2) + '/'
                    + ('0' + (this._doc.internal.pages.length - 1)).slice(-2)
            }
        ];
        var styles = {
            fillColor: [246, 246, 246],
            lineWidth: this._docConfig.lineWidth,
            lineColor: 255,
            cellPadding: [4.4, 4.3, 3.28, 4.3],
            fontSize: 12,
            textColor: 0
        };
        var columnStyles = {
            col2: { columnWidth: this._docConfig.columnWidth }
        };
        var config = {
            styles: styles,
            alternateRowStyles: styles,
            columnStyles: columnStyles,
            margin: { top: this._docConfig.padding, left: this._docConfig.padding },
            showHeader: 'never',
            tableWidth: this._data.settings.logo.show ? pageWidth - (2 * this._docConfig.padding + this._docConfig.columnWidth) : pageWidth - (2 * this._docConfig.padding),
            drawCell: function (cell, opts) {
                _this._doc.setFont('GothamMedium', 'normal');
            }
        };
        this._doc.autoTable(columns, rows, config);
        var tableHeight = this._doc.autoTable.previous.finalY - this._doc.autoTable.previous.pageStartY - this._docConfig.lineWidth;
        if (this._data.settings.logo.show && this._data.settings.logo.type === 'url') {
            this._doc.addImage(this._data.settings.logo.data, pageWidth - this._docConfig.columnWidth - this._docConfig.padding + this._docConfig.lineWidth / 2, this._docConfig.padding + this._docConfig.lineWidth / 2, this._docConfig.columnWidth - this._docConfig.lineWidth, tableHeight);
        }
        if (this._data.settings.logo.show && this._data.settings.logo.type === 'text') {
            this._doc.setFont('GothamMedium', 'normal');
            var fontSize = 14;
            while ((this._doc.getStringUnitWidth(this._data.settings.logo.data) * fontSize) / 2.88 > this._docConfig.columnWidth - this._docConfig.lineWidth) {
                fontSize--;
            }
            var logoWidth = (this._doc.getStringUnitWidth(this._data.settings.logo.data) * fontSize) / 2.88;
            this._doc.setFontSize(fontSize);
            this._doc.text(this._data.settings.logo.data, pageWidth - this._docConfig.columnWidth - this._docConfig.padding + this._docConfig.lineWidth / 2 + (this._docConfig.columnWidth - this._docConfig.lineWidth - logoWidth) / 2, this._docConfig.padding + this._docConfig.lineWidth + tableHeight / 2);
        }
        this._doc.setFont('GothamMedium', 'normal');
        this._doc.setFontSize(9);
        this._doc.setFillColor(246, 246, 246);
        this._doc.rect(this._docConfig.padding + this._docConfig.lineWidth / 2, pageHeight - (this._docConfig.padding + this._docConfig.lineWidth / 2 + 10), pageWidth - (2 * this._docConfig.padding + this._docConfig.lineWidth), 10, 'F');
        this._doc.text('Copyright © 2018 Plan.One', 12.9, 283.2);
        if (logo) {
            this._doc.addImage(logo, 'png', 175.5, 280, 21.6, 4.1);
        }
    };
    return DocRenderer;
}(IDocRenderer));
// const HEADER_TOP = 48;
export { DocRenderer };
//# sourceMappingURL=doc-renderer.js.map