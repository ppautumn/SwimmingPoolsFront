/**
 * @param {string} token
 * @returns {{user_id: Number}}
 */
export const parseJwt = (token) => {
    //todo просрочка токена
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(window.atob(base64))
}

export const redirectToAuthPage = async (router) => {
    await router.replace('/login')
}

export const getAccessToken = () => localStorage.getItem('accessToken')
export const removeAccessToken = () => localStorage.removeItem('accessToken')
export const putAccessToken = (value) => localStorage.setItem('accessToken', value)
export const getRefreshToken = () => localStorage.getItem('refreshToken')
export const removeRefreshToken = () => localStorage.removeItem('refreshToken')
export const putRefreshToken = (value) => localStorage.setItem('refreshToken', value)

/**
 * @param {string} refresh
 * @param {axios.AxiosInstance} axiosInstance
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const requestAccessByRefresh = async (refresh, axiosInstance) => await axiosInstance.post('/token/refresh/')