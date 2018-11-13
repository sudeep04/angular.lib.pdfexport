import { DocConfig } from './doc-config';
import { Data } from './data';

export class IDocRenderer {

    protected _doc: any;

    protected _data: Data;

    protected _docConfig: DocConfig;

    public draw(jsonData: any, docConfig: DocConfig): void {
        // to be implemented
    }

    // load images
    protected _loadImages(index: number, input: string[], output: HTMLImageElement[], callback: any): void {

        let loaded: number = 0;

        input.forEach((url: string) => {
            const img = new Image();
            img.onload = (() => {
                setTimeout(waitForLoaded(img, 100), 100);
                if (loaded === input.length) {
                    callback(output);
                }
            });
            img.onerror = (() => {
                console.log('Error loading image:' + url);
                loaded++;
                output.push(img);
                if (loaded === input.length) {
                    callback(output);
                }
            });
            img.src = url;
            img.crossOrigin = 'anonymous';
        });

        const waitForLoaded = ((image: HTMLImageElement, total: number) => {

            if ((image.complete && image.naturalWidth !== 0 && image.naturalHeight !== 0 ) || (total > 30000)) {
                loaded++;
                output.push(image);
            } else {
                setTimeout(waitForLoaded(image, total + 100), 100);
            }
        });

    }

    // load dataUrls
    protected _toDataURL(urls: string[], callback: any, callback2: any): void {
        let loaded: number = 0;
        urls.forEach(( url: string, index: number) => {
            const xhr = new XMLHttpRequest();
            xhr.open('get', url);
            xhr.responseType = 'blob';
            xhr.onload = (() => {
                const fr = new FileReader();

                fr.onload = (() => {
                    urls[index] = fr.result.toString();
                    callLoaded();
                });

                fr.readAsDataURL(xhr.response);
            });
            xhr.onerror = (() => {
                callLoaded();
            });

            xhr.send();
        });

        const callLoaded = (() => {
            loaded++;
            if (loaded === urls.length) {
                callback(0, urls, [], callback2);
            }
        });
    }

    // replace characters
    protected _replaceCharacter( word: string): string {
        return word.replace(/ä/g, '\u00E4').replace(/ü/g, '\u00FC').replace(/ö/g, '\u00F6');
    }
}
