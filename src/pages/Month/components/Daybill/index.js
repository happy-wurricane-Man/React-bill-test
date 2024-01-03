import classNames from 'classnames'
import './index.scss'
import React, { useMemo,useState } from 'react'
import { billTypeToName } from '@/contants/index'
import Icon from '@/components/icon'

const DailyBill = ({ data, billList }) => {
    
    const count = useMemo(() => { //类似计算属性
        //计算 支出 收入 结余
        // reduce()方法可以搞定的东西特别多，就是循环遍历能做的，reduce都可以做，比如数组求和、数组求积、统计数组中元素出现的次数、数组去重等等。
        //  方法对数组中的每个元素执行一个由您提供的reduce函数(依次执行)，将其结果汇总为单个返回值。
        const pay = billList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        return {
            pay,
            income,
            total: pay + income
        }
    }, [billList]) 
    const [visible, setVisible] = useState(false)
    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{data}</span>
                    <span className={classNames('arrow', visible && 'expand')} onClick={()=>{setVisible(!visible)}}></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">{count.pay.toFixed(2)}</span>
                    </div>
                    <div className="income">
                        <span className="type">收入</span>
                        <span className="money">{count.income.toFixed(2)}</span>
                    </div>
                    <div className="balance">
                        <span className="money">{count.total.toFixed(2)}</span>
                        <span className="type">结余</span>
                    </div>
                </div>
            </div>
            {/* 单日列表 */}
           
            <div className="billList" style={{display:visible?'block':'none'}}>
                {billList.map(item => {
                    return (
                        <div className="bill" key={item.id}>
                            <Icon type={item.useFor}/>
                            <div className="detail">
                                <div className="billType">{billTypeToName[item.useFor]}{visible}</div>
                               
                            </div>
                            <div className={classNames('money', item.type)}>
                                {item.money.toFixed(2)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default DailyBill