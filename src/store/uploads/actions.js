import ApiService from "@/services/api.service"
import {FETCH_UPLOAD, FETCH_UPLOADS, UPLOAD} from "@/store/actions.type";
import {SET_UPLOAD, SET_UPLOADS} from "@/store/mutations.type";

const actions = {
    async [FETCH_UPLOADS](context) {
        const {data} = await ApiService.get('uploads')
        context.commit(SET_UPLOADS, data)
    },
    async [FETCH_UPLOAD](context, id) {
        const {data} = await ApiService.get(`uploads/${id}`)
        context.commit(SET_UPLOAD, data)
    },
    async [UPLOAD](context, payload) {
        const {data} = await ApiService.post('uploads', payload)
        return data
    },
}

export default actions