import * as jsPDF from 'jspdf';
import { IDocRenderer } from '../doc-renderer.interface';
import { DocConfig } from '../doc-config';
import { JsonParser } from '../json-parser';
import { SupplierDetails } from './supplier-details';

export class DocRendererSupplier extends IDocRenderer {

    private _marginsPrimaryImage: any;
    private _supplierDetails: SupplierDetails;

    constructor() {
        super();
    }

    public draw(jsonData: any, docConfig: DocConfig): void {

        this._supplierDetails = JsonParser.parseSupplier(jsonData);
        this._docConfig = docConfig;
        // console.log(this._supplierDetails.supplier.data);
    }
}
