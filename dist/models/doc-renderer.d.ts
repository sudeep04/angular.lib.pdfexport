import 'jspdf-customfonts';
import '../assets/js/default_vfs';
import 'jspdf-autotable';
import { DocConfig } from './doc-config';
import { IDocRenderer } from './doc-renderer.interface';
export declare class DocRenderer extends IDocRenderer {
    private _checkedHTMLImage;
    private _uncheckedHTMLImage;
    private _boxShadowImage;
    constructor();
    draw(jsonData: any, docConfig: DocConfig): void;
    private _loadImagesTables();
    private _drawElems(output);
    private _drawElemsData(images);
    private _save();
    private _drawBody(group, images, indexParent);
    private _drawHeader(group, showProductsImage, images, indexParent);
    private _drawLayout();
    private _drawLayoutIter(img);
    private _drawLayoutData(index, logo);
}
