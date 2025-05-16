import { isAxiosError } from "axios"
import api from "../lib/axios"
import { UpdateCurrentUserPasswordForm, User } from "../types"



export async function updateProfile(formData: User){
    try {
        const url = "/auth/user"
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
        const url = "/auth/user/image"
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
        const { data } = await api.post<string>('/auth/update-password', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}