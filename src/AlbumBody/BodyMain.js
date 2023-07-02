import React from 'react';
import { useSelector } from 'react-redux';
import {
    OPTION_ALBUM, OPTION_BILL,
    OPTION_RESUME, OPTION_CREATE,
    FLOW_PROCESED,
    FLOW_SAVED
} from '../commonComponents/Properties'

//componente de barra de progreso
import ProgressBar from "../commonComponents/ProgressBar"

//compontentes de Album
import AlbumEditor from '../Album/AlbumEditor';
import AlbumViewer from '../Album/AlbumViewer';

//coponentes de Facturacion
import BillingAndShipping from '../BillingAndShipping/BillingAndShipping';
import BillingViewer from '../BillingAndShipping/BillingViewer';

//componentes de Pedido
import OrderResume from '../Resume/OrderResume';

export default function Main() {

    //redux store
    const selectedOption = useSelector(state => state.alb.selectedOption);
    const flow = useSelector(state => state.alb.flow);
    const isProcessedFlow = flow === FLOW_PROCESED || flow === FLOW_SAVED;

    //renderizar de acuerdo al estado del flujo 
    //y a la opcion del menu donde se encuentra el usuario
    const renderContent = () => {
        switch (selectedOption) {
            case OPTION_ALBUM:
                return isProcessedFlow ? <AlbumViewer /> : <AlbumEditor />;
            case OPTION_BILL:
                return isProcessedFlow ? <BillingViewer /> : <BillingAndShipping />;
            case OPTION_RESUME:
                return <OrderResume />;
            case OPTION_CREATE:
                return <AlbumEditor />;
            default:
                return null;
        }
    };

    return (
        <>
            <main className="w-100 scrollable-div pb-1">
                {!isProcessedFlow && <ProgressBar />}
                {renderContent()}
            </main>
        </>
    );
}
