<template>
  <v-layout class="justify-end mt-3 mr-5 mb-3">
    <v-flex xs9 sm11>
      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap justify-space-between>
            <h2 class="txt-title mt-2">
              <v-icon large color="pink">shopping_cart</v-icon>&nbsp;รายการสินค้า
            </h2>
            <v-flex xs12 sm5 md3>
              <v-select :items="types" v-model="type" item-text="title" label="ประเภทสินค้า" solo></v-select>
            </v-flex>
            <v-btn color="primary" v-if="usernow.admin=='1'" dark class="mb-2 txt-title" @click="dialog = true">New Product</v-btn>
          </v-layout>
          <v-layout row wrap>
            <v-flex v-for="product in filteredProducts" :key="product.id" sm2>
              <v-card>
                <v-img :src="product.image" height="200px">
                  <v-container fill-height fluid pa-2>
                    <v-layout fill-height></v-layout>
                  </v-container>
                </v-img>
                <v-card-title primary-title>
                  <v-layout row>
                    <v-flex xs12>
                      <h3 class="txt-title">{{product.name}}</h3>
                      <span class="grey--text txt-title">{{product.price}} บาท</span>
                      <v-divider v-if="usernow.admin=='1'"></v-divider>
                      <v-btn v-if="usernow.admin=='1'" dark block class="amber lighten-1 txt-title">แก้ไขข้อมูล</v-btn>
                      <v-btn v-if="usernow.admin=='1'" dark block class="deep-orange accent-3 txt-title">ลบสินค้า</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <h2 class="txt-title">เพิ่มสินค้า</h2>
        </v-card-title>
        <v-card-text>
          <!-- <form @submit="checkForm" enctype="multipart/form-data"> -->
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editItem.nameNew"
                  label="ชื่อสินค้า*"
                  v-validate="'required'"
                  :error-messages="errors.collect('name')"
                  data-vv-name="name"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editItem.priceNew"
                  label="ราคา*"
                  v-validate="'required'"
                  :error-messages="errors.collect('price')"
                  data-vv-name="price"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="editItem.codeNew"
                  label="รหัสบาร์โค้ดสินค้า 12 หลัก*"
                  v-validate="'required'"
                  :error-messages="errors.collect('code')"
                  data-vv-name="code"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="types"
                  v-model="editItem.typeNew"
                  item-text="title"
                  label="ประเภทสินค้า*"
                  v-validate="'required'"
                  data-vv-name="type"
                  :error-messages="errors.collect('type')"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <input
                  id="uploadImage"
                  type="file"
                  v-validate="'image'"
                  :error-messages="errors.collect('image')"
                  data-vv-as="image"
                  @change="onImageChange"
                >
                <p class="no-upload" v-if="noUpload">The image field is required.</p>
                <br v-if="this.editItem.image">
                <br v-if="this.editItem.image">
                <img
                  :src="editItem.image"
                  v-if="this.editItem.image"
                  class="img-responsive"
                  height="120"
                >
              </v-flex>
            </v-layout>
          </v-container>
          <!-- </form> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="postProductData">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  mounted() {
    this.getProductData();
  },
  $_veeValidate: {
    validator: "new"
  },
  props: ["usernow"],
  data() {
    return {
      dialog: false,
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
      type: "",
      editItem: {
        typeNew: "",
        nameNew: "",
        codeNew: "",
        priceNew: "",
        image: ""
      },
      noUpload: false
    };
  },
  methods: {
    getProductData() {
      axios.get("api/product").then(response => {
        this.products = response.data;
      });
    },
    onImageChange(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      this.noUpload = false;
      reader.onloadend = e => {
        this.editItem.image = reader.result;
      };
      reader.readAsDataURL(file);
      console.log("Check at onimage", this.noUpload);
    },
    postProductData() {
      this.$validator.validateAll();
      if (this.checkInput) {
        axios.post("/api/product", {
          name: this.editItem.nameNew,
          image: this.editItem.image,
          type: this.editItem.typeNew,
          product_code: this.editItem.codeNew,
          price: this.editItem.priceNew
        });
        this.clear();
        this.close();
      }
      if (this.editItem.image == "") {
        this.noUpload = true;
      } else {
        this.noUpload = false;
      }
      console.log("Check at post", this.noUpload);
    },
    close() {
      this.clear();
      this.$validator.reset();
      this.dialog = false;
    },
    clear() {
      const file = document.getElementById("uploadImage");
      file.value = "";
      this.editItem.nameNew = "";
      this.editItem.image = "";
      this.editItem.typeNew = "";
      this.editItem.priceNew = "";
      this.editItem.codeNew = "";
      this.noUpload = false;
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  computed: {
    filteredProducts: function() {
      return this.products.filter(product => {
        return product.type.match(this.type);
      });
    },
    checkInput: function() {
      if (
        this.editItem.nameNew &&
        this.editItem.image &&
        this.editItem.typeNew &&
        this.editItem.priceNew &&
        this.editItem.codeNew
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>


<style>
.no-upload {
  color: red;
  font-size: 3mm;
}
</style>
