import { Property } from './property.interface';
import { Download } from './download.interface';
import { Detail } from './detail/detail.interface';
export declare class Product {
    name: string;
    supplier: string;
    imageUrl: string;
    imageGallery: string[];
    properties: Property[];
    downloads: Download;
    details: Detail[];
    private _name;
    private _supplier;
    private _imageUrl;
    private _imageGallery;
    private _properties;
    private _downloads?;
    private _details;
    constructor(name: string, supplier: string);
    addProperty(property: Property): void;
    addImageGallery(imageUrl: string): void;
}
