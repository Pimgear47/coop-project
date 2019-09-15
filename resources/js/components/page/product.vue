<template>
  <v-layout class="justify-end mt-3 mr-5 mb-3">
    <v-flex xs9 sm11>
      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap justify-space-between>
            <h2 class="txt-title mt-2">
              <v-icon large color="pink">shopping_cart</v-icon>
              &nbsp;รายการสินค้า ({{pageShow}})
            </h2>
            <v-flex xs12 sm5 md3>
              <v-select :items="types" v-model="type" item-text="title" label="ประเภทสินค้า" solo></v-select>
            </v-flex>
            <v-flex xs12 sm5 md3>
              <v-btn
                color="primary"
                v-if="usernow.admin=='1'"
                dark
                class="mb-2 txt-title"
                @click="dialog = true"
              >เพิ่มสินค้า</v-btn>
              <v-btn
                color="success"
                v-if="usernow.admin=='1'"
                dark
                class="mb-2 txt-title"
                @click="barcodePdf"
              >พิมพ์ Barcode สินค้า</v-btn>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex v-for="product in productsFil" :key="product.id" sm2>
              <v-card>
                <v-img :src="'storage/'+product.imageName" height="200px">
                  <!-- <v-img :src="product.image" height="200px"> -->
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
              <v-flex xs12>
                <v-text-field
                  v-model="editItem.product_code"
                  label="รหัสบาร์โค้ดสินค้า*"
                  v-validate="'required'"
                  :error-messages="errors.collect('product_code')"
                  data-vv-name="product_code"
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
                />
                <p class="no-upload" v-if="noUpload">The image field is required.</p>
                <br v-if="this.editItem.imageName && formAddOrEdit" />
                <br v-if="this.editItem.imageName && formAddOrEdit" />
                <img
                  :src="'storage/'+editItem.imageName"
                  v-if="this.editItem.imageName"
                  class="img-responsive"
                  height="120"
                />
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
import barcode from "./pdfReport/barcode";
import barcodetest from "./pdfReport/barcodetest";
var groupArray = require("group-array");
import { Ean13Utils } from "ean13-lib";
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
      today : new Date(),
      color: "success",
      snackbar: false,
      dialog: false,
      editid: null,
      products: [],
      types: [
        { title: "อาหาร/เครื่องดื่ม", value: "food" },
        {
          title: "เสื้อผ้า/เครื่องแต่งกาย/ชุดเครื่องนอน",
          value: "clothes"
        },
        {
          title: "อุปกรณ์เครื่องเขียน",
          value: "stationary"
        },
        {
          title: "อื่นๆ",
          value: "other"
        }
      ],
      type: "",
      editIndex: -1,
      editItem: {
        type: "",
        name: "",
        product_code: "",
        price: "",
        image: "",
        imageName: ""
      },
      defItem: {
        type: "",
        name: "",
        product_code: "",
        price: "",
        image: "",
        imageName: ""
      },
      noUpload: false
    };
  },
  methods: {
    barcodePdf() {
      let input = groupArray(this.productsFil, "type");
      var output = [],
        item;
      for (var type in input) {
        item = {};
        item.type = type;
        item.data = input[type];
        output.push(item);
      }
      barcode.pdfMaker(output);
    },
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
        var date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
        var time = this.today.getHours() +'-' + this.today.getMinutes() +'-' + this.today.getSeconds();
        var dateTime = date+'-'+time;
        const file_name = "image_" + dateTime + ".png";
        this.editItem.imageName = file_name;
        console.log(this.editItem.imageName)
      };
      reader.readAsDataURL(file);
      console.log("Check at onimage", this.noUpload);
    },
    editProduct(id, item) {
      this.editIndex = this.products.indexOf(item);
      this.editItem = Object.assign({}, item);
      this.dialog = true;
      this.editid = id;
    },
    deleteProduct(id, item) {
      const index = this.products.indexOf(item);
      var falseVar = "false";
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
        console.log(this.editItem);
        if (this.checkInput) {
          const result = Ean13Utils.validate(this.editItem.product_code);
          if (this.editItem.product_code.length == 13 && result) {
            this.addProduct(); //save product by axios
            this.snackbar = true;
            this.close();
          } else if (this.editItem.product_code.length == 12 && !result) {
            const result = Ean13Utils.calculateCheckDigit(
              this.editItem.product_code
            );
            console.log("Trueeee", result);
            this.editItem.product_code = this.editItem.product_code + result;
            this.addProduct();
            this.snackbar = true;
            this.close();
          } else {
            alert("คุณกรอกรหัสบาร์โค้ดไม่ถูกต้อง กรุณากรอกใหม่");
          }
        }
      }
      if (this.editItem.image == "") {
        this.noUpload = true;
      } else {
        this.noUpload = false;
      }
    },
    addProduct() {
      this.productsFil.push(this.editItem) &&
        axios
          .post("/api/product", {
            name: this.editItem.name,
            image: this.editItem.image,
            imageName: this.editItem.imageName,
            type: this.editItem.type,
            product_code: this.editItem.product_code,
            price: this.editItem.price
          })
          .then(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            }
          );
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
        this.editItem.product_code
      ) {
        return true;
      } else {
        return false;
      }
    },
    pageShow() {
      if (this.usernow.type == "staff") {
        if (this.usernow.admin == 1) {
          return "A2";
        } else {
          return "S2";
        }
      } else {
        return "U3";
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
