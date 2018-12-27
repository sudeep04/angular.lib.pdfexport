import { DownloadElement } from '../download/download-element.interface';
import { SupplierData } from './supplier-data.interface';

export class Supplier {

    private _data: SupplierData;

    private _links: DownloadElement[];

    constructor(data: SupplierData, links: DownloadElement[]) {

        this._data = JSON.parse(JSON.stringify(data));
        this._links = JSON.parse(JSON.stringify(links));
    }

    public get data(): SupplierData {
        return this._data;
    }

    public get links(): DownloadElement[] {
        return this._links;
    }

}
