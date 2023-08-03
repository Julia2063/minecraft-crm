import { GrClose } from 'react-icons/gr';

import { handleDelete } from "../helpers/firebaseControl";

import { Link } from "react-router-dom";

export const OrderLine = ({ i, data }) => {

    return (
      <div className=" border-b border-[#E9E9E9] py-[10px] flex items-center h-max text-[10px] lg:text-[16px]">
        <div className="w-auto lg:pl-[20px] lg:pr-[20px] pl-[8px] pr-[8px]">
          <p className=" font-bold text-[#727272] ">{i + 1}</p>
        </div>
        <div className="w-1/4">
          <p className="font-bold text-[#727272] text-center">
            <Link to={`/orderList/${data.id}`}>{data.id}</Link>
          </p>
        </div>
        <div className="w-1/4">
          <p className="font-bold text-[#727272] text-center">
            {data.title}
          </p>
        </div>
        <div className="w-1/4">
          <p className=" font-bold text-[#727272] text-center">
            <a href={`${data.ref}`} target='_blank'>ссылка</a>
          </p>
        </div>
        <div className="w-1/4 flex items-center justify-center gap-[5px]">
          
            {data.concept.files.map((el, i) => {
              return (
                <div className="h-[50px] w-[40px]" key={i}>
                  <img src={el} alt="img" className="object-cover w-full h-full"/>
                </div> 
              )
            })}
           
        </div>
        <div className="w-1/4">
          <p className=" font-bold text-[#727272] text-center">
            {data.priority}
          </p>
        </div>
        <div className="w-auto lg:pl-[20px] lg:pr-[20px] pl-[8px] pr-[8px]">
           <button onClick={() => handleDelete(data)}>
          <GrClose />
        </button>
        </div>
        
       
      </div>    
    );
 };