import { isAxiosError } from "axios"
import api from "../lib/axios"
import { UpdateCurrentUserPasswordForm, User, userHandleSchema } from "../types"



export async function updateProfile(formData: User){
    try {
        const url = "/users"
        const {data} = await api.patch<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function uploadImage(file : File){
    const formData = new FormData()
    formData.append('file', file)
    try {
        const url = "/users/image"
        const { data: {image} } : {data: {image: string}} = await api.post(url, formData)
        return image
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function changePassword(formData: UpdateCurrentUserPasswordForm) {
    try {
        const { data } = await api.post<string>('/users/update-password', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUserByHandle(handle : string) {
    try {
        const url = `/users/${handle}`
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

export async function searchByHandle(handle : string) {
    try {
        const url = '/users/search'
        const { data } = await api.post<string>(url, {handle})
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Usuario no encontrado');
    }
    
    
}