import { Router } from 'express';
import authRoutes from './authRoutes.js'
import userRoutes from './userRoutes.js'
import departmentRoutes from './departmentRoutes.js'
import categoryRoutes from './categoryRoutes.js'

import brandRoutes from './brandRoutes.js'
import verdorRoutes from './vendorRoutes.js'
import employeeRoutes from './employeeRoutes.js'
import assetRoutes from './assetRoutes.js'
const router = Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path:'/user',
        route:userRoutes
    },

    {
        path:'/department',
        route:departmentRoutes
    },


     {
        path:'/category',
        route:categoryRoutes
    },

   
    {
        path:'/brand',
        route:brandRoutes
    },
     {
        path:'/vendor',
        route:verdorRoutes
    },
    {
        path : '/employee',
        route: employeeRoutes
    },
    {
        path:'/asset',
        route:assetRoutes
    }

];

defaultRoutes.forEach((item) => {
    router.use(item.path, item.route);
});

export default router;