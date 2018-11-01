import { Brochure } from './download/brochure.interface';
import { CadData } from './download/cad-data.interface';
import { BimModel } from './download/bim-model.interface';
import { BimModelCategory } from './download/bim-model-category.interface';
import { FileModel } from './download/file-model.interface';
export interface Download {
    brochures?: Brochure[];
    cadData?: CadData[];
    bimModels?: BimModel[];
    bimModelCategories?: BimModelCategory[];
    certificates?: FileModel[];
    tenderText?: FileModel[];
}
