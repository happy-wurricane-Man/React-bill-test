import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './comon.css'
// import App from './App';
// 导入我们的路由
import router from './router/router'
import {RouterProvider} from 'react-router-dom'
// console.log(sum(1,2))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}></RouterProvider>
);


