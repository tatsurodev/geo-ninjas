<template>
  <div class="login container">
    <form class="card-panel" @submit.prevent="login">
      <h2 class="center deep-purple-text">Login</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field">
        <button class="btn deep-purple">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      // 両方空でない
      if (this.email && this.password) {
        firebase
          .auth()
          // ログイン
          .signInWithEmailAndPassword(this.email, this.password)
          // プロミスとしてcredentialが返ってくる、credential.userにログインユーザー情報
          .then(credential => {
            console.log(credential.user);
            this.$router.push({ name: "GMap" });
          })
          .catch(err => {
            // ログイン失敗でエラーメッセージ格納
            this.feedback = err.message;
          });
        // ログイン成功でfeedback初期化
        this.feedback = null;
      } else {
        // 空あり
        this.feedback = "Please fill in both fields.";
      }
    }
  }
};
</script>
<style>
.login {
  max-width: 400px;
  margin-top: 60px;
}
.login h2 {
  font-size: 2.4em;
}
.login .field {
  margin-bottom: 16px;
}
</style>
