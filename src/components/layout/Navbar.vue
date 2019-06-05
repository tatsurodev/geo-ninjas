<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link class="brand-logo left" :to="{ name: 'GMap' }">GeoNinjas!</router-link>
        <ul class="right">
          <li v-if="!user">
            <router-link :to="{ name: 'Signup' }">Signup</router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li v-if="user">
            <a>{{ user.email }}</a>
          </li>
          <li v-if="user">
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        // ログアウト
        .signOut()
        // プロミスが返ってくるのでのちにリダイレクト
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    }
  },
  created() {
    // 下記のコードだとcreatedの一度だけuserが取得されることになり、ログインログアウト時に新たにユーザーを取得するには不適
    // let user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style>
</style>
