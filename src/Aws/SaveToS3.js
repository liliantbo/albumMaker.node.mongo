import AWS from 'aws-sdk';

export default async function SaveToS3(imageList) {

        let s3=null;
        AWS.config.update({
            accessKeyId: 'ASIATIFAYCUFUO2YUKKK',
            secretAccessKey: 'OdnitHQ+vn5cxR3fKHZI1dPGkKY8FuEqE3kTfsfn',
            region: 'us-east-1',
            sessionToken: 'FwoGZXIvYXdzEFcaDDZ/pfjgairfdhMLCSLBAWDLEA6bCciXyAggIYWu6uU62Gmq1poF5U7c9ealDIUZpkV1VJEXot41iCRheEdsrqXkVBgZqRvTJaYxdh2xVbMGZ/PCdwfY7uPburyH4GUMHJnLTMvOmRskihAuaSoAO3K5c8DdorSViyAVO2RwECyvEIa1kDZU1X0k4RsPeeSenXnY4FhG7gT+xuXgU4PEkj+wDY2is6pjW84fwl5jsD/qcsMEXGeeB0Q6F9JJy2oH+qAZ/TGbZEpQF4QdcG1A72Aoh5/9pAYyLf7rc5yQQQ8f/22d0wgRL+uakhYq0RLWfr7khP7ENw/KxiiaFdi7jvezMT+X0g=='
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