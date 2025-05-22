import api from "../lib/axios";
import { isAxiosError } from "axios";
import {  userHandleSchema, UserLogin, UserRegisterForm, userSchema } from "../types";

export async function createAccount(formData: UserRegisterForm) {
    try {
        const url = '/auth/register';
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Error al crear la cuenta');
    }
}

export async function login(formData: UserLogin) {
    try {
        const url = '/auth/login';
        const { data } = await api.post<{
            success: boolean;
      
        }>(url, formData);
        
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Error al iniciar sesión');
    }
}

export async function logout() {
    try {
        const url = '/auth/logout';
        await api.post(url);
        return true;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Error al cerrar sesión');
    }
}
export async function getUser() {
    try {
        const url = '/auth/user';
        const { data } = await api.get(url);
      const response = userSchema.safeParse(data)
                if(response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            
            if (error.response.status === 401) {
                throw new Error('Sesión expirada');
            }
            throw new Error(error.response.data.error);
        }
        throw new Error('Usuario no encontrado');
    }
}




export async function getUserByHandle(handle : string) {
    try {
        const url = `/auth/${handle}`
        const { data } = await api(url)
        const response = userHandleSchema.safeParse(data)
                if(response.success) {
            return response.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Usuario no encontrado');
    }
    
}