import { Settings } from '../settings.interface';
import { Supplier } from './supplier';

export class SupplierDetails {

    private _settings: Settings;

    private _supplier: Supplier;

    constructor(settings: Settings, supplier: any) {
        this._settings = settings;
        this._supplier = new Supplier(
            supplier.supplierData,
            supplier.supplierLinks
        );
    }

    public get settings(): Settings {
        return this._settings;
    }

    public get supplier(): Supplier {
        return this._supplier;
    }
}
