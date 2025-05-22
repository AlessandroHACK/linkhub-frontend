import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./views/auth/Login"
import Register from "./views/auth/Register"
import AuthLayout from "./layouts/AuthLayout"
import AppLayout from "./layouts/AppLayout"

import Profile from "./views/admin/Profile"
import DashBoard from "./views/admin/DashBoard"
import Analytics from "./views/admin/Analytics"
import Settings from "./views/admin/Settings"

import HandleLayout from "./layouts/HandleLayout"
import NotFound from "./views/404/NotFound"
import Handle from "./views/public/Handle"
import Home from "./views/home/Home"


export default function Router() {

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                </Route>

                <Route path="/admin" element={<AppLayout />}>
                    <Route index={true} element={<DashBoard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="settings" element={<Settings />} />
                </Route>

                <Route path="/:handle" element={<HandleLayout />}>
                    <Route element={<Handle />} index={true} />
                </Route>

                <Route  element={<HandleLayout/>}>
                    <Route path='/404' element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}