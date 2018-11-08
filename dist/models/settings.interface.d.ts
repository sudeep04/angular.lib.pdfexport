export interface Settings {
    logo: {
        show: boolean;
        type: 'text' | 'url';
        data: string;
    };
    showProductsImage: boolean;
    productsImageApiPath: string;
    captions: {
        project: string;
        bearbeiter: string;
    };
    translations: {
        layout: {
            page: string;
            date: string;
            supplierName: string;
        };
        downloadTypes: {
            brochure: string;
            cadData: string;
            bimModels: string;
        };
        booleanValues: {
            true: string;
            false: string;
        };
    };
    sorting: 'asc' | 'dsc';
    unitsBeforeValue: string[];
    applyFilters: boolean;
    showHighlights: boolean;
    placeholderUrl?: string;
    fileName: string;
}
