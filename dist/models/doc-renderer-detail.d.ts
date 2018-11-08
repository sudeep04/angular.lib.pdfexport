import { IDocRenderer } from './doc-renderer.interface';
import { DocConfig } from './doc-config';
export declare class DocRendererDetail extends IDocRenderer {
    private _marginsPrimaryImage;
    htmlToText: any;
    constructor();
    draw(jsonData: any, docConfig: DocConfig): void;
    private save();
    private _drawHeader();
    private _drawText(text, width, fontSize, marginLeft, marginTop, color, font);
    private _splitLines(text, maxLineWidth, fontSize);
    private _drawBoxImage(images);
    private _drawPrimaryImg(images);
    private _drawDetails(topIndex, imageMargin);
    private _drawDetailsText(details, marginTop, imageMargin);
    private checkWidthFirstPage(marginTop, imageMargin);
    private _drawLayout();
    private _drawLayoutIter(img);
    private _drawLayoutData(index, logo);
    private _verticalOffset(text, size, left);
    private _drawCheckedImage(marginTop);
    private _drawUncheckedImage(marginTop, check);
    private _drawBody(marginTop, checkImage, uncheckImage);
    private _drawTableHeader(marginTop, text);
    private _drawDownloads();
    private _drawGallery(images);
}
