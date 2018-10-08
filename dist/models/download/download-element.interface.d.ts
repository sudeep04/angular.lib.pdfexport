import { DownloadValue } from './download-value.interface';
export interface DownloadElement {
    type: string;
    label: string;
    singleValue?: DownloadValue;
    listValues?: DownloadValue[];
}
