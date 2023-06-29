import { useSelector } from 'react-redux';
import { OPTION_BILL, THEME_DARK } from '../commonComponents/Properties'

export default function BillingViewer() {
  //redux store
  const billing = useSelector(state => state.alb.billing);
  const shipping = useSelector(state => state.alb.shipping);
  const selectedOption = useSelector(state => state.alb.selectedOption);
  const theme = useSelector(state => state.auth.theme);
  const isBillSelected = selectedOption === OPTION_BILL;
  const isDarkTheme = theme === THEME_DARK;

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className={`d-flex ${isBillSelected ? "flex-row" : "flex-column"}`}>
        <div>
          <div className={`card my-1 mx-1 text-start ${isDarkTheme ? "text-white bg-dark" : "text-dark bg-light"}`}>
            <div className="card-header">
              <h3 className="card-title">Datos de Facturación</h3>
            </div>
            <div className="card-body">
              <p className="card-text">Nombre: {billing.name} {billing.lastName}</p>
              <p className="card-text">CI/RUC: {billing.identificationNumber}</p>
              <p className="card-text">Teléfono: {billing.telephone}</p>
              <p className="card-text">Dirección: {billing.province}
                {billing.city}-{billing.address}</p>
            </div>
          </div>
        </div>
        <div>
          <div className={`card my-1 mx-1 text-start ${isDarkTheme ? "text-white bg-dark" : "text-dark bg-light"}`}>
            <div className="card-header">
              <h3 className="card-title">Datos de Envío</h3>
            </div>
            <div className="card-body">
              <p className="card-text">Nombre: {shipping.name} {shipping.lastName}</p>
              <p className="card-text">CI/RUC: {shipping.identificationNumber}</p>
              <p className="card-text">Teléfono: {shipping.telephone}</p>
              <p className="card-text">Dirección: {shipping.province}
                {shipping.city}-{shipping.address}</p>                </div>
          </div>
        </div>
      </div>
    </div>
  );
}
