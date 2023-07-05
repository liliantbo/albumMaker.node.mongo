import AWS from 'aws-sdk';

export default async function SaveToS3(imageList) {

        let s3=null;
        AWS.config.update({
            accessKeyId: 'ASIATIFAYCUF2PBC5OFS',
            secretAccessKey: '5HbAt610cYsOaPBb7k8G0I1ubVuk1Lyq9nvvQO+g',
            region: 'us-east-1',
            sessionToken: 'FwoGZXIvYXdzEL3//////////wEaDLU4LlaH3/uQ6m2T6CLBAf6WuibC6YwRZ56eFixqb/v1sCy2Xsgs1VPwDIQa4G2jkI1SXE3b8tYNBMx3jWT7t56eRLmW4TTDw3tpn/Sw6OqFoxKGGS8YFGKWKELSOcgsIVbGVboe8xdJORH/iUk60ZC3Gsq546DTm4PBk3esPcq5yNonA+JiWy7dQNt+TO0hc0Sneq/OsBMznMXKUXPZ46iYw50+lGjcLGXhVseJ26pTbPU1Fhh6BEuv8xEMgmtUbsc8PpXqHv5ceA/D4VXZn5koxsSTpQYyLdCOqyp9/GDmlcypQLt2jSa6o0dUi6L0mRmi/gfTxz3W0zidswfySuV4wPvdSg=='
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