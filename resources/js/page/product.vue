<template>
  <v-app id="inspire">
    <v-layout class="justify-end mt-3 mr-5 mb-3">
      <v-flex xs9 sm11>
        <v-card>
          <v-container fluid grid-list-md>
            <v-layout row wrap justify-space-between>
              <h2 class="txt-title mt-2">รายการสินค้า</h2>
              <v-flex xs12 sm5 md3>
                <v-select :items="types" v-model="type" item-text="title" label="ประเภทสินค้า" solo></v-select>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex v-for="product in filteredProducts" :key="product.name" sm2>
                <v-card>
                  <v-img :src="product.image" height="200px">
                    <v-container fill-height fluid pa-2>
                      <v-layout fill-height></v-layout>
                    </v-container>
                  </v-img>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="txt-title">{{product.name}}</h3>
                      <span class="grey--text txt-title">{{product.price}} บาท</span>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  mounted() {
    this.getProductData();
  },
  data() {
    return {
      products: [],
      types: [
        // { title: "สินค้าทั้งหมด", value: "" },
        { title: "อาหาร/เครื่องดื่ม", value: "food" },
        {
          title: "อุปกรณ์เครื่องเขียน",
          value: "stationary"
        },
        {
          title: "เสื้อผ้า/เครื่องแต่งกาย/ชุดเครื่องนอน",
          value: "clothes"
        }
      ],
      type: ""
    };
  },
  methods: {
    getProductData() {
      axios.get("api/product").then(response => {
        this.products = response.data;
      });
    }
  },
  computed: {
    filteredProducts: function() {
      return this.products.filter(product => {
        return (
          product.type.match(this.type)
        );
      });
    }
  }
};
</script>
