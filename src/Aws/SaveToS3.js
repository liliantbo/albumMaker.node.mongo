import AWS from 'aws-sdk';

export default async function SaveToS3(imageList) {

        let s3=null;
        AWS.config.update({
            accessKeyId: 'ASIATIFAYCUF3IBICRQ3',
            secretAccessKey: 'vAOhlWvombxKP1lkw4YOIrDilCfx/NcB9OsY9/aR',
            region: 'us-east-1',
            sessionToken: 'FwoGZXIvYXdzEMz//////////wEaDMFJBFsVgISTpg5VaSLBAaR+iGSRIaPeTl8o4fjlMarFXkE3x9FCt30X2KbifGxS+9MzZ7G/JXrSOU6/YYF6uKJxO/Mz+I7oQo+5YU9zafxrkXpnNTfiKqkfnhE41FMSSZPu8oYKZ3+h/t9JF4M4MPGROFBKHYjhPDQGEa+skQu/1ldjEXFy00xtEeVTG9KnMA/H0pZpb/OvWquSdzwhXdbN20T3ehLD9yKVikvIs1s49rMsvceaS7ma808OfEvoESHv6oJ1On7tm83Kw+ClWUIomfOWpQYyLdJtJqmmNv8U/5Ke02mLjEWPxMdTByjI9csUEPROsPFhvEsy8CFuFzMazSjC7A=='
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