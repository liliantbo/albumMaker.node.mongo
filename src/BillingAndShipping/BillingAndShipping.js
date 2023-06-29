import { useSelector, useDispatch } from 'react-redux';
import { billingComplete } from '../reducers/albumActions';
import { FLOW_BILLING } from "../commonComponents/Properties";

import BillingAndShippingForm from './BillingForm';


export default function BillingAndShipping() {
  //redux store
  const flow = useSelector(state => state.alb.flow);
  const isBillingFlow=flow===FLOW_BILLING;

  //redux reducer
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    dispatch(billingComplete());
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="d-flex justify-content-center my-2">
        <div className="col-10">
          <form onSubmit={handleSubmit}>
            <BillingAndShippingForm />
            <div className="row">
              <button type="submit" className={`m-3 p3 
                btn w-25 mx-auto align-bottom ${isBillingFlow?"btn-primary":"btn-secondary"}`}
                disabled={!isBillingFlow}
              >Resumen del Pedido</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
