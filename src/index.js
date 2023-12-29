import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './comon.css'

// import App from './App';
// 导入我们的路由
import router from './router/router'
import {RouterProvider} from 'react-router-dom'
import  store  from './store'
import { Provider } from 'react-redux';
// console.log(sum(1,2))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   <RouterProvider router={router}></RouterProvider>
   </Provider>
);


