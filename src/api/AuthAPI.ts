import api from "../lib/axios";
import { isAxiosError } from "axios";
import { User, UserLogin, UserRegisterForm } from "../types";

export async function createAccount(formData:UserRegisterForm) {
    try {
        const url = '/auth/register'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

}

export async function login(formData: UserLogin) {
    try {
        const url = '/auth/login'
        const {data} = await api.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN',data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
    
}

export async function getUser(){
    try {
        const url = '/auth/user'
        const {data} = await api<User>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
