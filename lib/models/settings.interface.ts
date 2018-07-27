export interface Settings {

    logo: {
        show: boolean;
        type: 'text' | 'url';
        data: string;
    };

    showProductsImage: boolean;

    productsImageApiPath: string;

    captions: {

        architectureOffice: string;

        project: string;
    };

    sorting: 'asc' | 'dsc';

    unitsBeforeValue: string[];

    applyFilters: boolean;

    showHighlights: boolean;
}
