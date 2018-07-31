import 'jspdf-customfonts';
import '../assets/js/default_vfs';
import 'jspdf-autotable';
import { DocConfig } from './doc-config';
export declare class DocRenderer {
    private _doc;
    private _data;
    private _docConfig;
    constructor();
    drow(jsonData: any, docConfig: DocConfig): void;
    save(): void;
    private _drowBody(group);
    private _drowHeader(group, showProductsImage);
    private _drowLayout(index);
}
