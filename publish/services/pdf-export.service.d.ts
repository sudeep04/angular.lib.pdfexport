import 'jspdf-customfonts';
import './default_vfs';
import 'jspdf-autotable';
export declare class PdfExportService {
    private _doc;
    private _headerPainter;
    private _footerPainter;
    private _productsPainter;
    generatePdf(jsonData: any): void;
    private _init();
    private _buildProducts(products);
    private _getProductsGoups(products);
    private _parceJsonData(jsonData);
}
