import { IDocRenderer } from './doc-renderer.interface';
import { DocConfig } from './doc-config';
export declare class DocRendererDetail implements IDocRenderer {
    private _doc;
    private _data;
    private _docConfig;
    constructor();
    draw(jsonData: any, docConfig: DocConfig): void;
    save(): void;
    private _drawHeader();
    private _drawText(text, width, fontSize, marginLeft, marginTop, color, font);
    private _splitLines(text, maxLineWidth, fontSize);
    private _drawPrimaryImage();
    private _drawDetails(topIndex, imageMargin);
    private _drawDetailsText(details, marginTop, imageMargin);
    private _drawLayout(index);
    private _verticalOffset(text, size, left);
    private _drawBody(marginTop);
    private _drawTableHeader(marginTop, text);
    private _drawDownloads();
    private _drawGallery();
}
