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
            <v-btn
              color="primary"
              v-if="usernow.admin=='1'"
              dark
              class="mb-2 txt-title"
              @click="dialog = true"
            >New Product</v-btn>
          </v-layout>
          <v-layout row wrap>
            <v-flex v-for="product in productsFil" :key="product.id" sm2>
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
                      <v-btn
                        v-if="usernow.admin=='1'"
                        dark
                        block
                        class="amber lighten-1 txt-title"
                        @click="editProduct(product.id,product)"
                      >แก้ไขข้อมูล</v-btn>
                      <v-btn
                        v-if="usernow.admin=='1'"
                        dark
                        block
                        class="deep-orange accent-3 txt-title"
                        @click="deleteProduct(product.id,product)"
                      >ลบสินค้า</v-btn>
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
          <h2 class="txt-title">{{formTitle}}</h2>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editItem.name"
                  label="ชื่อสินค้า*"
                  v-validate="'required'"
                  :error-messages="errors.collect('name')"
                  data-vv-name="name"
                  required
                  attach
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editItem.price"
                  label="ราคา*"
                  v-validate="'required'"
                  :error-messages="errors.collect('price')"
                  data-vv-name="price"
                  required
                  attach
                ></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="formAddOrEdit">
                <v-text-field
                  v-model="editItem.code"
                  label="รหัสบาร์โค้ดสินค้า*"
                  v-validate="'required'"
                  v-if="formAddOrEdit"
                  :error-messages="errors.collect('code')"
                  data-vv-name="code"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="formAddOrEdit">
                <v-select
                  :items="types"
                  v-model="editItem.type"
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
                  v-if="formAddOrEdit"
                >
                <p class="no-upload" v-if="noUpload">The image field is required.</p>
                <br v-if="this.editItem.image && formAddOrEdit">
                <br v-if="this.editItem.image && formAddOrEdit">
                <img
                  :src="editItem.image"
                  v-if="this.editItem.image"
                  class="img-responsive"
                  height="120"
                >
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar class="txt-title" v-model="snackbar" :color="color" :timeout="3000">
      บันทึกสำเร็จแล้ว
      <v-btn dark flat @click="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
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
      color: "success",
      snackbar: false,
      dialog: false,
      editid: null,
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
      editIndex: -1,
      editItem: {
        type: "",
        name: "",
        code: "",
        price: "",
        image: ""
      },
      defItem: {
        type: "",
        name: "",
        code: "",
        price: "",
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
    editProduct(id, item) {
      //console.log("item", item);
      this.editIndex = this.products.indexOf(item);
      this.editItem = Object.assign({}, item);
      this.dialog = true;
      this.editid = id;
    },
    deleteProduct(id, item) {
      const index = this.products.indexOf(item);
      var falseVar = 'false';
      confirm("Are you sure you want to delete this item?") &&
        axios
          .put("api/product/" + id, {
            Delete: true,
            availableVal: falseVar
          })
          .then(response => {
            this.products.splice(index, 1);
          });
    },
    save() {
      this.$validator.validateAll();
      if (this.editIndex > -1) {
        console.log(this.editItem);
        Object.assign(this.products[this.editIndex], this.editItem) &&
          axios.put("/api/product/" + this.editid, {
            name: this.editItem.name,
            price: this.editItem.price
          });
        this.snackbar = true;
        this.close();
      } else {
        if (this.checkInput) {
          this.productsFil.push(this.editItem) &&
            axios.post("/api/product", {
              name: this.editItem.name,
              image: this.editItem.image,
              type: this.editItem.type,
              product_code: this.editItem.code,
              price: this.editItem.price
            });
          this.snackbar = true;
          this.close();
        }
      }
      if (this.editItem.image == "") {
        this.noUpload = true;
      } else {
        this.noUpload = false;
      }
    },
    close() {
      this.$validator.reset();
      this.dialog = false;
      this.editIndex = -1;
      this.editItem = Object.assign({}, this.defItem);
      const file = document.getElementById("uploadImage");
      if (file.value) {
        file.value = "";
      }
      this.noUpload = false;
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  computed: {
    formTitle() {
      return this.editIndex === -1 ? "เพิ่มสินค้า" : "แก้ไขสินค้า";
    },
    formAddOrEdit() {
      if (this.editIndex === -1) return true;
      else return false;
    },
    productsFil: function() {
      return this.products.filter(product => {
        return product.type.match(this.type) && product.available == "true";
      });
    },
    checkInput: function() {
      if (
        this.editItem.name &&
        this.editItem.image &&
        this.editItem.type &&
        this.editItem.price &&
        this.editItem.code
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
