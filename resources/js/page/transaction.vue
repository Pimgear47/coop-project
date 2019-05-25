<template>
  <v-layout class="justify-end mt-3 mr-5 mb-3">
    <v-flex xs9 sm11>
      <h2>ทำรายการ</h2>
      <br>
      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1">
          <h3>กรอกชื่อหรือรหัสสมาชิก</h3>
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-text-field v-model="code_user" label="รหัสสมาชิก"></v-text-field>
          <!-- @keyup.enter="e6 = 2 && mapUser(filteredUser.pop())" -->
          <v-layout v-if="filteredUser.length==1" row wrap>
            <v-flex v-for="user in filteredUser" :key="user.firstname" sm4 mb-2>
              <h3 class="txt-title">ชื่อสมาชิก : {{user.firstname}} {{user.lastname}} <br> รหัสสมาชิก : {{user.code}}</h3>
              <br>
              <v-btn class="txt-title" color="primary" @click="e6 = 2,mapUser(user)">Continue</v-btn>
              <v-btn class="txt-title" flat @click="clearOne()">Cancel</v-btn>
            </v-flex>
          </v-layout>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 2" step="2">
          <h3>รายการสินค้าที่ซื้อ</h3>
        </v-stepper-step>
        <v-stepper-content step="2">
          <v-text-field @keyup.enter="addProduct" v-model="code_product" label="รหัสสินค้า"></v-text-field>
          <v-layout v-if="filteredProduct.length==1" row wrap>
            <v-flex v-for="product in filteredProduct" :key="product.name" sm4 mb-2>
              <h4 class="txt-title">ชื่อสินค้า : {{product.name}}</h4>
              <h4 class="txt-title">ราคา : {{product.price}} บาท</h4>
              <br>
            </v-flex>
          </v-layout>
          <v-data-table
            v-if="this.orderProduct.length!=0"
            :headers="headers"
            :items="orderProduct"
            :pagination.sync="pagination"
            class="elevation-1 txt-title"
          >
            <template v-slot:items="props">
              <td>{{ props.item[0].name }}</td>
              <td>{{ props.item[0].price }}</td>
              <td class="justify-center layout px-0">
                <v-icon small @click="deleteItem(props.item)">delete</v-icon>
              </td>
            </template>
          </v-data-table>
          <br>
          <h3>รวมเป็นจำนวนเงิน {{this.orderPrice}} บาท</h3>
          <br>
          <v-btn
            v-if="this.orderProduct.length!=0"
            class="txt-title"
            color="primary"
            @click="e6 = 3"
          >Continue</v-btn>
          <v-btn
            v-if="this.orderProduct.length!=0"
            class="txt-title"
            flat
            @click="e6 = 1,clearTwo()"
          >Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 3" step="3">
          <h3>สรุปรายการ</h3>
        </v-stepper-step>
        <v-stepper-content step="3">
          <h3>สมาชิก : {{this.currentUser.firstname}} {{this.currentUser.lastname}}</h3>
          <h3>ผู้ทำรายการ : {{this.currentStaff.firstname}} {{this.currentStaff.lastname}}</h3>
          <h3>จำนวนสิ่งของที่ซื้อ {{this.orderProduct.length}} ชิ้น</h3>
          <h3>รวมเป็นจำนวนเงิน {{this.orderPrice}} บาท</h3>
          <br>
          <br>
          <v-btn class="txt-title" color="primary" @click="e6 = 1,saveTransaction()">Continue</v-btn>
          <v-btn class="txt-title" color="primary">Receipt?</v-btn>
          <v-btn class="txt-title" flat @click="e6 = 2">Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["usernow"],
  data() {
    return {
      pagination: {
        rowsPerPage: 25
      },
      e6: 1,
      code_user: "",
      code_product: "",
      users: [],
      products: [],
      currentUser: [],
      currentStaff: this.usernow,
      orderProduct: [],
      orderPrice: 0,
      headers: [
        {
          text: "ชื่อ",
          sortable: false,
          value: "name"
        },
        { text: "ราคา", value: "price" }
      ]
    };
  },
  mounted() {
    this.getUserData();
    this.getProductData();
  },
  methods: {
    getUserData() {
      axios.get("api/user").then(response => {
        this.users = response.data;
      });
    },
    getProductData() {
      axios.get("api/product").then(response => {
        this.products = response.data;
      });
    },
    mapUser(user) {
      this.currentUser = user;
    },
    addProduct() {
      if (this.filteredProduct.length == 1) {
        this.orderProduct.push(this.filteredProduct);
        this.orderPrice += parseInt(this.filteredProduct[0].price);
        this.code_product = "";
      }
    },
    deleteItem(item) {
      const index = this.orderProduct.indexOf(item);
      console.log(item);
      if (confirm("Are you sure you want to delete this item?")) {
        this.orderProduct.splice(index, 1);
        this.orderPrice -= item[0].price;
      }
    },
    clearOne() {
      this.code_user = "";
      this.currentUserId = "";
    },
    clearTwo() {
      this.orderProduct = [];
      this.orderPrice = 0;
    },
    saveTransaction() {
      var step;
      for (step = 0; step < this.orderProduct.length; step++) {
        this.addstuff(step);
      }
      this.orderProduct = [];
      this.orderPrice = 0;
      this.code_user = "";
      this.currentUserId = "";
    },
    addstuff(i) {
      var currentProduct = this.orderProduct[i].pop();
      console.log(currentProduct);
      axios.post("/api/transaction", {
          iduser: this.currentUser.id,
          idustaff: this.currentStaff.id,
          idproduct: currentProduct.id
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  },
  computed: {
    filteredUser: function() {
      return this.users.filter(user => {
        name = user.firstname +" "+ user.lastname;
        return user.code == this.code_user || name.match(this.code_user);
      });
    },
    filteredProduct: function() {
      return this.products.filter(product => {
        return product.product_code == this.code_product;
      });
    }
  }
};
</script>