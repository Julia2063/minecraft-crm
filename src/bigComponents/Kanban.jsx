import { Col, Row } from "react-bootstrap"
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { handleDelete } from "../helpers/firebaseControl";

export const Kanban = ({ orders }) => {

    return (
        <div className="px-[20px]">
            <Row className="font-bold text-[#727272] border-b-2 border-['#E9E9E9'] ">
                <Col className="border-r-2 border-['#E9E9E9'] text-center pb-[10px]">Stage #1</Col>
                <Col className="border-r-2 border-['#E9E9E9'] text-center pb-[10px]">Stage #2</Col>
                <Col className="border-r-2 border-['#E9E9E9'] text-center pb-[10px]">Stage #3</Col>
                <Col className="text-center pb-[10px]">Stage #4</Col>
            </Row>
            <Row>
                <Col className="border-r-2 border-['#E9E9E9'] text-center pt-[20px] flex flex-col gap-[20px]">
                    {orders.filter(el => (el.stage === '1' && el.functional.text.length === 0)).map(el => {
                        return (
                            <div className="border border-[#E9E9E9] p-[20px] flex gap-[40px] rounded justify-center">
                                <Link to={`/orderList/${el.id}`}>{el.id}</Link>
                                  <button onClick={() => handleDelete(el)}>
                                <GrClose />
                            </button>
                            </div>
                        )
                    })}
                </Col>
                <Col className="border-r-2 border-['#E9E9E9'] text-center pt-[20px] flex flex-col gap-[20px]">
                    {orders.filter(el => (el.stage === '1' && el.functional.text.length > 0)).map(el => {
                        return (
                            <div className="border border-[#E9E9E9] p-[20px] flex gap-[40px] rounded justify-center">
                                <Link to={`/orderList/${el.id}`}>{el.id}</Link>
                                  <button onClick={() => handleDelete(el)}>
                                    <GrClose />
                                  </button>
                            </div>
                        )
                    })}
                </Col>
                <Col className="border-r-2 border-['#E9E9E9'] text-center pt-[20px] flex flex-col gap-[20px]">
                {orders.filter(el => (el.stage === '2')).map(el => {
                        return (
                            <div className="border border-[#E9E9E9] p-[20px] flex gap-[40px] rounded justify-center">
                                <Link to={`/orderList/${el.id}`}>{el.id}</Link>
                                  <button onClick={() => handleDelete(el)}>
                                <GrClose />
                            </button>
                            </div>
                        )
                    })}
                </Col>
                <Col className="text-center pt-[20px] flex flex-col gap-[20px]">
                {orders.filter(el => (el.stage === '3')).map(el => {
                        return (
                            <div className="border border-[#E9E9E9] p-[20px] flex gap-[40px] rounded justify-center">
                                <Link to={`/orderList/${el.id}`}>{el.id}</Link>
                                  <button onClick={() => handleDelete(el)}>
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