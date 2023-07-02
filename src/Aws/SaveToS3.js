import AWS from 'aws-sdk';

export default async function SaveToS3(imageList) {

        let s3=null;
        AWS.config.update({
            accessKeyId: 'ASIATIFAYCUF677IPY5N',
            secretAccessKey: 'NddiK4q6rHWoeQq6ZTkpjTadQrIMmCEosKJPJSLQ',
            region: 'us-east-1',
            sessionToken: 'FwoGZXIvYXdzEHEaDG73nfZX3uWz64m85SLBAVRX/LTLxe63bVkp+HTkHNzY9J6vwa1sf6MDk6jH/O0jVUvTDlzGNZY/0GEPPybG1ggGYrbX+9DSitxyI5Bk0nWlDs2k2Jr95A+UBgyR7JfNOEMkFsaFc7DQ9i23uWgqfFNPLW2KBoxenTnqNzP5WYtlvtX2N7E2QZqR1x6GEqdWM65T92pAOuDwRmGQrX7+g3GKxcsDJuGqQDEDi0n5u5v4fsBuIcgavsKh7hsH3B4m4sXhoB21Tnh7S6Jyn4YqmkEo2OiCpQYyLYCpHqcCepvEz34zMYKKbf4EK0DiyYbKgwpddB8rhDg8VGKvGNP0zmRzFobJag=='
        });
        try {
            s3 = new AWS.S3();
        } catch (error) {
            console.log("SaveHandler :: S3 :: Error estableciendo conexion con el S3 ")
        }
        const uploadToS3 = async (file) => {
            if (!file) {
                return;
            }
            const params = {
                Bucket: 'albummaker',
                Key: `${Date.now()}.${file.name}`,
                Body: file
            };
            try {
                const { Location } = await s3.upload(params).promise();
                console.log('cargando a s3', Location);
                return Location;
            } catch (error) {
                console.log("SaveHandler :: uploadingS3 :: Error al ejecutar el uploadToS3")
                throw(error);
            }
        }

        let imageUrlList = imageList.filter((e) => e != null);


        const uploadPromises = imageUrlList.map(async (element) =>
                 await uploadToS3(element.file));
        
        const uploadedResults = await Promise.all(uploadPromises);
        const uploadedUrls = uploadedResults.filter((result) => result !== null);

        if (uploadedUrls.length === 0) {
            throw new Error("SaveHandler :: S3 :: No se pudo cargar ninguna imagen a S3");
        }
        return uploadedUrls;
}