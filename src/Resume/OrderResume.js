import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { processComplete, saveComplete } from '../reducers/albumActions';
import { FLOW_PROCESED, FLOW_SAVED } from '../commonComponents/Properties';


import BillingViewer from '../BillingAndShipping/BillingViewer';
import AlbumViewer from '../Album/AlbumViewer';
import ProcessCompleteMessage from './ProcessCompleteMessage';
import SaveHandler from '../Aws/SaveHandler';


export default function OrderResume() {

  //redux store
  const flow = useSelector(state => state.alb.flow);
  const album = useSelector(state => state.alb.album);
  const isProcessedFlow = flow === FLOW_PROCESED || flow === FLOW_SAVED;

  //redux reducer
  const dispatch = useDispatch();
  const handleOnClick = async () => {
    try {
      await SaveHandler(album);
      console.log("OrderResume :: handleOnClick :: Album almacenado exitosamente");
      dispatch(saveComplete());
    } catch (error) {
      console.log("OrderResume :: handleOnClick :: Error al almacenar el album");
      dispatch(processComplete());
    }
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
                onClick={() => handleOnClick()}>Finalizar Pedido</button>
            </div>
          )}
      </main>
    </div>
  );
}