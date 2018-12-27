import { Detail } from '../detail/detail.interface';

export interface SupplierData {
    uuid: string;
    name: string;
    summary: string;
    postalAddress: PostalAddress;
    websiteUrls: string[];
    emailAddresses: string[];
    logo: Detail;
    primaryImage: Detail;
}

export interface PostalAddress {
    address: string;
    road: string;
    houseNumber: string;
    city: string;
    postalCode: string;
    country: string;
}
