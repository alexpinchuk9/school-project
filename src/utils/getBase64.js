import resize from "./resizeImage";

const getBase64 = (file, onLoadCallback) => {
    return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        reader.onload = function() {
            let promise = resize(reader.result);
            promise.then(result => resolve(result));
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default getBase64;
