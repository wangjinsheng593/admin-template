import variables from '@/styles/variables.scss';
// 快捷访问
const getters = {
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    /**
     *
     * @param {*} state
     * @returns true 表示用户信息已存在
     */
    hasUserInfo: state => {
        return JSON.stringify(state.user.userInfo) !== '{}';
    },
    cssVar: state => variables,
    sidebarOpened: state => state.app.sidebarOpened,
    language: state => state.app.language

};
export default getters;
