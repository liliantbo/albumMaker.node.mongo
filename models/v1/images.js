const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'ASIATIFAYCUFYEATVAWV',
    secretAccessKey: 'EX8b583BayLaNm3LN/frhGFjehe4qk9vy4Xv/YZv',
    region: 'us-east-1',
    sessionToken: 'FwoGZXIvYXdzEEQaDAbZIU/ziNOC2A6mGSLBAXhbnaf6Kqcjg3EIz90WHRXS+2Evw9TPwkxNCID+9j2Bszsg6Qxbbu6TX4//v/So/SWDunuQ/LxrgKPIradvEvAk/tG++TbrPYHbl7Stu7AIm8KfQU3DCmXKhHivRfw8Yb4G1dvBBxzpYPG147fZv5zBAuEpt/8KPNzTgJ7dX5UEN3SnKnkLOnB96Hjs6vl8rO1IKlU0FI81cUDkpZd6QJ9hY7pQqMf062OH9xFj0AtcuvYMmytN+Zze3ywrXNRIPboo9pSxpQYyLQBJSHQR66QgsKlZH8nx0XM1hrPJoLtIeErATjLbvEEPY2QExmVRiH6qE6oYAg=='
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