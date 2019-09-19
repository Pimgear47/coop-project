<template>
  <v-layout class="justify-end mt-4 mr-5 mb-3">
    <v-flex xs9 sm11>
      <h2 class="txt-title mt-2">
        <v-icon large color="pink">assignment_turned_in</v-icon>
        &nbsp;ทำรายการทั่วไป ({{pageShow}})
      </h2>
      <br />
      <v-card>
        <v-layout row wrap justify-space-between pt-4 pl-5 pr-5 pb-4>
          <v-flex xs12 sm9>
            <h3>กรอกรหัสหรือสแกนบาร์โค้ด</h3>
            <v-text-field @keyup.enter="checkEnter()" v-model="code_user" label="วางเม้าส์ที่นี่"></v-text-field>
            <v-layout v-if="(code_user!='')" row wrap>
              <v-flex v-for="user in filteredUser" :key="user.firstname" sm4 mb-2>
                <h3 class="txt-title" v-if="filteredUser.length===1">
                  ชื่อสมาชิก : {{user.firstname}} {{user.lastname}}
                  <br />
                  รหัสสมาชิก : {{user.code}}
                </h3>
                <br />
              </v-flex>
            </v-layout>
            <v-flex v-if="currentUser.firstname">
              <h3>สมาชิก: {{currentUser.firstname}} {{currentUser.lastname}} ({{currentUser.code}})</h3>
            </v-flex>
            <br />
            <v-layout v-if="filteredProduct.length==1" row wrap>
              <v-flex v-for="product in filteredProduct" :key="product.name" sm4 mb-2>
                <h4 class="txt-title">ชื่อสินค้า : {{product.name}}</h4>
                <h4 class="txt-title">ราคา : {{product.price}} บาท</h4>
                <img :src="'storage/'+product.imageName" height="150px" />
                <br />
              </v-flex>
            </v-layout>
            <v-flex v-if="this.orderProduct.length!=0">
              <v-data-table
                v-if="this.orderProduct.length!=0"
                :headers="headers"
                :items="orderProduct"
                :pagination.sync="pagination"
                class="elevation-1 txt-title"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.price }}</td>
                  <td>{{ props.item.count }}</td>
                  <td>{{ props.item.cost }} บาท</td>
                  <td class="justify-center layout px-0">
                    <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                  </td>
                </template>
              </v-data-table>
              <br />
              <h3>รวมเป็นจำนวนเงิน {{this.orderPrice}} บาท</h3>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-snackbar class="txt-title" v-model="snackbar" :color="color" :timeout="3000">
      ทำรายการสำเร็จ
      <v-btn dark flat @click="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
export default {
  props: ["usernow"],
  data() {
    return {
      snackbar: false,
      color: "success",
      pagination: {
        rowsPerPage: 25
      },
      sumofcount: 0,
      is_firstTransaction: true,
      checkOldSel: true,
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
        { text: "ราคา", sortable: false, value: "price" },
        { text: "จำนวน", value: "count" },
        { text: "รวมเป็นเงิน", value: "cost" }
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
    checkEnter() {
      if (
        this.code_user.length == 4 ||
        (this.code_user.length == 13 &&
          this.code_user.substr(0, 6) == "1000000")
      ) {
        if (this.is_firstTransaction) {
          this.currentUser = this.filteredUser[0];
          this.code_user = "";
          console.log("this.currentUser", this.currentUser);
          this.is_firstTransaction = false;
        } else {
          this.saveTransaction();
          this.clearTwo();
          this.currentUser = this.filteredUser[0];
          this.code_user = "";
          console.log("this.currentUser", this.currentUser);
        }
      } else {
        console.log(this.filteredProduct);
        this.addProduct();
        // this.code_user = "";
      }
    },
    addProduct() {
      if (this.filteredProduct.length == 1) {
        for (var i = 0; i < this.orderProduct.length; i++) {
          if (this.orderProduct[i].product_code == this.code_user) {
            //สินค้าซ้ำ
            //console.log("this is copy of : " + this.orderProduct[i].name);
            Vue.set(
              this.orderProduct[i],
              this.orderProduct[i].count,
              this.orderProduct[i].count++
            );
            this.sumofcount += 1;
            this.orderProduct[i].cost =
              this.orderProduct[i].count * this.orderProduct[i].price;
            this.orderPrice += parseInt(this.filteredProduct[0].price);
            this.code_user = "";
            this.checkOldSel = false;
            break;
          }
        }
        if (this.checkOldSel) {
          this.filteredProduct[0].count = 1;
          this.sumofcount += 1;
          this.filteredProduct[0].cost = this.filteredProduct[0].price;
          this.orderProduct.push(this.filteredProduct[0]);
          this.orderPrice += parseInt(this.filteredProduct[0].price);
          this.code_user = "";
        }
        this.checkOldSel = true;
        //console.log(this.orderProduct);
      }
    },
    deleteItem(item) {
      const index = this.orderProduct.indexOf(item);
      if (item.count == 1) {
        this.orderProduct.splice(index, 1);
        this.orderPrice -= item.price;
      } else {
        Vue.set(
          this.orderProduct[index],
          this.orderProduct[index].count,
          this.orderProduct[index].count--
        );
        this.orderProduct[index].cost -= item.price;
        this.orderPrice -= item.price;
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
      for (var step = 0; step < this.orderProduct.length; step++) {
        for (var i = 1; i <= this.orderProduct[step].count; i++) {
          this.addstuff(step);
        }
      }
      axios
        .put("/api/user/" + this.currentUser.id, {
          total: this.currentUser.total + this.orderPrice
        })
        .catch(error => {
          console.log(error.message);
        });
      this.sumofcount = 0;
      // this.orderProduct = [];
      this.orderPrice = 0;
      // this.code_user = "";
      // this.currentUserId = "";
      this.snackbar = true;
    },
    addstuff(i) {
      var currentProduct = this.orderProduct[i];
      console.log("CurrentPro", currentProduct);
      if (this.currentUser == null) {
        axios
          .post("/api/transaction", {
            iduser: null,
            idustaff: this.currentStaff.id,
            idproduct: currentProduct.id,
            cost: currentProduct.price
          })
          .catch(error => {
            console.log(error.message);
          });
      } else {
        axios
          .post("/api/transaction", {
            iduser: this.currentUser.id,
            idustaff: this.currentStaff.id,
            idproduct: currentProduct.id,
            cost: currentProduct.price
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    }
  },
  computed: {
    filteredUser: function() {
      return this.users.filter(user => {
        return user.code == this.code_user || user.barcode == this.code_user;
      });
    },
    filteredProduct: function() {
      return this.products.filter(product => {
        return product.product_code == this.code_user;
      });
    },
    pageShow() {
      if (this.usernow.type == "staff") {
        if (this.usernow.admin == 1) {
          return "A1";
        } else {
          return "S1";
        }
      }
    }
  }
};
</script>