import api from '../utils/api'

export default {
    getAllNames () {
        return api().get(`getAllNames`);
    }
}