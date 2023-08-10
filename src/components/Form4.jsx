import { toast } from "react-toastify";
import { deleteImageFromStorage, getLinksAndMetadata, updateDocumentInCollection, updateFieldInDocumentInCollection, uploadBugReportFiles, uploadIpa } from "../helpers/firebaseControl";
import { Button } from "./Button";
import { InputFile } from "./InputFile";
import { sendMessageTelegram } from "../helpers/functions";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import AccessModel from '../Models/AccessModel.json';
import { format } from "date-fns";
import { Input } from "./Input";
import { BugsItemModel } from "../Models/OrderModel";

export const Form4 = ({ order, setOrder, disabled }) => {

    const [isEdit, setIsEdit] = useState(false);

    const [filesArray, setFilesArray] = useState([]);

    const [change, setChange] = useState(0);

    const { users } = useContext(AppContext);

    useEffect(() => {
        setFilesArray(order.bugs.filter(el => el.active)[0].bugsReport.files);
    }, [change]);

    const handleChangeIpa = (e, index) => {
        const newBugs = [...order.bugs];
        newBugs[index].files = e.target.files[0];

        setOrder({
            ...order,
            bugs: [...newBugs]
        });
    };


    const handleSaveIpa = (i) => {
       uploadIpa(order.bugs[i].files, order, i).then(res => {
            updateFieldInDocumentInCollection('orders', order.idPost, 'bugs', [...order.bugs.filter((el, ind) => ind !== i), order.bugs[i] = {...order.bugs[i], files: res, exApprove: 'wait'}], );
            const message = `ipa файл проекта ${order.id} добавлен`;
            const arr = users.filter(el => AccessModel.ipa.message__form__role__add.some(e => e === el.role)).map(el => el.telegramId);
            sendMessageTelegram(message, arr);
            toast.success('ipa Файл успешно сохранен');
       }).catch((error) => {
        console.log(error);
        toast.error('Something went wrong...')
       });
    };

    const handleApprove = async(i) => {
        try {
            await updateDocumentInCollection('orders', {
                ...order,
                bugs: [
                    ...order.bugs.filter((el, ind) => ind !== i),
                    order.bugs[i] = {...order.bugs[i], exApprove: 'yes', cusApprove: 'wait'}
                ], 

                stage: {value: '6', dateChanging: format(new Date(), 'yyyy-MM-dd HH:mm')}
            }, order.idPost);
            const message = `Проект ${order.id} отправлен на внешнее тестирование`;
            const arr = users.filter(el => AccessModel.bugs.message__form__role__approve.some(e => e === el.role)).map(el => el.telegramId);
            sendMessageTelegram(message, arr);
            toast.success('Проект направлен на внешнее тестирование');
        } catch(error) {
            console.log(error);
            toast.error('Something went wrong...');
        }
    };

    const handleNotApprove = async(i) => {
        try {
            await updateFieldInDocumentInCollection('orders', order.idPost, 'bugs', [...order.bugs.filter((el, ind) => ind !== i), order.bugs[i] = {...order.bugs[i],  exApprove: 'no'}]);
            toast.success('ipa Файл отклонен');
        } catch(error) {
            console.log(error);
            toast.error('Something went wrong...');
        }
    };
    
    const handleChangeDescription = (e, i) => {
        const newBugs = [...order.bugs];
        newBugs[i].bugsReport.text = e.target.value;
        setOrder({
            ...order,
            bugs: [...newBugs],
        })
    };

    const handleChangeBugReportsFiles = (e, index) => {
        const newBugs = [...order.bugs];
        newBugs[index].bugsReport.files = [...newBugs[index].bugsReport.files, e.target.files[0]] ;

        setOrder({
            ...order,
            bugs: [...newBugs]
        });
    };

    const handleSaveBugReport = (i) => {
        const deletedFiles = filesArray.filter(el => !order.bugs[i].bugsReport.files.includes(el)); 
        console.log(deletedFiles);
        if(deletedFiles.length > 0) {
            deletedFiles.forEach(el => deleteImageFromStorage(el));
        };
        console.log(deletedFiles);
        if(order.bugs[i].bugsReport.files.some(el => typeof(el) !== 'string')) {
            uploadBugReportFiles(order.bugs[i].bugsReport.files.filter(file => typeof(file) !== 'string'), order, i).then(getLinksAndMetadata).then(res => 
            {
                
                updateFieldInDocumentInCollection('orders', order.idPost, 'bugs', [...order.bugs.filter((el, ind) => ind !== i), order.bugs[i] = {...order.bugs[i],  bugsReport: {
                text: order.bugs[i].bugsReport.text,
                files: [...order.bugs[i].bugsReport.files.filter(el => typeof(el) === 'string'), ...res.map(el => el.url)],
                names: [...order.bugs[i].bugsReport.names, ...res.map(el => el.metadata.name)]
            }}]);
    
           /*  setFilesArray([...order.bugs[i].bugsReport.files.filter(el => typeof(el) === 'string'), ...res.map(el => el.url)]); */
           setChange((prev) => prev + 1);
            setIsEdit(false);
        }).then(r => {
                toast.success('Данные успешно сохранены');
            }).catch(error => {
                console.log(error);
                toast.error('Something went wrong...');
            })
        } else {
            updateFieldInDocumentInCollection('orders', order.idPost, 'bugs', [...order.bugs.filter((el, ind) => ind !== i), order.bugs[i] = {...order.bugs[i],  bugsReport: { ...order.bugs[i].bugsReport,
                text: order.bugs[i].bugsReport.text,
            }}]).then(r => {
                setChange((prev) => prev + 1);
                setIsEdit(false);
                toast.success('Данные успешно сохранены');
            }).catch(error => {
                console.log(error);
                toast.error('Something went wrong...');
            })
        }
       
    };

    const  handleDeleteIpa = (i, index) => {
      const newFiles = '';
      setOrder({...order, bugs: [...order.bugs.filter((el, ind) => ind !== i), order.bugs[i] = {...order.bugs[i], files: newFiles }]});
    };

    const handleDeleteFile = (i, index) => {
      const newFiles = order.bugs[i].bugsReport.files.filter((e, inx) => inx !== index);
      const newNames = order.bugs[i].bugsReport.names.filter((e, inx) => inx !== index);
      setOrder({...order, bugs: [...order.bugs.filter((el, ind) => ind !== i), order.bugs[i] = {...order.bugs[i],  bugsReport: {...order.bugs[i].bugsReport, files: newFiles, names: newNames} }]});
    };

    const handleAddNewBugItem = async(i) => {
        try {
            await  updateDocumentInCollection('orders', {
                ...order,
            bugs: [...order.bugs.filter((el, ind) => ind !== i), order.bugs[i] = {
                ...order.bugs[i], active: false,
            }, BugsItemModel],
            }, order.idPost);
            const message = `Проект ${order.id} отправлен на доработку`;
            const arr = users.filter(el => AccessModel.bugs.message__form__role__reject.some(e => e === el.role)).map(el => el.telegramId);
            sendMessageTelegram(message, arr);
            toast.success('Отправлено на доработку');
        } catch(error) {
            console.log(error);
            toast.error('Something went wrong...');
        }
    };

    console.log(filesArray); 
    console.log(change); 
    
    return (
        <div className="pt-6 flex flex-col gap-[20px]" >
          
                {order.bugs.map((el, i) => {
                   console.log((filesArray.length ))
                   console.log((order.bugs[i].bugsReport.files.length))
                    return (
                        <div key={i} className="flex flex-col border-b border-[#333232] pb-[20px]">
                            <h3>{`# ${i + 1}`}</h3>
                            <span className="font-bold lg:text-[20px] text-[16px]">ipa Файл</span>
                            <InputFile
                                disabled={(typeof(el.files) === 'string' && el.files.includes('https://firebasestorage')) || disabled}
                                array={[el.files]}
                                file
                                notLabel
                                handleChange={(e) => {handleChangeIpa(e, i)}}
                                index={i}
                                handleDeleteFile={handleDeleteIpa}
                                labels={["ipa"]}
                            />

                            {typeof(el.files) !== 'string' && (
                                <Button 
                                    disabled={disabled}
                                    type="button"
                                    label="Сохранить файл"
                                    className='self-end mt-[10px]'
                                    callback={() => handleSaveIpa(i)}
                                />
                            )}

                            {el.exApprove === 'wait' && (
                                <div className="flex justify-center gap-[20px] mt-[10px]">
                                    <Button 
                                        disabled={disabled}
                                        type="button"
                                        label="Утвердить"
                                        callback={() => handleApprove(i)}
                                    />
                                    <Button 
                                        disabled={disabled}
                                        type="button"
                                        label="Отказать"
                                        className="bg-[#fc4646] hover:bg-[#fd0a0a]"
                                        callback={() => handleNotApprove(i)}
                                    />
                                </div>
                               
                            )}

                            {el.exApprove === 'no' && (
                                <div  className="flex flex-col">
                                    <span className="font-bold lg:text-[20px] text-[16px]">
                                        Bug Report
                                    </span>
                                    <Input
                                        disabled={disabled}
                                        name="figma"
                                        type='text'
                                        tag='textarea'
                                        value={order.bugs[i].bugsReport.text}
                                        handleChange={(e) => handleChangeDescription(e, i)}
                                        placeholder="Опишите баг"
                                        labelStyle="flex justify-between lg:items-center lg:flex-row flex-col"
                                        inputStyle="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50" 
                                        onFocus={() => setIsEdit(true)}
                                    />

                                    <InputFile
                                        disabled={!el.active || disabled}
                                        array={el.bugsReport.files}
                                        file
                                        handleChange={(e) => handleChangeBugReportsFiles(e, i)}
                                        index={i}
                                        handleDeleteFile={handleDeleteFile}
                                        labels={el.bugsReport.names}
                                    />

                                    {el.active && (
                                        <div className="flex justify-center gap-[20px] mt-[10px]">
                                            {(el.bugsReport.files.some(el => typeof(el) !== 'string') 
                                            || isEdit || filesArray.length !== order.bugs[i].bugsReport.files.length) ? (
                                        <Button 
                                            disabled={disabled}
                                            type='button'
                                            label="Сохранить"
                                            className="self-end"
                                            callback={() => handleSaveBugReport(i)}
                                        />
                                            ) : (
                                        <Button 
                                            disabled={(el.bugsReport.files.length < 1 && el.bugsReport.text.length < 1) || disabled}
                                            type='button'
                                            label="Отправить на доработку"
                                            className="bg-[#7364f7] hover:bg-[#4531f5] disabled:opacity-25"

                                            callback={() => handleAddNewBugItem(i)}
                                        />
                                    )}
                                    </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
             
        </div>
    )
}