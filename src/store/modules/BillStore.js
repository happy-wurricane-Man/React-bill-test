import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
const  billStore = createSlice({
    name: "bill",
    initialState: {
        billList: [],//菜单列表

    },
    //修改状态的方法，是同步修改支持直接修改
    reducers: {
       //同步修改
        setbillList(state, action) {
            state.billList  = action.payload
        },
        //同步添加账单
        addbill(state, action){
            state.billList.push(action.payload)
        }

    }
})
// 解构actionCreater函数
const { setbillList,addbill} = billStore.actions
const fetchsetbillList = () => {
    return async (dispatch) => {
        // 编写异步
        const res = await axios.get(' http://localhost:8888/ka')
        dispatch(setbillList(res.data))
    }
}
const postaddbill =(data)=>{
    return async (dispatch) => {
        // 编写异步
        const res = await axios.post(' http://localhost:8888/ka',data)
        dispatch(addbill(res.data))
    }
}
// 当在 Redux 中使用异步操作时，可以使用 Redux Thunk 中间件来处理异步逻辑。在这个代码块中，dispatch 的作用是将一个包含异步操作的函数（thunk）分发到 Redux store 中。

// 具体而言，fetchsetbillList 函数返回了一个函数，这个函数接受 dispatch 作为参数。在这个返回的函数中，它通过异步请求获取数据，然后调用 setbillList action 并传递获取的数据作为参数。
// 最后，通过调用 dispatch 方法将这个 action 分发到 Redux store 中。

// 通过分发 action，Redux store 会执行对应的 reducer，更新相应的状态。这样，可以实现在异步操作完成后更新应用程序的状态。

// 简而言之，dispatch 的作用是将包含异步操作的函数分发到 Redux store 中，以触发对应的状态更新。
export { fetchsetbillList,postaddbill}
//导出reducer
const reducer = billStore.reducer
export default reducer