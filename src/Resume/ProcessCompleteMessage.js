import React from 'react';
import { useSelector } from 'react-redux';
import { FLOW_SAVED, MESSAGE_PROCESSED, MESSAGE_SAVED } from '../commonComponents/Properties';


export default function ProcessSuccess () {
  //redux store
  const flow = useSelector(state => state.alb.flow);
  const isProcessedAndSaved=flow===FLOW_SAVED;
  return (
    <div className="alert alert-success d-flex flex-column justify-content-center m-2" role="alert">
      <p>¡Gracias por tu compra!</p>
      <p className='fs-6, fst-italic'>{isProcessedAndSaved?MESSAGE_SAVED:MESSAGE_PROCESSED}</p>
    </div>
  );
}
