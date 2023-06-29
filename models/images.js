const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'ASIATIFAYCUFWG4YMQMJ',
  secretAccessKey: 'lYvCQ7ms979Zj6f0W4NPeQPRABxWcofKuH5vJnwl',
  region: 'us-east-1',
  sessionToken:'FwoGZXIvYXdzEC4aDP1vzHVhmxkvTQmUGCLBAZxPaMoVu+mibAZggm2XMGM+7Y+bTpuuq48WpucU8xpySNU/NTVPO6blhtUnC9+LAwyYbZ6YunUKByAHR/J9JfynP0J6ppgtbzNKpbSFbROpVWKioVoZ/Cz2llE5sgXfPtWm8ciR/hrWQcfNgJGAY5brVK5ojB4tIbbjI+MMjEFRCLwxF9AqZib3uOWM9m5QE4u6hSiKyg83NXdm4OdXTqc+4sdZ4+qPLyn4lmB3PBj8gZ3osi/JoiV8K+MlcLEFB9komJb0pAYyLRMW1xvjwDznwLjhvu2+skT0URLjBLVhKA4+V9pnR3xJDhOV7V/4XVeikVH0SA=='
});

const s3 = new AWS.S3();

const uploadToS3 = async (file, fileName) => {
  if (!file) {
    return;
  }

  const params = {
    Bucket: 'albummaker',
    Key: `${fileName}-${Date.now()}`,
    Body: file
  };

  try {
    const { Location } = await s3.upload(params).promise();
    console.log('Imagen cargada en S3:', Location);
    return Location;
  } catch (error) {
    console.log('Error al cargar la imagen en S3:', error);
    throw error;
  }
};

module.exports = uploadToS3;