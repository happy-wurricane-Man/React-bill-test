import { configureStore } from "@reduxjs/toolkit"
import  billReducer  from './modules/BillStore'
const store = configureStore({
    reducer: {
         bill: billReducer
    }
})
export default store