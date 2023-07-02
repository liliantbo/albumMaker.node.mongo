import React, { useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { updateCourierList } from '../reducers/adminActions';
import { STATE_DISPATCH } from "./Properties";

export default function CourierList({ album, onCourierChange }) {
    //redux store
    const courierList = useSelector(state => state.adm.courierList);

    //redux reducer
    const dispatch = useDispatch();

    const courierHandler = (newCourier) => {
        console.log("CourierList :: CourierHandler :: newCourier ", newCourier);
        onCourierChange({
            ...album,
            courier: newCourier,
            estado: STATE_DISPATCH,
        });
    };

    useEffect(() => {
        axios.get("http://localhost:3000/couriers")
            .then((response) => {
                const courierListMongo = response.data;
                console.log("ALbumMakerAdmin :: CourierList :: useEffect :: response: ", response);
                console.log("ALbumMakerAdmin :: CourierList :: CourierListMongo: ", courierListMongo);
                dispatch(updateCourierList(courierListMongo));
            })
            .catch((error) => {
                console.error("ALbumMakerAdmin :: CourierList :: useEffect :: error: ", error);
            });
    }, []);

    return (
        <DropdownButton id="dropdown-basic-button" title="Seleccionar Courier">
            {courierList && courierList.map((courier, index) => (
                <Dropdown.Item key={index}
                    onClick={() => courierHandler(courier.name)}
                >{courier.name}</Dropdown.Item>
            ))}
        </DropdownButton>
    );
}
