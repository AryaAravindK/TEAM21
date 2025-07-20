import api from '../../lib/axios'

export const registerAccount = async ({username, email_id, password}) => {
    try {
    const resp = await api.post('/auth/signup',{username,email_id,password})
    return resp
} catch (error) {
        throw error
    }
}
export const loginAccount = async ({ email_id, password}) => {
    try {
    const resp = await api.post('/auth/login',{email_id,password})
    return resp
} catch (error) {
        throw error
    }
}
export const verifyAccount = async ({ email_id, verification_code}) => {
    try {
    const resp = await api.post('/auth/verify-account',{email_id,verification_code})
    return resp
} catch (error) {
        throw error
    }
}
export const updateUser = async ({ firstname, lastname, gender, age, interests, phone}) => {
    try {
    const resp = await api.post('/auth/verify-account',{firstname, lastname, gender, age, interests, phone})
    return resp
} catch (error) {
        throw error
    }
}
