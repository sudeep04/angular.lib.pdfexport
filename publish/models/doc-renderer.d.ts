import 'jspdf-customfonts';
import '../assets/js/default_vfs';
import 'jspdf-autotable';
import { Data } from './data';
import { DocConfig } from './doc-config';
export declare class DocRenderer {
    private _doc;
    constructor();
    drow(data: Data, docConfig: DocConfig): void;
    save(fileName: string): void;
    private _drowBody(group, docConfig);
    private _drowHeader(group, docConfig, isFirst);
    private _drowLayout(index, docConfig);
}
