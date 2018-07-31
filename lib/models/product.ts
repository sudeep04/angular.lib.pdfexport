import { Property } from './property.interface';

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

    public get properties(): Property[] {

        return this._properties;
    }

    private _name: string;

    private _supplier: string;

    private _imageUrl: string;

    private _properties: Property[];

    constructor(name: string, supplier: string) {

        this._name = name;
        this._supplier = supplier;
        this._properties = [];
        this._imageUrl = "";
    }

    public addProperty(property: Property): void {

        this._properties.push(property);
    }

    public addImageUrl(imageUrl: string): void {

        this._imageUrl = imageUrl;
    }
}
