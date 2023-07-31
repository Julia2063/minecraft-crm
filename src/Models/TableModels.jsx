import React, { useEffect, useState } from 'react';
import AddOrder from './AddOrder.json';
import String from './Inputs/String';

import { Row, Col } from 'react-bootstrap';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { OrderLine } from '../components/OrderLine';

const TableModels = ({ model, type, updateInFirebase }) => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        setModels(AddOrder.inputs);
    }, []);


    const update = (el, value) => {
      let result = models[models.findIndex(e => el.key === e.key)];
      result.value = value;
      let resultModels = models;
      resultModels[models[models.findIndex(e => el.key === e.key)]] = result;

      setModels(resultModels);

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
            {models.map(m => {
                return <OrderLine data={m} />
            })}
        </div>
    )
}

export default TableModels;