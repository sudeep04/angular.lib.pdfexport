import { Injectable } from '@angular/core';
import { DocRenderer } from '../models/doc-renderer';
import { DocRendererDetail } from '../models/doc-renderer-detail';
var DOCUMENT_WIDTH = 210;
var DOCUMENT_PADDING = 8.69;
var LINE_WIDTH = 2.52;
var COLUMN_WIDTH = 43.36;
var TABLE_MARGIN_TOP = 7.4;
var PdfExportService = /** @class */ (function () {
    function PdfExportService() {
    }
    PdfExportService.prototype.generatePdf = function (jsonData) {
        this._docRenderer = new DocRenderer();
        var docConfig = { columnWidth: COLUMN_WIDTH, lineWidth: LINE_WIDTH, marginTop: TABLE_MARGIN_TOP, padding: DOCUMENT_PADDING };
        this._generate(jsonData, docConfig);
    };
    PdfExportService.prototype.generatePdfProductDetail = function (jsonData) {
        this._docRenderer = new DocRendererDetail();
        var docConfig = { columnWidth: COLUMN_WIDTH, lineWidth: LINE_WIDTH, marginTop: TABLE_MARGIN_TOP, padding: DOCUMENT_PADDING };
        this._generate(jsonData, docConfig);
    };
    PdfExportService.prototype._generate = function (jsonData, docConfig) {
        this._docRenderer.draw(jsonData, docConfig);
        // this._docRenderer.save();
    };
    PdfExportService.decorators = [
        { type: Injectable },
    ];
    return PdfExportService;
}());
export { PdfExportService };
//# sourceMappingURL=pdf-export.service.js.map