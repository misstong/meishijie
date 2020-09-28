import axios from 'axios'

const instance = axios.create({
    baseURL:'/api'
})

instance.interceptors.request.use(
    config => {
        try {
            let token = localStorage.getItem('token')
            if(token) {
                config.headers.authorization = `token ${token}`
            }
            return config
        }catch(e) {
            return config
        }
        
    },
    err => {
        return Promise.reject(err)
    }
)

instance.interceptors.response.use(
    res=>{
        const {data} = res;
        return data
    },
    err => {
        return Promise.reject(err)
    }
)

export async function getBanner() {
    return await instance.get('/banner')
}

export async function getProperty(){
    return await instance.get('/menu/property')
}

export async function getClassify() {
    return await instance.get('/menu/classify')
}

export async function publish(params) {
    return await instance.post('/menu/publish', params)
}

export async function register(params) {
    return await instance.post('/user/create', params)
}

export async function login(params) {
    return await instance.post('/user/login', params)
}

export async function login_out() {
    return await instance.post('/user/login_out')
}

export async function userInfo(params) {
    return await instance.post('/user/info', params)
}

export async function getMenus(params) {
    return await instance.get('/menu/query', {params})
}

export async function menuInfo(params) {
    return await instance.get('/menu/menuInfo',{params})
}

export async function toggleCollection(params) {
    return await instance.post('/user/collection', params)
}

export async function toggleFollowing(params) {
    return await instance.post('/user/following', params)
}

export async function collection(params) {
    return await instance.get('/user/collection', {params})
}

export async function following(params) {
    return await instance.get('/user/following', {params})
}

export async function fans(params) {
    return await instance.get('/user/fans', {params})
}

export async function upload(params) {
    return await instance.post('/upload', {params})
}

export async function userEdit(params) {
    return await instance.post('/user/edit', params)
}

export async function getComments(params) {
    return await instance.get('/menu/comment', params)
}

export async function postComment(params) {
    return await instance.post('/menu/comment', params)
}