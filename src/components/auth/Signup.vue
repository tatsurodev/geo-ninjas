<template>
  <div class="signup container">
    <form class="card-pannel" @submit.prevent="signup">
      <h2 class="ceneter deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias">
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>
<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    signup() {
      // 全て空欄でなければ
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        let ref = db.collection("users").doc(this.slug);
        // getで単一のドキュメント取得
        ref.get().then(doc => {
          // ドキュメント存在でエラーメッセージ
          if (doc.exists) {
            this.feedback = "This alias already exists.";
          } else {
            // なしでユーザー登録
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              // プロミスで返ってくるのでエラーがあればキャッチ
              .catch(err => {
                console.log(err);
                this.feedback = err.message;
              });
            this.feedback = "This alias is free to use.";
          }
        });
        console.log(this.slug);
      } else {
        // 空欄があれば
        this.feedback = "You must enter all fields.";
      }
    }
  }
};
</script>
<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.singup .field {
  margin-bottom: 16px;
}
</style>
