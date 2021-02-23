const cookieParser = process.server ? require("cookieparser") : undefined;

// 必须放到函数里面，服务端渲染运行的是同一个实例
// 为了防止数据冲突，污染
// 按需导出，不要使用export default
export const state = () => {
    return {
        // 当前登录用户信息
        user: null
    }
};

export const mutations = {
    setUser(state, data) {
        state.user = data;
    }
};

export const actions = {
    // nuxt提供的，特殊的action，服务端渲染期间自动调用
    nuxtServerInit({commit}, {req}) {
        let user = null;
        if (req.headers.cookie) {
            const parsed = cookieParser.parse(req.headers.cookie);
            try {
                user = JSON.parse(parsed.user);
            } catch (err) {
                console.log(err);
            }
        }
        commit('setUser', user);
    }
};
