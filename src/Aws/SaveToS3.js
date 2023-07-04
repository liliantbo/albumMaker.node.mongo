import AWS from 'aws-sdk';

export default async function SaveToS3(imageList) {

        let s3=null;
        AWS.config.update({
            accessKeyId: 'ASIATIFAYCUFVJXB2A6S',
            secretAccessKey: 'AJfJLOZ8wqq/jTwDJ1kcTGs18ktx6tazVcXAeGE6',
            region: 'us-east-1',
            sessionToken: 'FwoGZXIvYXdzEKb//////////wEaDL0M0+fk8+6CmjQCYCLBAYeZ95k4HX7q9t0+kNi+yQhiHFQtO7xLqsjbTmWkB9g2wakwX7cdug8swHhFVCgrxYXHLUxpZaQhG/AxnlKBFMpSj1U6xuk4nB1T2F48gJxmvfPJKOvQ7aagntBXiuWCkmLN3Gkio3iUctBCiuXKshrjr4ihm6sc/XF9o5duNZNXCJjd2ITkOKfHf2NIO9DFTnjPyDd5/gYahQxFcEJSUH+xlIF9I8Q2PPxW5zl1WLsb8nkA75YaeMU8vTWYGMDQd7korcaOpQYyLWw+TS1YRKc79I0V1u2Cr+1Jxq+qNEdkq+7/QCwAHtAv1ZjIvzrKhNxr61L/9w=='
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