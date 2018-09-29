import { Injectable } from '@angular/core';
import { DocRenderer } from '../models/doc-renderer';
import { DocRendererDetail } from '../models/doc-renderer-detail';
const DOCUMENT_WIDTH = 210;
const DOCUMENT_PADDING = 8.69;
const LINE_WIDTH = 2.52;
const COLUMN_WIDTH = 43.36;
const TABLE_MARGIN_TOP = 7.4;
export class PdfExportService {
    generatePdf(jsonData) {
        this._docRenderer = new DocRenderer();
        const docConfig = { columnWidth: COLUMN_WIDTH, lineWidth: LINE_WIDTH, marginTop: TABLE_MARGIN_TOP, padding: DOCUMENT_PADDING };
        this._generate(jsonData, docConfig);
    }
    generatePdfProductDetail(jsonData) {
        this._docRenderer = new DocRendererDetail();
        const docConfig = { columnWidth: COLUMN_WIDTH, lineWidth: LINE_WIDTH, marginTop: TABLE_MARGIN_TOP, padding: DOCUMENT_PADDING };
        this._generate(jsonData, docConfig);
    }
    _generate(jsonData, docConfig) {
        this._docRenderer.draw(jsonData, docConfig);
        this._docRenderer.save();
    }
}
PdfExportService.decorators = [
    { type: Injectable },
];
//# sourceMappingURL=pdf-export.service.js.map