import { Brochure } from './download/brochure.interface';
import { CadData } from './download/cadData.interface';
import { BimModel } from './download/bimModel.interface';
import { BimModelCategory } from './download/bimModelCategory.interface';

export interface Download {
    brochures?: Brochure[];
    cadData?: CadData[];
    bimModels?: BimModel[];
    bimModelCategories?: BimModelCategory [];
}
