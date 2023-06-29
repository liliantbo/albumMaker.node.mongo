import AWS from 'aws-sdk';
import { format } from 'date-fns';

export default async function SaveToS3(imageList) {

        let s3=null;
        let dynamo =null;
        AWS.config.update({
            accessKeyId: 'ASIATIFAYCUFWG4YMQMJ',
            secretAccessKey: 'lYvCQ7ms979Zj6f0W4NPeQPRABxWcofKuH5vJnwl',
            region: 'us-east-1',
            sessionToken: 'FwoGZXIvYXdzEC4aDP1vzHVhmxkvTQmUGCLBAZxPaMoVu+mibAZggm2XMGM+7Y+bTpuuq48WpucU8xpySNU/NTVPO6blhtUnC9+LAwyYbZ6YunUKByAHR/J9JfynP0J6ppgtbzNKpbSFbROpVWKioVoZ/Cz2llE5sgXfPtWm8ciR/hrWQcfNgJGAY5brVK5ojB4tIbbjI+MMjEFRCLwxF9AqZib3uOWM9m5QE4u6hSiKyg83NXdm4OdXTqc+4sdZ4+qPLyn4lmB3PBj8gZ3osi/JoiV8K+MlcLEFB9komJb0pAYyLRMW1xvjwDznwLjhvu2+skT0URLjBLVhKA4+V9pnR3xJDhOV7V/4XVeikVH0SA=='
        });
        try {
            s3 = new AWS.S3();
        } catch (error) {
            console.log("SaveHandler :: S3 :: Error estableciendo conexion con el S3 ")
        }
        try {
            dynamo = new AWS.DynamoDB();
        } catch (error) {
            throw console.log("SaveHandler :: SDynamo :: Error estableciendo conexion con el Dynamo ")
        }
        if (s3==null ||dynamo==null){
            throw new Error("SaveHandler :: AWS ::No se pudo completar la conexion con AWS");
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