import { Col, Row } from "react-bootstrap"
import { BigDashboardItem } from "../components/BigDashboardItem"
import { MeddiumDashboardItem } from "../components/MeddiumDashboardItem"
import { SmallDashboardItem } from "../components/SmallDashboardItem"
import { AppContext } from "../context/AppContext"
import { useContext, useEffect, useState } from "react"

export const Dashboard = () => {

    const { orders } = useContext(AppContext);

    const [data, setData] = useState({
        all: 0,
        active: 0,
        archive: 0,
        new: 0,
        high: 0,
        full: 0,
        dev: 0,
        intTest: 0,
        extTest: 0,
        conc: 0,
        func: 0,
        res: 0,
        figma: 0,
        tz: 0,
        plan: 0,
        content: 0,
        price: 0,
        end: 0,
        contract: 0
    });

    useEffect(() => {
        setData({
            all: orders.length,
            active: orders.filter(el => el.active).length,
            archive: orders.filter(el => !el.active).length,
            new: orders.filter(el => el.stage.value === '1').length,
            high: orders.filter(el => el.stage.value === '2').length,
            full: orders.filter(el => el.stage.value === '3').length,
            dev: orders.filter(el => el.stage.value === '4').length,
            intTest: orders.filter(el => el.stage.value === '5').length,
            extTest: orders.filter(el => el.stage.value === '6').length,
            final: orders.filter(el => el.stage.value === '7').length,
            conc: orders.filter(el => el.concept.approve === 'wait').length,
            func: orders.filter(el => el.functional.approve === 'wait').length,
            res: orders.filter(el => el.research.approve === 'wait').length,
            figma: orders.filter(el => el.figma.approve === 'wait').length,
            tz: orders.filter(el => el.tz.approve === 'wait').length,
            plan: orders.filter(el => el.plan.approve === 'wait').length,
            content: orders.filter(el => el.content.approve === 'wait').length,
            price: orders.filter(el => el.price.approve === 'wait').length,
            end: orders.filter(el => el.end.approve === 'wait').length,
            contract: orders.filter(el => el.contract.approve === 'wait').length,
        })
    }, [orders]);


    return (
        <Row className="flex flex-row gap-[20px] lg:block lg:gap-[0px]">
            <Col xs={12} lg={3} className="flex flex-col gap-[20px] items-center">
                <BigDashboardItem common title="Всего проектов" number={data.all}/>
                <BigDashboardItem title="Активных проектов" number={data.active}/>
                <BigDashboardItem title="Выполненных проектов" number={data.archive}/>
            </Col>
            <Col xs={12} lg={4} className="flex flex-col gap-[20px] items-center">
                <Row className="w-full">
                    <Col xs={6}>
                        <MeddiumDashboardItem title="Новых проектов" number={data.new}/>
                    </Col>
                    <Col xs={6}>
                        <MeddiumDashboardItem title="Согласование верхнего уровня" number={data.high}/>
                    </Col>
                </Row>
                <Row className="w-full">
                    <Col xs={6}>
                        <MeddiumDashboardItem title="Полное согласование" number={data.full}/>
                    </Col>
                    <Col xs={6}>
                        <MeddiumDashboardItem title="Разработка" number={data.dev}/>
                    </Col>
                </Row>
                <Row className="w-full">
                    <Col xs={6}>
                        <MeddiumDashboardItem title="Внутреннее тестирование" number={data.intTest}/>
                    </Col>
                    <Col xs={6}>
                        <MeddiumDashboardItem title="Внешнее тестирование" number={data.extTest}/>
                    </Col>
                </Row>
                <Row className="w-full">
                    <Col xs={6}>
                        <MeddiumDashboardItem title="Финал" number={data.final}/>
                    </Col>
                    <Col xs={6}>
                       
                    </Col>
                </Row>
            </Col>
            <Col xs={12} lg={5} className="flex flex-col gap-[20px] items-center">
                <div className="font-bold text-[20px]">Ожидает согласования</div>
                <Row className="w-full">
                    <Col xs={4}>
                        <SmallDashboardItem title="Концепт" number={data.conc}/>
                    </Col>
                    <Col xs={4}>
                        <SmallDashboardItem title="Функционал" number={data.func}/>
                    </Col>
                    <Col xs={4}>
                        <SmallDashboardItem title="Research" number={data.res}/>
                    </Col>
                </Row>
                <Row className="w-full">
                    <Col xs={4}>
                        <SmallDashboardItem title="Figma" number={data.figma}/>
                    </Col>
                    <Col xs={4}>
                        <SmallDashboardItem title="TЗ" number={data.tz}/>
                    </Col>
                    <Col xs={4}>
                        <SmallDashboardItem title="План работ" number={data.plan}/>
                    </Col>
                </Row>
                <Row className="w-full">
                    <Col xs={4}>
                        <SmallDashboardItem title="Контент" number={data.content}/>
                    </Col>
                    <Col xs={4}>
                        <SmallDashboardItem title="Цена" number={data.price}/>
                    </Col>
                    <Col xs={4}>
                        <SmallDashboardItem title="Сроки"number={data.end}/>
                    </Col>
                </Row>
                <Row className="w-full">
                    <Col xs={4}>
                        <SmallDashboardItem title="Договор" number={data.contract}/>
                    </Col>
                    <Col xs={4}>
                        
                    </Col>
                    <Col xs={4}>
                     
                    </Col>
                </Row>
            </Col>
        </Row>
        
    )
}