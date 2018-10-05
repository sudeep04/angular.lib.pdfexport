import { DownloadValue } from './download-value.interface';

export interface DownloadList {
    type: string;
    label: string;
    listValues: DownloadValue[];
}
