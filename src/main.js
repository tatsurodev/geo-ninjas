// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

// firebase.authが開始された後、vueインスタンスが一度だけ開始されているかどうかを管理
let app = null;

// onAuthStateChangedメソッドは、firebaseが開始された後ユーザーがログインしているかどうか分かり次第すぐ発火する。よって、firebase.auth()の後にvueインスタンスを開始するには、onAuthStateChangedのコールバックにvueインスタンスを指定すれば良い
firebase.auth().onAuthStateChanged(() => {
  // firebase.auth().onAuthStateChanged()だけだとログインログアウトの度にステータスが変わり、vueインスタンスが開始されてしまう。条件にvueインスタンスがまだないことを指定することで、vueインスタンスを一度だけ起動させることができ無駄な再起動を防げる
  // vueインスタンスが初めて起動された場合
  if (!app) {
    // は、appフラグにインスタンスを格納してtrue扱いにする
    app = new Vue({
      el: '#app',
      router,
      components: {
        App
      },
      template: '<App/>'
    })
  }
})

/* eslint-disable no-new */
