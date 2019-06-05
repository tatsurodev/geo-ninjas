import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

// グローバルにルーターガード
router.beforeEach((to, from, next) => {
  // ルーターが認証が必要かどうかをチェック、requiresAuthがtrue or false
  // 認証が必要
  // someメソッドは配列が１つでも条件を満たせばtrueを返す
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // 現ユーザー取得
    let user = firebase.auth().currentUser;
    if (user) {
      // ログインユーザー
      next()
    } else {
      // ログインユーザーでない
      next({
        name: 'Login'
      })
    }
    // 認証不要
  } else {
    next()
  }
})

export default router
