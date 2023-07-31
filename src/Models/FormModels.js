import React, { useEffect, useState } from 'react';
import AddOrder from './AddOrder.json';
import String from './Inputs/String';

import { Row, Col } from 'react-bootstrap';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const FormModels = ({ model, type, updateInFirebase }) => {
    const [models, setModels] = useState([]);
    const [modelsPosition, setModelsPosition] = useState([]);
    const [colsGrid, setColsGrid] = useState([]);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        setModels(AddOrder.inputs);
        setColsGrid(AddOrder.positions.colsGrid);
    }, []);

    useEffect(() => {
        if(models.length > 0 ) {
            getPosition();
        };
    }, [colsGrid, models]);

    const getPosition = () => {

        let result;
        if(isMobile) {
            result = [];
            models.forEach((model, i) => {
                result[0] = [...result[0], model];
            });
        } else {
            result = colsGrid;
            models.forEach((model, i) => {
                result[model.position[0]] = [...result[model.position[0]], model];
            });

        };
        setModelsPosition(result);
        return result;
    };

    console.log(modelsPosition);


    const update = (el, value) => {
      let result = models[models.findIndex(e => el.key === e.key)];
      result.value = value;
      
      let resultModels = models;
      resultModels[models[models.findIndex(e => el.key === e.key)]] = result;

      setModels(resultModels);
      setRerender(!rerender);

      console.log(resultModels);
    };

    const getModel = (el) => {
        
        switch(el.type) {
            case 'string':
                return <String el={el} update={update}/>;

            default: 
                return <>{el.key}</>;
        }
    };

    return (
        <div>
            {rerender ? (
                 <Row>
                    {modelsPosition.map((col, iCol) => {
                
                return (
                    <>
                        <Col key={col}>
                            {col.map((row, iRow) => {
                                return (
                                    <Row>
                                        <div key={iRow}>
                                            {getModel(row)}
                                        </div>
                                    </Row>
                                ) 
                            })}
                        </Col>
                    </> 
                )
            })}
            </Row>
            ) : (
                <Row>
                {modelsPosition.map((col, iCol) => {
                    
                    return (
                        <>
                            <Col key={col}>
                                {col.map((row, iRow) => {
                                    return (
                                        <Row>
                                            <div key={iRow}>
                                                {getModel(row)}
                                            </div>
                                        </Row>
                                    ) 
                                })}
                            </Col>
                        </> 
                    )
                })}
                </Row>
            )}
        </div>
    )
}

export default FormModels;