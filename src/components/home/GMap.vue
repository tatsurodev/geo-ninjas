<template>
  <div class="map">
    <div id="map" class="google-map"></div>
  </div>
</template>
<script>
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
    this.renderMap();
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
