const resize = (src) => {
    const MAX_HEIGHT = 256;
    return new Promise(function(resolve, reject) {
        let image = new Image();

        image.onload = function(){
            let canvas = document.createElement('canvas');
            if(image.height > MAX_HEIGHT) {
                image.width *= MAX_HEIGHT / image.height;
                image.height = MAX_HEIGHT;
            }
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            let result = canvas.toDataURL("image/jpeg");
            resolve(result);
        };
        image.src = src;
    })

};

export default resize;
