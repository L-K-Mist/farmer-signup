<template>
      <v-layout row justify-center>
        <v-dialog v-model="showFarmMap" fullscreen transition="dialog-bottom-transition" :overlay="false">
          <v-btn color="primary" dark slot="activator">Open Dialog</v-btn>
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon @click.native="showFarmMap = false" dark>
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>Put Your Farm "On the Map"</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark flat @click.native="$store.dispatch('getMunicipalData', autoLocation); showFarmMap = false">Save</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <p>{{autoLocation.lat}} {{autoLocation.lng}}</p>
            <p>Zoom: {{map.zoom}}</p>
            <p>Center: {{map.center}}</p>
            <v-layout justify-center row wrap>
            <l-map ref="map" style="height: 60vh; width: 90vw" :zoom="map.zoom" :options="map.options"
            :center="map.center" :min-zoom="map.minZoom" :max-zoom="map.maxZoom" >
            <l-control-layers :position="map.layersPosition"/>
            <l-tile-layer v-for="(tileProvider, index) in tileProviders" :key="index"
              layerType="base" :name="tileProvider.name" :visible="tileProvider.visible"
              :url="tileProvider.url" :attribution="tileProvider.attribution" :token="token"/>
            <l-control-zoom :position="map.zoomPosition" />
            <l-control-attribution :position="map.attributionPosition" :prefix="map.attributionPrefix" />
            <l-control-scale :imperial="map.imperial" />
              <l-marker 
                :visible="true" :draggable="true"
                :lat-lng="autoLocation"/>
          </l-map>
              
            </v-layout>
          </v-card>
        </v-dialog>
      </v-layout>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LLayerGroup,
  LTooltip,
  LPopup,
  LControlZoom,
  LControlAttribution,
  LControlScale,
  LControlLayers
} from "vue2-leaflet";
import Glyph from "leaflet.icon.glyph";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
//
var customIcon = L.icon({
  iconUrl: "images/layers.png",
  shadowUrl: ""
});
const tileProviders = [
  {
    name: "OpenStreetMap",
    visible: true,
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  },
  {
    name: "OpenTopoMap",
    visible: false,
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  }
];
export default {
  name: "example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LLayerGroup,
    LTooltip,
    LPopup,
    LControlZoom,
    LControlAttribution,
    LControlScale,
    LControlLayers
  },
  mounted() {
    var map = this.$refs.map;
    console.log("TCL: ------------------------");
    console.log("TCL: created -> map", map);
    console.log("TCL: ------------------------");
  },
  data() {
    return {
      map: {
        // center: { lng: 31.00454079, lat: -29.91917 },
        center: { lat: -27.54618041742035, lng: 24.125976562500004 },
        // bounds: L.latLngBounds(
        //   { lat: 46.573931908971865, lng: -4.757080078125001 },
        //   { lat: 48.850224803672056, lng: 4.603271484375001 }
        // ),
        markerPos: null,
        options: { zoomControl: false, attributionControl: false },
        zoom: 5,
        minZoom: 1,
        maxZoom: 20,
        zoomPosition: "topleft",
        attributionPosition: "bottomright",
        layersPosition: "topright",
        attributionPrefix: "Vue2Leaflet",
        imperial: false
      },

      opacity: 0.8,
      token: "your token if using mapbox",

      Positions: ["topleft", "topright", "bottomleft", "bottomright"],
      tileProviders: tileProviders,
      stuff: [{ id: "s1", visible: true, markersVisible: true }]
    };
  },
  computed: {
    showFarmMap: {
      get() {
        return this.$store.getters.showFarmMap;
      },
      set(val) {
        this.$store.dispatch("showFarmMap", val);
      }
    },

    autoLocation: {
      get() {
        return this.$store.getters.farmLocation;
      },
      set(gps) {
        this.$store.dispatch("setFarmLocation", gps);
      }
    }
  },
  methods: {}
};
</script>