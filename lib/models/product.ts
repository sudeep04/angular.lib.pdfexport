import { Property } from './property.interface';
import { Download } from './download.interface';
import { Detail } from './detail/detail.interface';

export class Product {

    public get name(): string {

        return this._name;
    }

    public set name(name: string) {

        this._name = name;
    }

    public get supplier(): string {

        return this._supplier;
    }

    public set supplier(supplier: string) {

        this._supplier = supplier;
    }

    public get imageUrl(): string {

        return this._imageUrl;
    }

    public set imageUrl(imageUrl: string) {

        this._imageUrl = imageUrl;
    }

    public get imageGallery(): string[] {

        return this._imageGallery;
    }

    public set imageGallery(imageGallery: string []) {

        this._imageGallery = JSON.parse(JSON.stringify(imageGallery));
    }

    public get properties(): Property[] {

        return this._properties;
    }

    public set properties(properties: Property[]) {

        this._properties = JSON.parse(JSON.stringify(properties));
    }

    public get downloads(): Download {

        return this._downloads;
    }

    public set downloads(downloads: Download) {
        if (downloads !== undefined) {
            this._downloads = JSON.parse(JSON.stringify(downloads));
        }
    }

    public get details(): Detail[] {
        return this._details;
    }

    public set details(details: Detail[]) {

        this._details = JSON.parse(JSON.stringify(details));
    }

    private _name: string;

    private _supplier: string;

    private _imageUrl: string;

    private _imageGallery: string [];

    private _properties: Property[];

    private _downloads?: Download;

    private _details: Detail[];

    constructor(name: string, supplier: string) {

        this._name = name;
        this._supplier = supplier;
        this._properties = [];
        this._imageUrl = '';
        this._details = [];
        this._imageGallery = [];
    }

    public addProperty(property: Property): void {

        this._properties.push(property);
    }

    public addImageGallery(imageUrl: string): void {

        this._imageGallery.push(imageUrl);
    }
}
