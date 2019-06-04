<template>
  <div class="map">
    <div id="map" class="google-map"></div>
  </div>
</template>
<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "GMap",
  data() {
    return {
      // 緯度
      lat: 53,
      // 経度
      lng: -2
    };
  },
  methods: {
    renderMap() {
      // Mapメソッドの第一引数はターゲット、第二引数は各オプションをオブジェクトで指定
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });
    }
  },
  mounted() {
    // 現ユーザー取得
    let user = firebase.auth().currentUser;
    // console.log(user);
    // geolocationのapiが許可されていれば
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // 第一引数、現在位置が所得できたときのコールバックで位置情報が渡される
        pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
          // 現ユーザーのdoc取得、geolocationを更新
          db.collection("users")
            .where("user_id", "==", user.uid)
            .get()
            // 条件に合致するsnapshot(複数のdoc)のプロミスが返ってくる
            .then(snapshot => {
              // この場合、docは一つのみ
              snapshot.forEach(doc => {
                console.log(doc.id);
                // 下記は作動しない
                // doc.update({
                //   geolocation: "ok"
                // });
                db.collection("users")
                  .doc(doc.id)
                  .update({
                    geolocation: {
                      lat: this.lat,
                      lng: this.lng
                    }
                  });
              });
            })
            .then(() => {
              this.renderMap();
            });
        },
        // 第二引数、失敗時のコールバック
        err => {
          console.log(err);
          this.renderMap();
        },
        // 第三引数、オプションをオブジェクトで指定。maximumAgeはgeolocationのキャッシュ、timeoutは失敗判定までの時間
        { maximumAge: 60000, timeout: 3000 }
      );
    } else {
      // デフォルトの値で表示
      this.renderMap();
    }
    // firebase.auth()がスタートしてからvueインスタンスを開始するようにしないと現在のログインユーザーが取得できないので、vueインスタンス全体をラップする必要がある
    // console.log(firebase.auth().currentUser);
  }
};
</script>
<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
