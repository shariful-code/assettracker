// src/constants/AppRoutes.js
import Home from '../Pages/Home';
import SignIn from '../Pages/SignIn';
import Signup from '../Pages/Signup';
import Dashboard from '../Pages/Dashboard';

      import * as urls from "./AppUrls"
import Assets from '../Pages/Assets';
import Employee from '../Pages/Employee';
import user from '../Pages/User/user';
import userCreate from '../Pages/User/userCreate';
import userEdit from '../Pages/User/userEdit';

const appRoutes = [
    {
        path: urls.HOME,
        Element: Home,
        isIndexUrl: true,
        isProtected: false
    },

    {
        path: urls.SIGNIN,
        Element: SignIn,
        isIndexUrl: false,
        isProtected: false

    },
    {
        path: urls.SIGNUP,
        Element: Signup,
        isIndexUrl: false,
        isProtected: false
    },
    {
        path: urls.DASHBOARD,
        Element: Dashboard,
        isIndexUrl: false,
        isProtected: true
    },
    {
        path:urls.ASSETS,
        Element:Assets,
        isIndexUrl:false,
        isProtected:true
    },
      {
        path:urls.EMPLOYEE,
        Element:Employee,
        isIndexUrl:false,
        isProtected:true
    },
   //user
     {
        path:urls.USER,
        Element:user,
        isIndexUrl:false,
        isProtected:true
    },
     {
        path:urls.USER_CREATE,
        Element:userCreate,
        isIndexUrl:false,
        isProtected:true
    },

    {
        path:urls.USER_EDIT,
        Element:userEdit,
        isIndexUrl:false,
        isProtected:true
    },
    

];

export default appRoutes;
