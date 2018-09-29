export declare class PdfExportService {
    private _docRenderer;
    generatePdf(jsonData: object): void;
    generatePdfProductDetail(jsonData: object): void;
    private _generate(jsonData, docConfig);
}
