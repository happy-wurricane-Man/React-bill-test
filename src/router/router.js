// 创建路由实例 绑定path element
import Layout from "@/pages/Layout";
import New from "@/pages/New";
import Month from "@/pages/Month";
import Year from "@/pages/Year";
import { createBrowserRouter} from 'react-router-dom'
import NotFound from "@/pages/Not404"
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children:[
            {
                path: 'month',
                element:<Month />
            },
            {
                path:'/year',
                element:<Year />
            },
           
        ]
    },
    {
        path: '/new',
        element: <New />,
 
    },
    {
        path: '*',
        element: <NotFound />
    }
])
export default router