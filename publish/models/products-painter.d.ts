import { PageConfig } from './page-config';
import { TableConfig } from './table-config';
import { Product } from './product';
export declare class ProductsPainter {
    drow(group: Product[], doc: any, pageConfig: PageConfig, tableConfig: TableConfig): void;
    private _drowHeader(group, doc, pageConfig, tableConfig);
    private _drowBody(group, doc, pageConfig, tableConfig);
}
