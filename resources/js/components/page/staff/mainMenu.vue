<template>
  <v-layout class="justify-end mt-4 mr-5 mb-3">
    <v-flex xs9 sm11>
      <h2 class="txt-title mt-2">
        <v-icon large color="pink">assignment_turned_in</v-icon>
        &nbsp;เมนูหลัก ({{pageShow}})
      </h2>
      <br />
      <v-card>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap justify-space-between>
            <v-flex xs12 sm4 pl-3 pr-3>
              <v-card>
                <v-img src="https://image.freepik.com/free-vector/shopping-basket-with-marketing-set-icons_24877-50233.jpg" aspect-ratio="1.5"></v-img>
                <v-card-actions>
                  <v-btn href="/product" block color="green" dark>
                    <h1 class="txt-thS mt-2" style="font-size: 32px;">รายการสินค้า</h1>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 pl-3 pr-3>
              <v-card>
                <v-img src="https://sv1.picz.in.th/images/2019/09/18/cYuFDn.jpg" aspect-ratio="1.5"></v-img>
                <v-card-actions>
                  <v-btn href="/transaction-staff" block color="green" dark>
                    <h1 class="txt-thS mt-2" style="font-size: 32px;">ทำรายการ</h1>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 pl-3 pr-3>
              <v-card>
                <v-img src="https://image.freepik.com/free-vector/magnifying-glass-data-analysis_23-2147501894.jpg" aspect-ratio="1.5"></v-img>
                <v-card-actions>
                  <v-btn href="/salereport" block color="green" dark>
                    <h1 class="txt-thS mt-1" style="font-size: 32px;">ดูรายงานยอดขาย</h1>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-space-between pt-2>
            <v-flex xs12 sm4 pl-3 pr-3>
              <v-card>
                <v-img src="https://sv1.picz.in.th/images/2019/09/18/cYuy1S.png" aspect-ratio="1.5"></v-img>
                <v-card-actions>
                  <v-btn href="/dividend-for-admin" block color="green" dark>
                    <h1 class="txt-thS mt-1" style="font-size: 32px;">ดูรายงานปันผล/เฉลี่ยคืน</h1>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 pl-3 pr-3>
              <v-card>
                <v-img src="https://sv1.picz.in.th/images/2019/11/12/gs71gv.png" aspect-ratio="1.5"></v-img>
                <v-card-actions>
                  <v-btn href="/event" block color="green" dark>
                    <h1 class="txt-thS mt-1" style="font-size: 32px;">ปฏิทินกำหนดการ</h1>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 pl-3 pr-3>
              <v-card>
                <v-img src="https://image.freepik.com/free-vector/template-login-green-background_1017-7451.jpg" aspect-ratio="1.5"></v-img>
                <v-card-actions>
                  <v-btn href="/user" block color="green" dark>
                    <h1 class="txt-thS mt-2" style="font-size: 32px;">จัดการสมาชิก</h1>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["usernow"],
  computed: {
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