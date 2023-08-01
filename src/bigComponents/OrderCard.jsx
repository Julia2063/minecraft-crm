import { BiArrowBack } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import Order from '../components/Order';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { db } from '../firebase';


export const OrderCard = () => {
    const [currentOrder, setCurrentOrder] = useState(null);

    const navigate = useNavigate();
    const { slug } = useParams();

    const { orders } = useContext(AppContext);


    useEffect(() => {
        /* if(slug !== 'newOrder') {
            const findedOrder = orders.find(el => el.id === slug);
            setCurrentOrder(findedOrder);
        }; */
        if(slug !== 'newOrder') {
            db.collection('orders').where('id', '==', slug).onSnapshot(snapshot => {
                setCurrentOrder(snapshot.docs[0]?.data());
            });
        };
    }, [slug]);


    return (
        <div className='p-[20px] lg:p-[40px] md:p-[60px] text-[10px] lg:text-[16px]'>
            <button 
                className='mb-[20px]' 
                type='button'
                onClick={() => navigate('/orderList')}
            > 
                <BiArrowBack />
            </button>

           <Order currentOrder={currentOrder}/>
        </div>
    )
}