import React from 'react';
import { useSelector } from 'react-redux';

import AlbumTemplate from './AlbumTemplate';

//la renderizacion de las imagenes depende del template que estemos utilizando
//Este proyecto actualmente consta de solo un template para album
//y las imagenes se envian a dicho template como children
export default function AlbumViewer() {
    //redux store
    const imageList = useSelector(state => state.alb.imageList);
    
    return (
        <div className="d-flex flex-row my-1">
            <AlbumTemplate>
                {
                    imageList.map((file, index) => {
                        const item=file?file.item:null;
                        return (
                            <div className="d-flex align-items-center justify-content-center 
                            border border-dark rounded d-inline-block w-100"
                            style={{ height: '5cm' }}
                                key={index}
                            >
                                {item? (
                                    <img src={item} alt="Uploaded" className="img-fluid h-100"/>
                                ) : (
                                    <div className="text-center">
                                        <i className="bi bi-cloud-arrow-up-fill fs-1"></i>
                                        <p className="mt-2"></p>
                                    </div>
                                )}
                            </div>
                        )
                    })
                }
            </AlbumTemplate>
        </div>
    );
};
