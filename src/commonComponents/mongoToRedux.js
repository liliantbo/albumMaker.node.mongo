export default function mongoToRedux(album){
    return {
      billing: {
        name: album.name,
        lastName: album.lastName,
        identificationNumber: album.identificationNumber,
        telephone: album.telephone,
        province: album.province,
        city: album.city,
        address: album.address
      },
      shipping: {
        copyFromBilling: false,
        name: album.nameS,
        lastName: album.lastNameS,
        identificationNumber: album.identificationNumberS,
        telephone: album.telephoneS,
        province: album.provinceS,
        city: album.cityS,
        address: album.addressS
      },
      albumId: album._id,
      imageList: [null, null, null, null, null, null],
      imageUrlList: album.imageUrlList,
      template: album.template,
      estado: album.estado,
      userEmail: album.userEmail,
      fecha: album.fecha,
      operador: album.operador,
      courier: album.courier,
      motivoCancelacion: album.motivoCancelacion
    };
  };