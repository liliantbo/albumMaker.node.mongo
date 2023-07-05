//constantes de usuario
export const ROL_USER="USUARIO";
export const ROL_OPERATOR="OPERADOR";
export const ROL_ADMIN="ADMIN";

//constantes de estados del album
export const STATE_SENDED="ENVIADA";
export const STATE_DISPATCH="EN DESPACHO";
export const STATE_DELIVERED="ENTREGADA";
export const STATE_RETURNED="DEVUELTA POR COURIER";
export const STATE_CANCELED="CANCELED";
export const STATE_DELETED="DELETED";

//valores que puede tomar el estado flow
export const FLOW_LIST = 'list';
export const FLOW_NEW = 'new';
export const FLOW_BILLING ='onBilling';
export const FLOW_PROCESS='onProcess';
export const FLOW_PROCESED='processed';
export const FLOW_SAVED='processedAndSaved';

//valores que puede tomar es estados selectedOption
export const OPTION_ALBUM='album';
export const OPTION_BILL='bill';
export const OPTION_RESUME='resume';
export const OPTION_CREATE='createNewAlbum';

//valores que puede tomar el tema
export const THEME_LIGHT='light';
export const THEME_DARK='dark';

//modelos de template
export const TEMPLATE_BIRTHDAY='birthday';
export const TEMPLATE_LOVE='love';
export const MAX_TEMPLATE_SIZE=6;

//messajes de exito
export const MESSAGE_PROCESSED='Album no almacenado en MONGO';
export const MESSAGE_SAVED='Album almacenado en MONGO exitosamente';

//valores de admin
export const PAGE_ALBUM="albumPage";
export const PAGE_STATISTICS="statisticsPage";