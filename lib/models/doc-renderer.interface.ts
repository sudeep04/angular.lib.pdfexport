import { DocConfig } from './doc-config';

export interface IDocRenderer {

    draw(jsonData: any, docConfig: DocConfig): void;
}
