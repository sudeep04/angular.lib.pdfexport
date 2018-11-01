import { Injectable } from '@angular/core';

import { DocRenderer } from '../models/doc-renderer';
import { DocConfig } from '../models/doc-config';
import { IDocRenderer } from '../models/doc-renderer.interface';
import { DocRendererDetail } from '../models/doc-renderer-detail';

const DOCUMENT_WIDTH = 210;
const DOCUMENT_PADDING = 8.69;
const LINE_WIDTH = 2.52;
const COLUMN_WIDTH = 43.36;
const TABLE_MARGIN_TOP = 7.4;

@Injectable()
export class PdfExportService {

    private _docRenderer: IDocRenderer;

    public generatePdf(jsonData: object): void {

        this._docRenderer = new DocRenderer();
        const docConfig: DocConfig = { columnWidth: COLUMN_WIDTH, lineWidth: LINE_WIDTH, marginTop: TABLE_MARGIN_TOP, padding: DOCUMENT_PADDING };

        this._generate(jsonData, docConfig);
    }

    public generatePdfProductDetail(jsonData: object): void {
        this._docRenderer = new DocRendererDetail();
        const docConfig: DocConfig =  { columnWidth: COLUMN_WIDTH, lineWidth: LINE_WIDTH, marginTop: TABLE_MARGIN_TOP, padding: DOCUMENT_PADDING };

        this._generate(jsonData, docConfig);
    }

    private _generate(jsonData: object, docConfig: DocConfig): void {
        this._docRenderer.draw(jsonData, docConfig);
        // this._docRenderer.save();
    }
}
