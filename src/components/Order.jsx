import { useContext, useEffect, useState } from 'react';

import {Accordion} from 'react-bootstrap';
import {AdditionalWorkModel, OrderModel} from "../Models/OrderModel"
import { deleteImageFromStorage, updateDocumentInCollection, updateFieldInDocumentInCollection, uploadFilesToStoragesFolder, uploadFilesToStoragesFolderWitwName } from '../helpers/firebaseControl';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { View0 } from './View0';
import { format } from 'date-fns';
import { Form1 } from './Form1';
import { View1 } from './View1';
import { Form2 } from './Form2';
import { View2 } from './View2';

import { Form3 } from './Form3';
import { View3 } from './View3';
import { Form4 } from './Form4';
import { Form5 } from './Form5';

import AccessModel from '../Models/AccessModel.json';
import { View6 } from './View6';


const Order = ({
  newOrder, // Bool is new or not
  viewOrder, // Bool edit or view
  orderModel, // if edit -> state of order
  edit, // Bool do edit or not
  currentOrder
}) => {

    const [order, setOrder] = useState(OrderModel);

    const { user, userRole } = useContext(AppContext);

    const [activeKey, setActiveKey] = useState('');

    const [isAdd, setIsAdd] = useState(false);

    const [newComment, setNewComment] = useState({
      tz: '',
      research: '',
      concept: '',
      functional: '',
      plan: '',
      content: '',
      contract: '',
    });

    const [files, setFiles] = useState({
      concept: [],
      content: [],
      contract:[],
    });

    const [newAddWork, setNewAddWork] = useState(AdditionalWorkModel);

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      if(currentOrder) {
        setOrder(currentOrder);
      }
    }, [currentOrder]);

    useEffect(() => {
      setActiveKey(order.stage.value)
    }, [order.id]);

    const handleSelect = (eventKey) => {
      setActiveKey(eventKey);
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setOrder((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };

  const handleChangeWithApprove = (event) => {
    const { name, value } = event.target;
    setOrder((prevState) => ({
      ...prevState,
      [name]: {...order[name], text: value},
    }));
  };

  const handleAddNewComment = async (name) => {
    try {
      if(newComment[name].length > 0) {
        await updateFieldInDocumentInCollection(
            'orders', order.idPost, name, {...order[name], comments: [...order[name].comments, 
              {
                text: newComment[name],
                date: format(new Date(), 'yyyy-MM-dd HH:mm'),
                user: [user.nickName, user.uid],
              }
              ]}
        );
        toast.success('Комментарий успешно добавлен!');
      } else {
        return;
      }
       
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!')
    }
  };

  const handleAddNewAddWork = async () => {
    try {
      if(newAddWork.title.length > 0) {
        await updateFieldInDocumentInCollection(
            'orders', order.idPost, 'additionalWork', [
              ...order.additionalWork, 
              {...newAddWork, dateCreating: format(new Date(), 'yyyy-MM-dd HH:mm')}
            ]
        );
        setIsAdd(false);
        setNewAddWork(AdditionalWorkModel);
        toast.success('Доп работы успешно сохранены!');
      } else {
        return;
      }
       
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!')
    }
  };

  const getApprove = async (name) => {
    try { 
      if(files[name]?.length > 0) {
      const deletedImages = currentOrder[name].files.filter(e => !order[name].files.includes(e));
      deletedImages.forEach(el => deleteImageFromStorage(el));
      
        uploadFilesToStoragesFolderWitwName(files[name], currentOrder, name).then(res => {
          console.log(res);
          updateDocumentInCollection('orders', {
            ...order,
            [name]: {
              ...order[name], 
              approve: 'wait', 
              files: [...currentOrder[name].files.filter(el => order[name].files.includes(el)), ...res],
              comments: newComment[name]?.length >  0 ?  [...order[name].comments, 
            {
              text: newComment[name],
              date: format(new Date(), 'yyyy-MM-dd HH:mm'),
              user: [user.nickName, user.uid],
            }
            ] : order[name]?.comments,
          
        }}, order.idPost);
        });
      } else {
         await updateDocumentInCollection(
            'orders', {...order, [name]: order[name].hasOwnProperty('comments') ? {
              ...order[name],
              approve: 'wait', 
              comments: newComment[name]?.length >  0 ?  [...order[name].comments, 
              {
                text: newComment[name],
                date: format(new Date(), 'yyyy-MM-dd HH:mm'),
                user: [user.nickName, user.uid],
              }
              ] : order[name].comments} : {
                ...order[name],
                approve: 'wait', 
              }}, order.idPost, 
        );
      }
      setFiles({
        concept: [],
        content: [],
        contract:[]
      });
      setNewComment({
          tz: '',
          research: '',
          concept: '',
          functional: '',
          plan: '',
          content: '',
          contract: '',
      });
      setActiveIndex(0);
      toast.success('Запрос на согласованиe отправлен');
       
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!')
    }
  };

    const handleChangePhotos = (e, name) => {
      if (e.target.files[0]) {
        setFiles({...files, [name]: [...files[name], e.target.files[0]]});
        const reader = new FileReader();
  
        reader.onloadend = () => {
          setOrder({...order, [name]: {...order[name], files: [...order[name].files, reader.result]}}) ;
        };
      
        reader.readAsDataURL(e.target.files[0]);
      }
    };

  
    const handleDeletePhoto = (ind, name) => {
      const newImages = order[name].files.filter((e, i) => i !== ind);
      setOrder({...order, [name]: {...order[name], files: newImages}});
      const newFiles = files[name].filter((e, i) => i !== ind);
      setFiles({...files, [name]: newFiles});
    };


    const handleChangeStageWithCondition = async( callback, stage, condition) => {
      if(condition) {
        try {
          await updateFieldInDocumentInCollection('orders', order.idPost, 'stage', {
            value: stage,
            dateChanging: format(new Date(), 'yyyy-MM-dd HH:mm')
          });
          toast.success('Вы успешно перешли на следующий этап');
        } catch(error) {
          console.log(error);
          toast.error('Something went wrong...');
        };
        
      } else {
        callback();
      }
    };
    
    const handleChangeStage = async(stage) => {
      try {
        await updateFieldInDocumentInCollection('orders', order.idPost, 'stage', {
          value: stage,
          dateChanging: format(new Date(), 'yyyy-MM-dd HH:mm')
        });
        toast.success('Вы успешно перешли на следующий этап')
      } catch(error) {
        console.log(error);
        toast.error('Something went wrong...')
      }
    };

const handleSubmitChange = async (e) => {
  e.preventDefault();
  try {
    const filesArray = Object.entries(files).filter(el => el[1].length > 0);

    const keysWithImages = Object.entries(order).filter(el => Object.keys(files).includes(el[0]));
    const deletedImages = {};

    keysWithImages.forEach(el => {
      console.log(currentOrder[el[0]].files);
      deletedImages[el[0]] = currentOrder[el[0]].files.filter(e => !order[el[0]].files.includes(e))
  });


    if (Object.values(deletedImages).some(el => el.length > 0)) {
      Object.values(deletedImages).flat().forEach(el => deleteImageFromStorage(el));
    };

    if(filesArray.length > 0) {
      uploadFilesToStoragesFolder(files, currentOrder).then(res => {
        console.log(res);
        updateDocumentInCollection('orders', {
          ...order,
          tz:  newComment.tz.length > 0 ? {...order.tz, comments: [...order.tz.comments, {
            text: newComment.tz,
            date: format(new Date(), 'yyyy-MM-dd HH:mm'),
            user: [user.nickName, user.uid],
          }]
            } : order.tz,
        research: newComment.research.length > 0 ? {...order.research, comments: [...order.research.comments, {
          text: newComment.research,
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          user: [user.nickName, user.uid],
          }]
        } : order.research,
        plan: newComment.plan.length > 0 ? {...order.plan, comments: [...order.plan.comments, {
          text: newComment.plan,
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          user: [user.nickName, user.uid],
          }]
        } : order.plan,
        functional : newComment.functional.length > 0 ? {...order.functional, comments: [...order.functional.comments, {
          text: newComment.functional,
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          user: [user.nickName, user.uid],
          }]
        } : order.functional,
        concept:  {
          ...order.concept,
          files: res.concept ? [...currentOrder.concept.files.filter(el => order.concept.files.includes(el)), ...res.concept] : files.concept.files,
          comments: newComment.concept.length > 0 ? [...order.concept.comments, {
            text: newComment.concept,
            date: format(new Date(), 'yyyy-MM-dd HH:mm'),
            user: [user.nickName, user.uid],
            }]
          : order.concept.comments,
        },
        contract:  {
          ...order.contract,
          files: res.contract ? [...currentOrder.contract.files.filter(el => order.contract.files.includes(el)), ...res.contract] : files.contract.files,
          comments: newComment.contract.length > 0 ? [...order.contract.comments, {
            text: newComment.contract,
            date: format(new Date(), 'yyyy-MM-dd HH:mm'),
            user: [user.nickName, user.uid],
            }]
          : order.contract.comments,
        },
        content:  {
          ...order.content,
          files: res.content ? [...currentOrder.content.files.filter(el => order.content.files.includes(el)), ...res.content] : files.content.files,
          comments: newComment.content.length > 0 ? [...order.content.comments, {
            text: newComment.content,
            date: format(new Date(), 'yyyy-MM-dd HH:mm'),
            user: [user.nickName, user.uid],
            }]
          : order.content.comments,
        },
        additionalWork: newAddWork.title.length > 0 ? [
          ...order.additionalWork,
          {...newAddWork, dateCreating: format(new Date(), 'yyyy-MM-dd HH:mm')},
        ] : order.additionalWork
      }, currentOrder.idPost);
      });
    } else {
      await updateDocumentInCollection('orders', {
        ...order,
        tz:  newComment.tz.length > 0 ? {...order.tz, comments: [...order.tz.comments, {
          text: newComment.tz,
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          user: [user.nickName, user.uid],
        }]
          } : order.tz,
      research: newComment.research.length > 0 ? {...order.research, comments: [...order.research.comments, {
        text: newComment.research,
        date: format(new Date(), 'yyyy-MM-dd HH:mm'),
        user: [user.nickName, user.uid],
        }]
      } : order.research,
      functional : newComment.functional.length > 0 ? {...order.functional, comments: [...order.functional.comments, {
        text: newComment.functional,
        date: format(new Date(), 'yyyy-MM-dd HH:mm'),
        user: [user.nickName, user.uid],
        }]
      } : order.functional,
      plan: newComment.plan.length > 0 ? {...order.plan, comments: [...order.plan.comments, {
        text: newComment.plan,
        date: format(new Date(), 'yyyy-MM-dd HH:mm'),
        user: [user.nickName, user.uid],
        }]
      } : order.plan,
      concept:  {
        ...order.concept,
        files: [...currentOrder.concept.files.filter(el => order.concept.files.includes(el))],
        comments: newComment.concept.length > 0 ? [...order.concept.comments, {
          text: newComment.concept,
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          user: [user.nickName, user.uid],
          }]
        : order.concept.comments,
      },
      contract:  {
        ...order.contract,
        files:[...currentOrder.contract.files.filter(el => order.contract.files.includes(el))],
        comments: newComment.contract.length > 0 ? [...order.contract.comments, {
          text: newComment.contract,
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          user: [user.nickName, user.uid],
          }]
        : order.contract.comments,
      },
      content:  {
        ...order.content,
        files: [...currentOrder.content.files.filter(el => order.content.files.includes(el))],
        comments: newComment.content.length > 0 ? [...order.content.comments, {
          text: newComment.content,
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          user: [user.nickName, user.uid],
          }]
        : order.content.comments,
        
      },
      additionalWork: newAddWork.title.length > 0 ? [
        ...order.additionalWork,
        {...newAddWork, dateCreating: format(new Date(), 'yyyy-MM-dd HH:mm')},
      ] : order.additionalWork
    }, currentOrder.idPost);
    };
    setActiveIndex(0);
    setIsAdd(false);
    setNewAddWork(AdditionalWorkModel);
  toast.success("Order was updated successfully");
  } catch (error) {
  console.log(error);
  toast.error("Something went wrong...");
  }
};

console.log(order);
console.log();

    return (
        <>
            <Accordion 
              
              activeKey={activeKey} 
              onSelect={handleSelect} 
            >
              <Accordion.Item eventKey="1">
                <Accordion.Header>Новый проект</Accordion.Header>
                <Accordion.Body>
                  {/* {currentOrder ? ( */}
                    <View0 
                      order={order} 
                      newComment={newComment}
                      setNewComment={setNewComment}
                      handleAddNewComment={handleAddNewComment}
                      activeIndex={activeIndex}
                      setActiveIndex={setActiveIndex}
                    />
                  {/* ): (
                    <Form0 
                      order={order}
                      handleChange={handleChange}
                      setOrder={setOrder}
                      newComment={newComment}
                      setNewComment={setNewComment}
                      handleSubmit={handleSubmit}
                      activeIndex={activeIndex}
                      setActiveIndex={setActiveIndex}
                    />
                  )} */}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2" >
                <Accordion.Header>Согласование верхнего уровня</Accordion.Header>
                <Accordion.Body>
                  {userRole.includes('executor') ? (
                    <Form1 
                      order={order}
                      setOrder={setOrder}
                      handleChangePhotos={handleChangePhotos}
                      handleDeletePhoto={handleDeletePhoto}
                      setNewComment={setNewComment}
                      handleChange={handleChangeWithApprove}
                      newComment={newComment}
                      handleSubmit={handleSubmitChange}
                      getApprove={getApprove}
                      activeIndex={activeIndex}
                      setActiveIndex={setActiveIndex}
                      handleAddNewComment={handleAddNewComment}
                      handleChangeStageWithCondition={handleChangeStageWithCondition}
                      handleChangeStage={handleChangeStage}
                  />
                  ) : (
                    <View1
                      order={order}
                      setOrder={setOrder}
                      newComment={newComment}
                      setNewComment={setNewComment}
                      handleAddNewComment={handleAddNewComment}
                      activeIndex={activeIndex}
                      setActiveIndex={setActiveIndex}
                    />
                  )}
                  
                </Accordion.Body>  
              </Accordion.Item>
              {+order.stage.value > 2 && (
              <Accordion.Item eventKey="3">
                <Accordion.Header>Полное Согласование</Accordion.Header>
                <Accordion.Body>
                {userRole.includes('executor') ? (
                  <Form2
                    order={order}
                    setOrder={setOrder}
                    handleChangewithApprove={handleChangeWithApprove}
                    handleChange={handleChange}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    handleChangePhotos={handleChangePhotos}
                    handleDeletePhoto={handleDeletePhoto}
                    handleSubmit={handleSubmitChange}
                    getApprove={getApprove}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    handleAddNewComment={handleAddNewComment}
                    handleChangeStageWithCondition={handleChangeStageWithCondition}
                    handleChangeStage={handleChangeStage}
                  />
                ) : (
                  <View2 
                    order={order}
                    setOrder={setOrder}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    handleAddNewComment={handleAddNewComment}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                  />
                )}
                </Accordion.Body>
              </Accordion.Item>
              )}
              
              {+order.stage.value > 3 && (
                <Accordion.Item eventKey="4">
                <Accordion.Header>Разработка</Accordion.Header>
                <Accordion.Body>
                    {userRole.includes('executor') ? (
                      <Form3 
                        order={order}
                        setOrder={setOrder}
                        handleChange={handleChange}
                        handleSubmit={handleSubmitChange}
                        newAddWork={newAddWork}
                        setNewAddWork={setNewAddWork}
                        isAdd={isAdd}
                        setIsAdd={setIsAdd}
                        handleAddNewAddWork={handleAddNewAddWork}
                        handleChangeStageWithCondition={handleChangeStageWithCondition}
                        handleChangeStage={handleChangeStage}
                      />
                    ) : (
                      <View3 order={order}/>
                    )}
                    
                </Accordion.Body>
              </Accordion.Item>
              )}
              {+order.stage.value > 4 && (
                <Accordion.Item eventKey="5">
                <Accordion.Header>Внутреннее тестирование</Accordion.Header>
                <Accordion.Body>
                      <Form4 
                        disabled={!userRole.includes('executor')}
                        order={order}
                        setOrder={setOrder}
                        currentOrder={currentOrder}
                      />
                    
                    
                </Accordion.Body>
              </Accordion.Item>
              )}
              {+order.stage.value > 5 && (
                <Accordion.Item eventKey="6">
                <Accordion.Header>Внешнее тестирование</Accordion.Header>
                <Accordion.Body>
                    
                      <Form5
                        disabled={!userRole.includes('customer') && !AccessModel.external__testing.change__role.some(el => el === userRole)}
                        order={order}
                        setOrder={setOrder}
                        currentOrder={currentOrder}
                      />
                    
                </Accordion.Body>
              </Accordion.Item>
              )}
              {+order.stage.value > 6 && (
                <Accordion.Item eventKey="7">
                <Accordion.Header>Финал</Accordion.Header>
                <Accordion.Body>
                    
                      <View6
                        order={order}
                      />
                    
                </Accordion.Body>
              </Accordion.Item>
              )}
              
            </Accordion>
        </>
    )
}

export default Order;