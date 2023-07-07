const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'ASIATIFAYCUFU2LA5LXG',
    secretAccessKey: 'e30JBI432zGL8M1XRkil/byCoQgVqDNqxSbu5q47',
    region: 'us-east-1',
    sessionToken: 'FwoGZXIvYXdzEP///////////wEaDP2kxsgengqQ4SPQXyLBAdbaYd9E20rWV8LgCJqPIT6hqUuE2NrO1C5QDBTEpqjFrqQTV//9oCgw0RCT5WX9/FnFeNfzozkv2k1n3T2YD6y5sEvhYBaIq+wBwOoXrLJngZHOQ4gWJ78t33bJHug4njwIz0aLI48L9/i1+7fAd/9e8jjF6F1mjAomhp3jgxfgn5UINLaQEA8LjgH9gp2AOftc+XJLXVhM1sBrsws+NLKfUGzLLH4Lcepp1zVMaY4KgoAwF5o6uKI13nUHBHmyYdEolf+hpQYyLXTTMAViXz3LqeI2VeC8ULzS5AtHyoWo2b6LrCmaxnlVcOw9V44zS77GdKCC+g=='
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
        //console.log(`Clave: ${key}, Valor: ${value}`);
        const params = {
            Bucket: 'albummaker',
            Key: `${Date.now()}.${newFile.name}`,
            Body: newFile,
            ContentEncoding: 'base64', // required
            ContentType: `image/${type}` // required. Notice the back ticks
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