import { Col, Row } from "react-bootstrap"
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { handleDelete } from "../helpers/firebaseControl";

export const Kanban = ({ orders }) => {

    return (
        <div className=" px-[5px] lg:px-[20px]">
            <Row className="font-bold text-[#727272] border-b-2 border-['#E9E9E9'] text-[10px] lg:text-[16px]">
                <Col className="border-r-2 border-['#E9E9E9'] text-center pb-[10px]">Stage #1</Col>
                <Col className="border-r-2 border-['#E9E9E9'] text-center pb-[10px]">Stage #2</Col>
                <Col className="border-r-2 border-['#E9E9E9'] text-center pb-[10px]">Stage #3</Col>
                <Col className="text-center pb-[10px]">Stage #4</Col>
            </Row>
            <Row>
                <Col className="border-r-2 border-['#E9E9E9'] text-center pt-[20px] flex flex-col gap-[20px]">
                    {orders.filter(el => (el.stage === '1' && el.functional.text.length === 0)).map(el => {
                        return (
                            <div className="border border-[#E9E9E9] p-[10px] lg:p-[20px] lg:flex lg:gap-[40px] rounded lg:justify-center gap-[0px] block">
                                <Link to={`/orderList/${el.id}`}>{el.id}</Link>
                                  <button className="hidden lg:block"  onClick={() => handleDelete(el)}>
                                <GrClose />
                            </button>
                            </div>
                        )
                    })}
                </Col>
                <Col className="border-r-2 border-['#E9E9E9'] text-center pt-[20px] flex flex-col gap-[20px]">
                    {orders.filter(el => (el.stage === '1' && el.functional.text.length > 0)).map(el => {
                        return (
                            <div className="border border-[#E9E9E9] p-[10px] lg:p-[20px] lg:flex lg:gap-[40px] rounded lg:justify-center gap-[0px] block">
                                <Link to={`/orderList/${el.id}`}>{el.id}</Link>
                                  <button className="hidden lg:block" onClick={() => handleDelete(el)}>
                                    <GrClose />
                                  </button>
                            </div>
                        )
                    })}
                </Col>
                <Col className="border-r-2 border-['#E9E9E9'] text-center pt-[20px] flex flex-col gap-[20px]">
                {orders.filter(el => (el.stage === '2')).map(el => {
                        return (
                            <div className="border border-[#E9E9E9] p-[10px] lg:p-[20px] lg:flex lg:gap-[40px] rounded lg:justify-center gap-[0px] block">
                                <Link to={`/orderList/${el.id}`}>{el.id}</Link>
                                  <button className="hidden lg:block" onClick={() => handleDelete(el)}>
                                <GrClose />
                            </button> 
                            </div>
                        )
                    })}
                </Col>
                <Col className="text-center pt-[20px] flex flex-col gap-[20px] text-[10px] lg:text-[16px]">
                {orders.filter(el => (el.stage === '3')).map(el => {
                        return (
                            <div className="border border-[#E9E9E9] p-[10px] lg:p-[20px] lg:flex lg:gap-[40px] rounded lg:justify-center gap-[0px] block">
                                <Link to={`/orderList/${el.id}`}>{el.id}</Link>
                                  <button className="hidden lg:block" onClick={() => handleDelete(el)}>
                                <GrClose />
                            </button>
                            </div>
                        )
                    })}
                </Col>
            </Row>
            
        </div>
    )
}