import {
    FLOW_BILLING, FLOW_NEW, FLOW_PROCESED,
    FLOW_PROCESS, FLOW_SAVED, OPTION_ALBUM, OPTION_BILL,
    OPTION_RESUME, TEMPLATE_BIRTHDAY, TEMPLATE_LOVE,
    THEME_DARK, THEME_LIGHT, FLOW_LIST, STATE_SENDED
} from "../commonComponents/Properties";

const initialState = {
    flow: FLOW_LIST,
    selectedOption: OPTION_ALBUM,
    theme: THEME_LIGHT,
    template: TEMPLATE_BIRTHDAY,
    billing: {
        "name": '',
        "lastName": '',
        "identificationNumber": '',
        "telephone": '',
        "province": '',
        "city": '',
        "address": ''
    },
    shipping: {
        "copyFromBilling": false,
        "name": '',
        "lastName": '',
        "identificationNumber": '',
        "telephone": '',
        "province": '',
        "city": '',
        "address": ''
    },
    imageList: [null, null, null, null, null, null],
    imageUrlList: null,
    estado: STATE_SENDED,
    userEmail: '',
    fecha: null,
    operador: '',
    courier: '',
    motivoCancelacion: ''
};

export function albumReducer(state = initialState, action) {
    switch (action.type) {
        case 'goToAlbum':
            return {
                ...state,
                selectedOption: OPTION_ALBUM,
            };
        case 'goToBill':
            return {
                ...state,
                selectedOption: OPTION_BILL,
            };
        case 'goToResume':
            return {
                ...state,
                selectedOption: OPTION_RESUME,
            };
        case 'albumComplete':
            return {
                ...state,
                flow: FLOW_BILLING,
                selectedOption: OPTION_BILL,
            };
        case 'billingComplete':
            return {
                ...state,
                flow: FLOW_PROCESS,
                selectedOption: OPTION_RESUME,
            };
        case 'processComplete':
            return {
                ...state,
                flow: FLOW_PROCESED,
                selectedOption: OPTION_RESUME,
            };
        case 'saveComplete':
            return {
                ...state,
                flow: FLOW_SAVED,
                selectedOption: OPTION_RESUME,
            };
        case 'newAlbum':
            return {
                ...state,
                flow: FLOW_NEW,
                selectedOption: OPTION_ALBUM,
                userEmail: action.payload.email,
                fecha: null,
                imageList: [null, null, null, null, null, null],
                template: TEMPLATE_BIRTHDAY,
                estado: STATE_SENDED,
            };
        case 'changeTheme':
            const newTheme = state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
            return {
                ...state,
                theme: newTheme,
            };
        case 'birthdayTemplate':
            return {
                ...state,
                template: TEMPLATE_BIRTHDAY,
            };
        case 'loveTemplate':
            return {
                ...state,
                template: TEMPLATE_LOVE,
            };
        case 'updateImageList':
            return {
                ...state,
                imageList: action.newImageList,
            };
        case 'updateBilling':
            return {
                ...state,
                billing: action.newBilling,
            };
        case 'updateShipping':
            return {
                ...state,
                shipping: action.newShipping,
            };
        case 'listAlbums':
            return {
                ...state,
                flow: FLOW_LIST,
            };
        default:
            return state;
    }
};

export default albumReducer;
