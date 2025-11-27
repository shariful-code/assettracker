import { Router } from 'express';
import authRoutes from './authRoutes.js'
import userRoutes from './userRoutes.js'
const router = Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path:'/user',
        route:userRoutes
    }
];

defaultRoutes.forEach((item) => {
    router.use(item.path, item.route);
});

export default router;