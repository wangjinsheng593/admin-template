import router from '@/router';
import store from '@/store';

/**
 * 路由前置守卫
 * @param {*} to    要到哪里去
 * @param {*} from  你从哪里来
 * @param {*} next  是否要去
 */

// 白名单 用户没有权限的时候也能进入的页面
const whiteList = ['/login', '404'];
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 1. 用户已经登入，则不允许进入login
    if (to.path === '/login') {
      next('/');
    } else {
      // 判断用户资料是否存在，如果不存在，则获取用户信息
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo');
      }
      next();
    }
  } else {
    // 2. 用户未登入，只允许进入login
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next('/login');
    }
  }
});
