import React from "react";

import { useSelector, useDispatch } from 'react-redux';
import { changeToBirthdayTemplate, changeToLoveTemplate } from "../reducers/albumActions";
import {
    FLOW_PROCESED, FLOW_SAVED, OPTION_ALBUM,
    TEMPLATE_BIRTHDAY, TEMPLATE_LOVE
} from "../commonComponents/Properties";


import AlbumTemplateBirthday from './AlbumTemplateBirthday'
import AlbumTemplateLove from "./AlbumTemplateLove";



export default function AlbumTemplate({ children }) {
    //redux store
    const selectedOption = useSelector(state => state.alb.selectedOption);
    const flow = useSelector(state => state.alb.flow);
    const template = useSelector(state => state.alb.template);
    const isBirthdayTemplate = template === TEMPLATE_BIRTHDAY;
    const isLoveTemplate = template === TEMPLATE_LOVE;
    const isProcessedFlow = flow === FLOW_PROCESED || flow === FLOW_SAVED;
    const isAlbumSelected = selectedOption === OPTION_ALBUM;

    //redux reducer
    const dispatch = useDispatch();
    const changeTemplateHandler = (option) => {
        switch (option) {
            case TEMPLATE_BIRTHDAY:
                return dispatch(changeToBirthdayTemplate());
            case TEMPLATE_LOVE:
                return dispatch(changeToLoveTemplate())
            default:
                return dispatch(changeToBirthdayTemplate());

        }
    };

    return (
        <div className="d-flex flex-column w-100">
            {(!isProcessedFlow && isAlbumSelected) ? (
                <div className="d-flex flex-row mx-3">
                    <p className="me-1">Elija su template</p>
                    <div className="me-2">
                        <input type="radio"
                            id="inlineRadio1"
                            value={TEMPLATE_BIRTHDAY}
                            checked={isBirthdayTemplate}
                            onChange={() => changeTemplateHandler(TEMPLATE_BIRTHDAY)}
                        />
                        <label htmlFor="inlineRadio1">Birthday</label>
                    </div>
                    <div className="me-2">
                        <input type="radio"
                            id="inlineRadio2"
                            value={TEMPLATE_LOVE}
                            checked={isLoveTemplate}
                            onChange={() => changeTemplateHandler(TEMPLATE_LOVE)} />
                        <label className="form-check-label" htmlFor="inlineRadio2">Love</label>
                    </div>
                </div>
            ) : ""}
            <>
                {isBirthdayTemplate && <AlbumTemplateBirthday>{children}</AlbumTemplateBirthday>}
                {isLoveTemplate && <AlbumTemplateLove>{children}</AlbumTemplateLove>}
            </>
        </div>
    )

}
