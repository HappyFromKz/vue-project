import httpClient from "@/services/http.service";

const authService = {
    async login(form){
        try {
            const {data, status} = await httpClient.post('auth/login', {password: form.password, email: form.email})
            if (status == 200){
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('role', data.role)
                return true
            }
        } catch (e) {
            console.log(e)
        }
    },
    async me(token){
        try {
            const {status } = await httpClient.post('auth/me', null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return status == 200;
        } catch (e) {
            console.log(e)
        }
    },
    logout(){
        localStorage.removeItem('access_token')
        localStorage.removeItem('role')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        return true
    }
}

export default authService;