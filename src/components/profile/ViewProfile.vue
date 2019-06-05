<template>
  <div class="view-profile container">
    <div class="card" v-if="profile">
      <h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
      <ul class="comments collection">
        <li v-for="(comment, index) in comments" :key="index">
          <div class="deep-purple-text">{{ comment.from }}</div>
          <div class="grep-text text-darken-2">{{ comment.content }}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input type="text" name="comment" v-model="newComment">
          <p class="red-text center" v-if="feedback">{{ feedback }}</p>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "ViewProfile",
  data() {
    return {
      profile: null,
      newComment: null,
      feedback: null,
      user: null,
      comments: []
    };
  },
  created() {
    let ref = db.collection("users");
    // プロフィールを参照しているユーザー取得
    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.user = doc.data();
          this.user.id = doc.id;
        });
      });
    // 表示するプロフィールデータを取得
    ref
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.profile = user.data();
      });
    // コメント取得
    db.collection("comments")
      .where("to", "==", this.$route.params.id)
      // .orderBy("time") firestoreにインデックス追加でソート機能が使える
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            // unshiftで先頭に追加、pushは末尾に追加
            this.comments.unshift({
              from: change.doc.data().from,
              content: change.doc.data().content
            });
          }
        });
      });
  },
  methods: {
    // コメント機能
    addComment() {
      if (this.newComment) {
        // feedback初期化
        this.feedback = null;
        // コメント追加
        db.collection("comments")
          .add({
            // slug
            to: this.$route.params.id,
            from: this.user.alias,
            content: this.newComment,
            time: Date.now()
          })
          .then(() => {
            // 成功時初期化
            this.newComment = null;
          });
      } else {
        this.feedback = "You must enter a comment to add it.";
      }
    }
  }
};
</script>
<style>
.view-profile .card {
  padding: 20px;
  margin-top: 60px;
}
.view-profile h2 {
  font-size: 2em;
  margin-top: 0;
}
.view-profile li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
