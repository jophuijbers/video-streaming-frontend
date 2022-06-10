import {SET_UPLOAD, SET_UPLOADS} from "@/store/mutations.type";

const mutations = {
    [SET_UPLOADS](state, uploads) {
        state.uploads = uploads
    },
    [SET_UPLOAD](state, upload) {
        state.upload = upload
    }
}

export default mutations