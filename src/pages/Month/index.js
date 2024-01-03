import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import React, { useMemo, useState, useEffect } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import Daybill from './components/Daybill'
const Month = () => {
  //拿取接口数据 
  const billlist = useSelector(state => state.bill.billList)
  const mothGroup = useMemo(() => {
    return _.groupBy(billlist, (item => dayjs(item.date).format('YYYY-MM')))
  }, [billlist])
  const [currentMonthList, setMonthList] = useState([])

  const count = useMemo(() => { //类似计算属性
    //计算 支出 收入 结余
    // reduce()方法可以搞定的东西特别多，就是循环遍历能做的，reduce都可以做，比如数组求和、数组求积、统计数组中元素出现的次数、数组去重等等。
    //  方法对数组中的每个元素执行一个由您提供的reduce函数(依次执行)，将其结果汇总为单个返回值。
    const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
      pay,
      income,
      total: pay + income
    }
  }, [currentMonthList])

  //控制时间弹窗显示
  const [visible, setVisible] = useState(false)
  //用于显示时间
  const [currentDate, setCurrentDate] = useState(() => { return dayjs(new Date()).format('YYYY-MM') })
  const onConfirm = (e) => {
    setVisible(false)
    const time = dayjs(e).format('YYYY-MM')
    setCurrentDate(time)
    if (mothGroup[time]) {
      setMonthList(mothGroup[time])
    } else {
      setMonthList([])
    }
  }
  //初始化的时候将当前页的统计数据显示出来
  useEffect(() => {
    const nowDate = dayjs().format('YYYY-MM')
    if (mothGroup[nowDate]) {
      setMonthList(mothGroup[nowDate])
    }
  }, [mothGroup])


  //当前月按照日来分钟
  // return _.groupBy(billlist, (item => dayjs(item.date).format('YYYY-MM')))
  const dayGroup = useMemo(() => {
   const groupData  =  _.groupBy(currentMonthList, (item => dayjs(item.date).format('YYYY-MM-DD')))
   console.log(groupData)
   const keys   =  Object.keys(groupData)
   return {
    groupData,
    keys
   }
  }, [currentMonthList])
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => {
            setVisible(true)
          }}>
            <span className="text">
              {currentDate}月账单
            </span>
            <span className={classNames('arrow', visible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{count.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{count.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{count.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={visible}
            onClose={() => {
              setVisible(false)
            }}
            onConfirm={(v) => onConfirm(v)}
            max={new Date()} 
          />
        </div>
        {/* 当日列表组件 */}
        {/* <Daybill ></Daybill> */}
        
        {
          dayGroup.keys.map(key => {
            return <Daybill key={key} data={key} billList={dayGroup.groupData[key]}></Daybill>
          })
        }
      </div>
    </div >
  )
}
export default Month