import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import React, { useState} from 'react'
import { useDispatch } from "react-redux";
import {postaddbill} from '@/store/modules/BillStore'
import dayjs from 'dayjs'   
const New = () => {
    const dispatch = useDispatch()
    //控制收入与支出的状态按钮
    const [billtype, setbilltype] = useState('pay')//支出 income
    
    const navigate = useNavigate()
    const [money, setmoney] = useState(0)
    //   保持账单
    const saveBill = () => {
        if(!money)return
        const data = {
            type: billtype,
            money: billtype === 'pay' ? -money : +money,
            date: date,
            useFor:useFor
        }
     dispatch(postaddbill(data))
     navigate(-1)
    }
    //收集账单类型
    const [ useFor, setuseFor] = useState('')
     //控制时间弹窗显示
  const [visible, setVisible] = useState(false)
  //存储时间
  const [date,setdate]  = useState()
  const dateonConfirm = (date)=>{

    setdate(date)
  }
    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames(billtype === 'pay' ? 'selected' : '')}
                        onClick={() => setbilltype('pay')}
                    >
                        支出
                    </Button>
                    <Button
                        className={classNames(billtype === 'income' ? 'selected' : '')}
                        shape="rounded"
                        onClick={() => setbilltype('income')}
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icon type="calendar" className="icon" />
                            <span className="text" onClick={()=>setVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                visible={visible}
                                onClose={() => {
                                setVisible(false)
                                
                                }}
                                onConfirm={dateonConfirm}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                value={money}
                                onChange={(e) => {
                                    setmoney(e)
                                }}
                                onFocus={(e) => {
                                    if (money === 0) {
                                        setmoney('')
                                    }
                                }}
                                type="number"
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[billtype].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div
                                            className={classNames(
                                                'item',
                                                useFor===item.type?'selected':''
                                            )}
                                            key={item.type}
                                            onClick={() => setuseFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={saveBill}>
                    保 存
                </Button>
            </div>
        </div>
    )
}

export default New