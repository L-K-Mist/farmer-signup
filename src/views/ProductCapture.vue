<template>
    <v-container grid-list-xs>
        <h3 class="display-1">Products</h3>
        <v-text-field
            v-model="product.name"
            label="Product Name"
            single-line
        ></v-text-field>
        <v-text-field
            v-model="product.description"
            label="Product Description"
            single-line
        ></v-text-field>
        <v-select
          :items="units"
          v-model="product.unit"
          label="Unit of measure"
        ></v-select>
        <v-text-field
          label="Available Units in Stock"
          v-model="product.stockLevel"
        ></v-text-field>
        <v-text-field
          label="Price"
          v-model="product.price"
          prefix="R"
        ></v-text-field>
        <p>How about a picture of your lovely product</p>
        <v-cloudinary-upload 
          v-model="product.imageSrc"
          :upload-preset="cloudinary.preset"
          :cloud-name="cloudinary.name"
          @input="gotImageSource"
          button-icon="fa-home"
        />
        <img
          v-if="product.imageSrc"
          :src="product.imageSrc" />
        <v-btn @click="submit"  color="success">Upload Your Product</v-btn>

              <v-card v-if="products">
                <v-card-title class="display-1" primary-title>
                  Captured Products
                </v-card-title>
                <v-card-text>
                  <v-flex xs12 v-for="(product, index) in products" :key="index">
                    Name: {{product.name}}
                    Description: {{product.description}}
                    Units: {{product.unit}}
                    Price: {{product.price}}

                  </v-flex>
                </v-card-text>
              </v-card>
    </v-container>
</template>

<script>
import vuetifyCloudinaryUpload from "vuetify-cloudinary-upload";
import srcForCloudinary from "@/helpers/srcForCloudinary.js";
export default {
  mounted() {
    // this.$store.commit('product', {
    //     name: "Whatchoo-macallit",
    //     description: "Widget and Jam",
    //     unit: "dozenzz",
    //     stockLevel: 34,
    //     price: 67.78,
    //     imageSrc: ""
    // })
    console.log("TCL: mounted -> this.$store.getters.product", this.$store.getters.product)
   // this.$store.getters.farmProfile
		console.log("TCL: mounted -> this.$store.getters.farmProfile", this.$store.getters.farmProfile)
    this.product = this.$store.getters.product
		console.log("TCL: created -> this.product", this.product)
    this.$nextTick(() => {
    console.log("TCL: mounted -> this.$store.getters.product", this.$store.getters.product)
    });
  },
  data() {
    return {
      product: {
        name: null,
        description: null,
        unit: null,
        stockLevel: null,
        price: null,
        imageSrc: null
      },
      products: null,
      cloudinary: {
        name: "dylan-van-den-bosch",
        preset: "gi9lyrb6"
      },
      units: [
        "Each/Item",
        "dozen",
        "grams",
        "Kilograms",
        "Millilitres",
        "Litres"
      ]
    };
  },
  methods: {
    gotImageSource(e) {
      console.log("TCL: gotImageSource -> e", e);
      const src = srcForCloudinary(this.cloudinary.name, e);
      console.log("TCL: gotImageSource -> src", src);
      this.product.imageSrc = src;
    },
    submit() {
      this.$store.dispatch("saveProduct", this.product);
      this.$router.push('/')
    },
    async fetchProducts() {
      // const message = await this.$store.dispatch('fetchProducts')
      // console.log('TCL: testFunc -> message', message)
      // this.products = message
    }
  },
  components: { 
    "v-cloudinary-upload": vuetifyCloudinaryUpload }
};
</script>
<style scoped>
</style>

