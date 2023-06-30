import AWS from 'aws-sdk';

export default async function SaveToS3(imageList) {

        let s3=null;
        let dynamo =null;
        AWS.config.update({
            accessKeyId: 'ASIATIFAYCUFUUZN7CMQ',
            secretAccessKey: 'AMmgMltZ4SjMQ8G7LOD9o4jRaHD07AVW35GWvyFj',
            region: 'us-east-1',
            sessionToken: 'FwoGZXIvYXdzEEYaDA+CTpPan70efWtK4CLBAS0q+rr6PkUGAUi9sg5tZrQztwGE45c1mGcez9snXarzjAZRCKCrFD9z7xeZvcnGjv9EkH9abA71CrWCXhyaZYbKuXx1vUbvho2a/XG0Di8G9Q/B4VYSSRBX8IQ1vWbeY9Ds/C8fyqpWuXHLdPqbctbfidu6alUfAsCK/gU1WQ7slXDg+rUn6WY9NdGofmUzM2/SuKV/a9i8aQdq8eSEoZ5ag8doRHFG0l2DAHYeds494OznokcSdXz9WVCQybr3bsco9qn5pAYyLZKqea88LtRu3ihklYcYJnn/VN8MlKHqZBfzbUAKhxvi2HSF+6fDZ/pAQcMIOw=='
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