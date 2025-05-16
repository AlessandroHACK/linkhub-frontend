import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./views/auth/Login"
import Register from "./views/auth/Register"
import AuthLayout from "./layouts/AuthLayout"
import AppLayout from "./layouts/AppLayout"

import Profile from "./views/admin/Profile"
import DashBoard from "./views/admin/DashBoard"
import Analytics from "./views/admin/Analytics"
import Settings from "./views/admin/Settings"


export default function Router() {

    return (

        <BrowserRouter>
            <Routes>
            <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<Login/>} />
                    <Route path="/auth/register" element={<Register/>} />
                </Route>
            
            <Route path="/admin" element={<AppLayout/>}>
                <Route index={true} element={<DashBoard/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="analytics" element={<Analytics/>}/>
                <Route path="settings" element={<Settings/>}/>
            </Route>
            </Routes>
        </BrowserRouter>
    )
}