import { DocConfig } from './doc-config';
import { Data } from './data';
export declare class IDocRenderer {
    protected _doc: any;
    protected _data: Data;
    protected _docConfig: DocConfig;
    draw(jsonData: any, docConfig: DocConfig): void;
    protected _loadImages(index: number, input: string[], output: HTMLImageElement[], callback: any): void;
    protected _toDataURL(urls: string[], callback: any, callback2: any): void;
}
