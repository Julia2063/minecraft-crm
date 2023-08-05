import { BiArrowBack } from 'react-icons/bi';
import { HiViewList } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import Order from '../components/Order';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { db } from '../firebase';
import { GrView } from 'react-icons/gr';
import { FullOrderInformation } from '../components/FullOrderInformation';


export const OrderCard = () => {
    const [currentOrder, setCurrentOrder] = useState(null);
    const [isView, setIsView] = useState(false);

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
            <div className='flex justify-between'>
                <button 
                    className='mb-[20px] p-[10px] border border-gray-700 rounded bg-white' 
                    type='button'
                    onClick={() => navigate('/orderList')}
                > 
                    <BiArrowBack />
                </button>
                <div className='flex gap-[40px]'>
                    <button 
                        className='mb-[20px] p-[10px] border border-gray-700 rounded bg-white' 
                        type='button'
                        onClick={() => setIsView(false)}
                    > 
                        <HiViewList />
                    </button>
                    <button 
                        className='mb-[20px] p-[10px] border border-gray-700 rounded bg-white' 
                        type='button'
                        onClick={() => setIsView(true)}
                    > 
                        <GrView />
                    </button>
                </div>
            </div>

            {isView ? (
                <FullOrderInformation order={currentOrder}/>
            ) : (
                <Order currentOrder={currentOrder}/>
            )}

           
        </div>
    )
}