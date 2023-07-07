import {
    FLOW_BILLING, FLOW_NEW, FLOW_PROCESED,
    FLOW_PROCESS, FLOW_SAVED, OPTION_ALBUM, OPTION_BILL,
    OPTION_RESUME, TEMPLATE_BIRTHDAY, TEMPLATE_LOVE,
    FLOW_LIST, STATE_SENDED
} from "../commonComponents/Properties";

const initialState = {
    flow: FLOW_LIST,
    selectedOption: OPTION_ALBUM,
    albumList: [],
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
    imageUrlList: [],
    estado: STATE_SENDED,
    id: '',
    userEmail: '',
    fecha: null,
    operador: '',
    courier: '',
    motivoCancelacion: ''
};

export function albumReducer(state = initialState, action) {
    console.log("AlbumReducer :: Action :: Type: ", action.type);
    console.log("AlbumReducer :: State :: Flow: ", state.flow);
    console.log("AlbumReducer :: State :: SelectedOption: ", state.selectedOption);
    console.log("AlbumReducer :: Action :: action: ", action);
    console.log("AlbumReducer :: Action :: state: ", state);
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
            };
        case 'saveComplete':
            return {
                ...state,
                flow: FLOW_SAVED,
            };
        case 'newAlbum':
            return {
                ...initialState,
                userEmail: action.payload.email,
                albumList: action.payload.albums,
                flow: FLOW_NEW,
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
                ...initialState,
                albumList:action.actualAlbumList
            };
            case 'editAlbum':
                return {
                    ...state,
                    ...action.newAlbum,
                    flow: FLOW_NEW,
                    selectedOption: OPTION_ALBUM,
                };
        case 'updateAlbumList':
            return {
                ...state,
                albumList: action.newAlbumList,
            };
        case 'changeCourier':
            return {
                ...state,
                courier: action.newCourier,
            };
        default:
            return state;
    }
};

export default albumReducer;
