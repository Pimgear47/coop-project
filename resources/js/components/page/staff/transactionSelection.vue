<template>
  <v-layout class="justify-end mt-4 mr-5 mb-3">
    <v-flex xs9 sm11>
      <h2 class="txt-title mt-2">
        <v-icon large color="pink">assignment_turned_in</v-icon>
        &nbsp;ทำรายการ ({{pageShow}})
      </h2>
      <br />
      <v-card>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap justify-space-between pt-4 pl-5 pr-5 pb-4>
            <v-flex xs12 sm6>
              <v-card>
                <v-img src="https://sv1.picz.in.th/images/2019/09/18/cYuy1S.png" aspect-ratio="1.5"></v-img>
                <v-card-actions>
                  <v-btn href="/transaction-gen" block color="green" dark class="txt-title">ทำรายการทั่วไป</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm6>
              <v-card>
                <v-img src="https://sv1.picz.in.th/images/2019/09/18/cYuFDn.jpg" aspect-ratio="1.5"></v-img>
                <v-card-actions>
                  <v-btn href="/transaction" block color="green" dark class="txt-title">ทำรายการแบบรับใบเสร็จ</v-btn>
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