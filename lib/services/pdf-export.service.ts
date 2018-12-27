import { Injectable } from '@angular/core';

import { DocRenderer } from '../models/doc-renderer';
import { DocConfig } from '../models/doc-config';
import { IDocRenderer } from '../models/doc-renderer.interface';
import { DocRendererDetail } from '../models/doc-renderer-detail';
import { DocRendererSupplier } from '../models/supplier/doc-renderer-supplier';

const DOCUMENT_WIDTH = 210;
const DOCUMENT_PADDING = 8.69;
const LINE_WIDTH = 2.52;
const COLUMN_WIDTH = 43.36;
const TABLE_MARGIN_TOP = 7.4;

@Injectable()
export class PdfExportService {

    private docConfig: DocConfig = { columnWidth: COLUMN_WIDTH, lineWidth: LINE_WIDTH, marginTop: TABLE_MARGIN_TOP, padding: DOCUMENT_PADDING };
    private _docRenderer: IDocRenderer;

    public generatePdf(jsonData: object): void {

        this._docRenderer = new DocRenderer();
        this._generate(jsonData, this.docConfig);
    }

    public generatePdfProductDetail(jsonData: object): void {
        this._docRenderer = new DocRendererDetail();
        this._generate(jsonData, this.docConfig);
    }

    public generatePDFSupplierDetail(jsonData: object): void {
        this._docRenderer = new DocRendererSupplier();
        this._generate(jsonData, this.docConfig);
    }

    private _generate(jsonData: object, docConfig: DocConfig): void {
        this._docRenderer.draw(jsonData, docConfig);
        // this._docRenderer.save();
    }
}
