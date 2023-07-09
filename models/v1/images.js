const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'ASIATIFAYCUFZTKJXA5F',
    secretAccessKey: 'JGIzcsXYpABPmgYN1bUgsVeSmW7yGtcNcPCU8UWR',
    region: 'us-east-1',
    sessionToken: 'FwoGZXIvYXdzEB8aDHB9Xtzei6WaI8KKayLBARLnU523vaMxR7TTtJ4ep4yUQM1MlkbTDMZgdZmDMdJayxlcytG+qGPpXCQpZ+sMmojUVfCf6sjtvD1lfaWuEgYIRhleZau6fge6EqXO4qNd/ZUUNoFG6NyCofmk7HVq5/bAKJc7aOfxGKoj1p2p5sCPI/6jj0wS9+F+IrIAN/h1+DOMSwfDQYT5UjrvX5DYvBdIZC8QJnOZpOBt8gWy6RJ70adzRosklMUx9y9jbCbugi7avhjsgbIaOvEpPicVMCwowoappQYyLS4gAoe74uJAbt+vkrGprv9A3jrCx6S1U2eIxEqK5LBKlA8ZuTQrus8Sm6iujw=='
});

const s3 = new AWS.S3();

const uploadToS3 = async ({ imageListNew, imageUrlList }, cb) => {
    console.log("Models :: Images :: uploadToS3 :: imageListNew: ",
        imageListNew && imageListNew.length,
        "imageUrlList: ", imageUrlList && imageUrlList.length);
    if (!imageListNew || imageListNew.length == 0) {
        return cb("Models :: Images :: uploadToS3 :: Error al ejecutar el uploadToS3");
    }

    for (const image of imageListNew) {
        const { file, index } = image;
        const base64Data = file.item;
        const newFile = new Buffer.from(base64Data.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const type = base64Data.split(';')[0].split('/')[1];

        console.log("contenido de file: ", file)
        console.log("contenido de file.file : ", newFile)
        console.log("Models :: Images :: uploadToS3 :: Cargando a S3 index: ", index, "file: ", newFile);
        const params = {
            Bucket: 'albummaker',
            Key: `${Date.now()}.${newFile.name}`,
            Body: newFile,
            ContentEncoding: 'base64', 
            ContentType: `image/${type}`
        };
        try {
            const { Location } = await s3.upload(params).promise();
            console.log("Models :: Images :: uploadToS3 ::", index, "Url obtenida de s3", Location);
            if (imageUrlList && index < imageUrlList.length) {
                console.log("actualizando urlList")
                imageUrlList[index] = Location;
            } else {
                console.log("agregando nueva imagen");
                imageUrlList.push(Location);
                console.log("nueva imagen agregada");

            }
           
        } catch (error) {
            console.log("Models :: Images :: uploadToS3 :: Error al ejecutar", index, " el uploadToS3", error)
            return cb(error);
        }
    }
    return cb(null, imageUrlList);

};

module.exports = uploadToS3;