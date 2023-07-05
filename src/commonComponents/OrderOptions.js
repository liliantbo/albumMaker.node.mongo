import React, { useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { updateCourierList } from '../reducers/adminActions';
import { ROL_ADMIN, ROL_OPERATOR, STATE_CANCELED, STATE_DELETED, STATE_DISPATCH } from "./Properties";

export default function OrderOptions({ album, onCourierChange, onCancelChange, onDeleteChange }) {
    //redux store
    const courierList = useSelector(state => state.adm.courierList);
    const user = useSelector(state => state.auth.user);
    const { rol } = user
    const isOperador = rol === ROL_OPERATOR;
    const isAdmin = rol === ROL_ADMIN;

    //redux reducer
    const dispatch = useDispatch();

    const courierHandler = (newCourier) => {
        console.log("OrderOptions :: CourierHandler :: changeCourier to: ", newCourier);
        onCourierChange({
            ...album,
            courier: newCourier,
            estado: STATE_DISPATCH,
        });
    };
    const cancelHandler = () => {
        console.log("OrderOptions :: cancelHandler");
        onCancelChange({
            ...album,
            estado: STATE_CANCELED,
        });
    };
    const deleteHandler = () => {
        console.log("OrderOptions :: deleteHandler");
        onDeleteChange({
            ...album,
            estado: STATE_DELETED,
        });
    };

    useEffect(() => {
        axios.get("http://localhost:3000/couriers")
            .then((response) => {
                const courierListMongo = response.data;
                console.log("OrderOptions :: useEffect :: response: ", response);
                console.log("OrderOptions :: CourierListMongo: ", courierListMongo);
                dispatch(updateCourierList(courierListMongo));
            })
            .catch((error) => {
                console.error("OrderOptions:: useEffect :: error: ", error);
            });
    }, []);

    return (
        <DropdownButton id="dropdown-basic-button" title="Modificar" size="sm">
            {courierList && courierList.map((courier, index) => (
                <Dropdown.Item key={index}
                    onClick={() => courierHandler(courier.name)}
                >{courier.name}</Dropdown.Item>
            ))}
            {isAdmin &&
                <>
                    <Dropdown.Divider />
                    <Dropdown.Item
                        onClick={() => cancelHandler()}
                    >Cancelar</Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => deleteHandler()}
                    >Eliminar</Dropdown.Item>
                </>
            }
        </DropdownButton>
    );
}
