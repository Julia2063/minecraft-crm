import { BsDownload } from "react-icons/bs"
import { deleteImageFromStorage, downloadFile, getLinksAndMetadata, updateDocumentInCollection, updateFieldInDocumentInCollection, uploadBugReportFiles } from "../helpers/firebaseControl"
import { Button } from "./Button"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { sendMessageTelegram } from "../helpers/functions"
import { AppContext } from "../context/AppContext"
import AccessModel from '../Models/AccessModel.json';
import { Input } from "./Input"
import { InputFile } from "./InputFile"
import { format } from "date-fns"
import { BugsItemModel } from "../Models/OrderModel";



export const Form5 = ({ order, setOrder, disabled }) => {

    const [currentBug, setCurrentBug] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    const [filesArray, setFilesArray] = useState([]);

    const [change, setChange] = useState(0);

    const [i, setI] = useState(0);

    useEffect(() => {
        setFilesArray(order.bugs.filter(el => el.active)[0].bugsReport.files);
    }, [change]);

    const { users } = useContext(AppContext);


    useEffect(() => {
        setCurrentBug(order.bugs.filter(el => el.active)[0]);
        setI(order.bugs.findIndex(el => el.active));
    }, [order]);

    const handleApprove = async() => {
    try {
        await updateDocumentInCollection('orders', {
            ...order,
            bugs: [...order.bugs.filter(el => !el.active), order.bugs.filter(el => el.active)[0] = {
                ...currentBug, cusApprove: 'yes',
            }],
            stage: {
                value: '7',
                dateChanging: format(new Date(), 'yyyy-MM-dd HH:mm'), 
            },

        }, order.idPost);
        const message = `Проект ${order.id} одобрен заказчиком`;
        const arr = users.filter(el => AccessModel.bugs.message__form__role__cusApprove.some(e => e === el.role)).map(el => el.telegramId);
        sendMessageTelegram(message, arr);
        toast.success('Проект одобрен');
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong...');
    }
};

const handleNotApprove = async() => {
    try {
        await updateFieldInDocumentInCollection('orders', order.idPost, 'bugs', [...order.bugs.filter(el => !el.active), 
            order.bugs.filter(el => el.active)[0] = {
                ...currentBug, cusApprove: 'no',
            }],
        );
    } catch (error) {
        console.log(error);
    }
};

const handleChangeDescription = (e) => {
    setOrder({
        ...order,
        bugs: [...order.bugs.filter(el => !el.active), order.bugs.filter(el => el.active)[0] = {
            ...currentBug, bugsReport: {...currentBug.bugsReport, text: e.target.value},
        }],
    })
};

const handleChangeBugReportsFiles = (e) => {
    setOrder({
        ...order,
        bugs: [...order.bugs.filter(el => !el.active), order.bugs.filter(el => el.active)[0] = {
            ...currentBug, bugsReport: {...currentBug.bugsReport, files: [...currentBug.bugsReport.files, e.target.files[0]] },
        }],
    })
};

const handleDeleteFile = (i, index) => {
    const newFiles = order.bugs[i].bugsReport.files.filter((e, inx) => inx !== index);
    const newNames = order.bugs[i].bugsReport.names.filter((e, inx) => inx !== index);
    setOrder({...order, bugs: [...order.bugs.filter((el, ind) => ind !== i), order.bugs[i] = {...order.bugs[i],  bugsReport: {...order.bugs[i].bugsReport, files: newFiles, names: newNames} }]});
  };


const handleSaveBugReport = () => {
    const deletedFiles = filesArray.filter(el => currentBug.bugsReport.files.includes(el)); 
    console.log(deletedFiles);
    if(deletedFiles.length > 0) {
        deletedFiles.forEach(el => deleteImageFromStorage(el));
    };
    if(currentBug.bugsReport.files.some(el => typeof(el) !== 'string')) {
         uploadBugReportFiles(currentBug.bugsReport.files.filter(file => typeof(file) !== 'string'), order, i).then(getLinksAndMetadata).then(res => 
        {
            updateDocumentInCollection('orders', {
                ...order, 
                bugs: [...order.bugs.filter(el => !el.active), order.bugs.filter(el => el.active)[0] = {
                    ...currentBug, bugsReport: {
                        ...currentBug.bugsReport, 
                        files: [...currentBug.bugsReport.files.filter(el => typeof(el) === 'string'), ...res.map(el => el.url)],
                        names: [...currentBug.bugsReport.names, ...res.map(el => el.metadata.name)]
                    },
                }]
            }, order.idPost);
        console.log(res);
    }).then(r => {
        const message = `Проект ${order.id} отправлен на доработку заказчиком`;
        const arr = users.filter(el => AccessModel.bugs.message__form__role__cusNotApprove.some(e => e === el.role)).map(el => el.telegramId);
        sendMessageTelegram(message, arr);
            toast.success('Данные сохранены');
            setChange((prev) => prev + 1);
            setIsEdit(false);
        }).catch(error => {
            console.log(error);
            toast.error('Something went wrong...');
        })

    } else {
        updateDocumentInCollection('orders', {
            ...order, 
            bugs: [...order.bugs.filter(el => !el.active), order.bugs.filter(el => el.active)[0] = {
                ...currentBug,  
            }]
        }, order.idPost).then(r => {
   
        toast.success('Данные сохранены');
        setIsEdit(false);
    }).catch(error => {
        console.log(error);
        toast.error('Something went wrong...');
    })
    }
   
};

const handleSendBack = async() => {
  try {
    await  updateDocumentInCollection('orders', {
        ...order, 
        stage: {value: '5', dateChanging: format(new Date(), 'yyyy-MM-dd HH:mm')},
        bugs: [...order.bugs.filter(el => !el.active), order.bugs.filter(el => el.active)[0] = {
            ...currentBug, exApprove:'no', active: false, 
        }, BugsItemModel]
    }, order.idPost);
    const message = `Проект ${order.id} отправлен на доработку заказчиком`;
    const arr = users.filter(el => AccessModel.bugs.message__form__role__cusNotApprove.some(e => e === el.role)).map(el => el.telegramId);
    sendMessageTelegram(message, arr);
    toast.success('Отправлено на доработку');
  } catch(error) {
    console.log(error);
    toast.error('Something went wrong...');
  }
};

    return (
        <div className="pt-6 flex flex-col gap-[20px]" >
          <span className="font-bold lg:text-[20px] text-[16px]">ipa Файл</span>
          <button
            type='button'
            onClick={() => downloadFile(currentBug?.files, `ipa`)}
            className='text-black border-2 border-[#000] h-[40px] w-[40px] rounded flex items-center justify-center flex-col no-underline'
          > 
            <BsDownload size={20}/>
          </button>

          {currentBug.cusApprove === 'wait' && (
             <div className="flex justify-center gap-[20px]">
            <Button
                disabled={disabled}
                type="button"
                label="Принять"
                callback={handleApprove}
                className="disabled:opacity-25"
            />
            <Button 
                disabled={disabled}
                type="button"
                label="Отказать"
                className="bg-[#fc4646] hover:bg-[#fd0a0a] disabled:opacity-25"
                callback={handleNotApprove}
            />
          </div>
          )}

          {currentBug.cusApprove === 'no' && (
            <div  className="flex flex-col">
            <span className="font-bold lg:text-[20px] text-[16px]">
                Bug Report
            </span>
            <Input
                disabled={disabled}
                type='text'
                tag='textarea'
                value={order.currentBug?.bugsReport.text}
                handleChange={(e) => handleChangeDescription(e)}
                placeholder="Опишите баг"
                labelStyle="flex justify-between lg:items-center lg:flex-row flex-col"
                inputStyle="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50" 
                onFocus={() => setIsEdit(true)}
            />

            <InputFile
                disabled={disabled}
                array={currentBug.bugsReport.files}
                file
                handleChange={(e) => handleChangeBugReportsFiles(e)}
                handleDeleteFile={handleDeleteFile}
                labels={currentBug.bugsReport.names}
                index={i}
                /* handleDeleteFile={handleDeleteFile} */
            />

            <div className="flex justify-center gap-[20px]">
                {(currentBug.bugsReport.files.some(el => typeof(el) !== 'string') 
                    || isEdit || filesArray.length !== currentBug.bugsReport.files.length) ? (
                    <Button 
                        type='button'
                        label="Сохранить"
                        className="self-end"
                        callback={handleSaveBugReport}
                        disabled={disabled}
                    />                   
                        ) : (
                    <Button 
                      disabled={(currentBug.bugsReport.files.length < 1 && currentBug.bugsReport.text.length < 1) || disabled}
                      type='button'
                      label="Отправить на доработку"
                      className="bg-[#7364f7] hover:bg-[#4531f5] disabled:opacity-25"
                      callback={handleSendBack}
                    />
                )}
            </div>
        </div>
          )}
         
        </div>
    )
}