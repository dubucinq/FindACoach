import mutations from './mutations.js';
import getters from './getters.js';
import actions from './actions.js';

export default {
    state() {
        return {
          userId: null,
          token: null,
          didAutoLogout: false //By default expires in 1 hour
        };
    },
    mutations,
    actions,
    getters
};


