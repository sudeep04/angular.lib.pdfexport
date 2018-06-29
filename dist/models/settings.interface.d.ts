export interface Settings {
    logo: {
        show: boolean;
        type: 'text' | 'url';
        data: string;
    };
    showProductsImage: boolean;
    captions: {
        architectureOffice: string;
        project: string;
    };
    sorting: 'assc' | 'desc';
    units: {
        [unit: string]: 'afterValue' | 'beforeValue';
    };
}