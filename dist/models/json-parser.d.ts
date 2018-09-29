import { Data } from './data';
import { Settings } from './settings.interface';
export declare abstract class JsonParser {
    static parseData(jsonData: any): Data;
    static parseDataProduct(jsonData: any): Data;
    static parseSettings(settings: any): Settings;
    private static _parseProduct(jsonproduct, data, settings);
}
