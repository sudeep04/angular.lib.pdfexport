var IDocRenderer = /** @class */ (function () {
    function IDocRenderer() {
    }
    IDocRenderer.prototype.draw = function (jsonData, docConfig) {
        // to be implemented
    };
    // load images
    // load images
    IDocRenderer.prototype._loadImages = 
    // load images
    function (index, input, output, callback) {
        var loaded = 0;
        input.forEach(function (url) {
            var img = new Image();
            img.onload = (function () {
                setTimeout(waitForLoaded(img, 100), 100);
                if (loaded === input.length) {
                    callback(output);
                }
            });
            img.onerror = (function () {
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
        var waitForLoaded = (function (image, total) {
            if ((image.complete && image.naturalWidth !== 0 && image.naturalHeight !== 0) || (total > 30000)) {
                loaded++;
                output.push(image);
            }
            else {
                setTimeout(waitForLoaded(image, total + 100), 100);
            }
        });
    };
    // load dataUrls
    // load dataUrls
    IDocRenderer.prototype._toDataURL = 
    // load dataUrls
    function (urls, callback, callback2) {
        var loaded = 0;
        urls.forEach(function (url, index) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', url);
            xhr.responseType = 'blob';
            xhr.onload = (function () {
                var fr = new FileReader();
                fr.onload = (function () {
                    urls[index] = fr.result.toString();
                    callLoaded();
                });
                fr.readAsDataURL(xhr.response);
            });
            xhr.onerror = (function () {
                callLoaded();
            });
            xhr.send();
        });
        var callLoaded = (function () {
            loaded++;
            if (loaded === urls.length) {
                callback(0, urls, [], callback2);
            }
        });
    };
    // replace characters
    // replace characters
    IDocRenderer.prototype._replaceCharacter = 
    // replace characters
    function (word) {
        return word.replace('�', '\u00E4');
    };
    return IDocRenderer;
}());
export { IDocRenderer };
//# sourceMappingURL=doc-renderer.interface.js.map