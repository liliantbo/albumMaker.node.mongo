const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'ASIATIFAYCUFRPXWR655',
  secretAccessKey: 'KAHXia/W5fg6FpRIJL3Ma8wxK/RnPiU6QqqC1Og4',
  region: 'us-east-1',
  sessionToken:'FwoGZXIvYXdzECkaDK9QwSraWdaHfsWDDyLBAR4da6K1sbCeTyULogqLes84N7KJvAMCdgmXKYr2VYDI78wCSEOPmtRh5uX1XKPELsI1SzLHecULw7sMndgVopGtp9jMiZLI53YMtM+ofOMxt+VdTPDCnYfuSm/pnmHqrLSI6cjYR1LtAo8alur2/YmQzKo+i0M+wQqwz+B1r0n12hR9JWHORirsMhtWZoJX0Ot7KTTh6T10daYhoRNw4Pmv8URNDsymVeeJ+BLrzTsFlmotOohmjfxQpJo4yyW5cpMoooPzpAYyLV2y99YBCQMc+iAI8QqIEbCbXYrw0n7EVWsjotoKfyjzsAi4qbgFaqFf7hnkOw=='
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