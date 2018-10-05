import { DownloadValue } from './download-value.interface';

export interface DownloadSingle {
    type: string;
    label: string;
    singleValue: DownloadValue;
}
