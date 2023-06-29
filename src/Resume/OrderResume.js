import React from 'react';
import axios from "axios";
import { format } from 'date-fns';

import { useSelector, useDispatch } from 'react-redux';
import { processComplete, saveComplete } from '../reducers/albumActions';
import { FLOW_PROCESED, FLOW_SAVED } from '../commonComponents/Properties';


import BillingViewer from '../BillingAndShipping/BillingViewer';
import AlbumViewer from '../Album/AlbumViewer';
import ProcessCompleteMessage from './ProcessCompleteMessage';
import SaveToS3 from '../Aws/SaveToS3';

export default function OrderResume() {

  //redux store
  const flow = useSelector(state => state.alb.flow);
  const albumData = useSelector(state => state.alb);
  const isProcessedFlow = flow === FLOW_PROCESED || flow === FLOW_SAVED;

  //redux reducer
  const dispatch = useDispatch();
  const addAlbum = async () => {
    console.log('OrderResume :: AddAlbum :: albumState: ', albumData);
    const currentDate = format(new Date(), 'yyyyMMddHHmmss');
    const newAlbum = {
        "userEmail": albumData.userEmail,
        "fecha": currentDate,
        "identificationNumber": albumData.billing.identificationNumber,
        "name": albumData.billing.name,
        "telephone": albumData.billing.lastName,
        "city": albumData.billing.city,
        "address": albumData.billing.address,
        "identificationNumberS": albumData.shipping.identificationNumber,
        "nameS": albumData.shipping.name,
        "telephoneS": albumData.shipping.telephone,
        "cityS": albumData.shipping.city,
        "addressS": albumData.shipping.address,
        "imageUrlList":null,
        "template": albumData.template,
        "estado": albumData.estado,
        "operador": albumData.operador,
        "courier": albumData.courier,
        "motivoCancelacion": albumData.motivoCancelacion
        };
        const uploadedUrls = await SaveToS3(albumData.imageList);
        newAlbum.imageUrlList = uploadedUrls;
        
        console.log('OrderResume :: AddAlbum :: albumNew: ', newAlbum);
        
    return axios
      .post("http://localhost:3000/clients/album", { newAlbum })
      .then((response) => {
        console.log('Data:', response);
        console.log("OrderResume :: handleOnClick :: Album almacenado exitosamente");
        dispatch(saveComplete());
      })
      .catch((error) => {
        console.log('Error:', error);
        dispatch(processComplete());
      });
  };
  return (
    <div className="d-flex flex-column">
      <main className="d-flex flex-column">
        <div className="d-flex flex-row justify-content-center my-1">
          <div className="w-50">
            <AlbumViewer />
          </div>
          <div className="w-50">
            <BillingViewer />
          </div>
        </div>
        {isProcessedFlow ?
          <ProcessCompleteMessage /> : (
            <div className="row">
              <button type="button" className="m-3 p3 
                  btn btn-primary w-25 mx-auto align-bottom scroll-to-top"
                onClick={() => addAlbum()}>Finalizar Pedido</button>
            </div>
          )}
      </main>
    </div>
  );
}