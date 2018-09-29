import 'jspdf-customfonts';
import '../assets/js/default_vfs';
import 'jspdf-autotable';
import { DocConfig } from './doc-config';
import { IDocRenderer } from './doc-renderer.interface';
export declare class DocRenderer implements IDocRenderer {
    private _doc;
    private _data;
    private _docConfig;
    constructor();
    draw(jsonData: any, docConfig: DocConfig): void;
    save(): void;
    private _drawBody(group);
    private _drawHeader(group, showProductsImage);
    private _drawLayout(index);
}
