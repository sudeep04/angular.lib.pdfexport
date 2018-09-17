import { Property } from './property.interface';
import { Download } from './download.interface';
import { Detail } from './detail/detail.interface';
import { JsonParser } from '../../dist/models/json-parser';

export class Product {

    public get name(): string {

        return this._name;
    }

    public get supplier(): string {

        return this._supplier;
    }

    public get imageUrl(): string {

        return this._imageUrl;
    }

    public get imageGallery(): string[] {

        return this._imageGallery;
    }

    public get properties(): Property[] {

        return this._properties;
    }

    public get downloads(): Download {

        return this._downloads;
    }

    public get details(): Detail[] {
        return this._details;
    }

    public _name: string;

    public _supplier: string;

    public _imageUrl: string;

    public _imageGallery: string [];

    public _properties: Property[];

    public _downloads?: Download;

    public _details: Detail[];

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

    public addImageUrl(imageUrl: string): void {

        this._imageUrl = imageUrl;
    }

    public addDetails(details: Detail): void {

        this._details = JSON.parse(JSON.stringify(details));
    }

    public addImageGallery(imageUrl: string): void {

        this._imageGallery.push(imageUrl);
    }

    public addDownloads(downloads: Download): void {

       this._downloads = JSON.parse(JSON.stringify(downloads));
    }
}
