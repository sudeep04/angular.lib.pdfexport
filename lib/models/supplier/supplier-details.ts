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
        this._setUrls();
    }

    public get settings(): Settings {
        return this._settings;
    }

    public get supplier(): Supplier {
        return this._supplier;
    }

    private _setUrls(): void {
        if (this.supplier.data.primaryImage) {
            const imgUrl = this.settings.productsImageApiPath
                + this.supplier.data.primaryImage.uuid
                + '/content/'
                + this.supplier.data.primaryImage.content
                + '?quality=100&background=white&mode=pad&width=720&height=720';
            this.supplier.data.primaryImage.url = imgUrl;
        }
        if (this._supplier.data.logo) {

            const imgUrl = this.settings.productsImageApiPath
                + this.supplier.data.logo.uuid
                + '/content/'
                + this.supplier.data.logo.content
                + '?quality=100&background=white&mode=pad&width=720&height=720';

            this.supplier.data.logo.url = imgUrl;
        }
    }
}
