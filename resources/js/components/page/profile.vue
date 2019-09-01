<template>
  <v-layout class="justify-end mt-3 mr-5 mb-3">
    <v-flex xs9 sm11>
      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap justify-space-between mb-4>
            <h2 class="txt-title mt-2">
              <v-icon large color="pink">perm_identity</v-icon>&nbsp;ข้อมูลส่วนบุคคล ({{pageShow}})
            </h2>
          </v-layout>
          <v-card>
            <v-layout row wrap justify-space-between pt-4 pl-5 pr-5 pb-4>
              <v-flex xs11 sm11 md2>
                <v-avatar :tile="tile" size="150" color="grey lighten-4">
                  <img
                    v-if="usernow.type=='student' && usernow.sex=='ชาย'"
                    src="https://sv1.picz.in.th/images/2019/06/18/1xmdjP.png"
                  />
                  <img
                    v-if="usernow.type=='student' && usernow.sex=='หญิง'"
                    src="https://sv1.picz.in.th/images/2019/06/18/1xm0vt.png"
                  />
                  <img
                    v-if="usernow.type!='student'"
                    src="https://sv1.picz.in.th/images/2019/06/18/1xmW9I.png"
                  />
                </v-avatar>
              </v-flex>
              <v-flex xs12 sm12 md10>
                <p
                  class="txt-title"
                  style="color:grey;"
                >ชื่อ {{name_title}}{{usernow.firstname}} นามสกุล {{usernow.lastname}} &emsp; ชั้น{{usernow.education}}</p>
                <p
                  class="txt-title"
                  style="color:grey;"
                >สถานะ นักเรียน &emsp; จำนวนแต้มสะสม {{usernow.point}} คะแนน &emsp; จำนวนหุ้น {{usernow.unit}} หน่วย</p>
                <p
                  v-if="usernow.email"
                  class="txt-title"
                  style="color:grey;"
                >E-mail {{usernow.email}}</p>
                <div v-if="!usernow.email && !emailConfirm">
                  <p class="txt-title" style="color:red;">
                    <v-icon color="pink">new_releases</v-icon>&nbsp;ขณะนี้คุณยังไม่ได้กรอกอีเมล์สำหรับแจ้งข่าวสารจากสหกรณ์โรงเรียน หากต้องการสมัครรับข่าวสารผ่านอีเมล์ กรุณากรอกอีเมล์ข้างล่าง
                    <v-form ref="form" v-model="valid">
                      <v-layout row wrap mt-2 justify-center>
                        <v-flex xs12 sm12 md5>
                          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3>
                          <v-btn :color="color" :disabled="!valid" @click="validate">ยืนยัน</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </p>
                </div>
                <p v-if="emailConfirm" class="txt-title" style="color:grey;">E-mail {{emailConfirm}}</p>
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>
      </v-card>
    </v-flex>
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
  props: ["usernow"],
  data() {
    return {
      valid: true,
      tile: false,
      color: "success",
      snackbar: false,
      email: "",
      emailConfirm: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.emailConfirm = this.email;
        axios
          .put("/api/user/" + this.usernow.id, {
            email: this.emailConfirm
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    }
  },
  computed: {
    name_title: function() {
      if (this.usernow.sex == "ชาย") return "เด็กชาย";
      else return "เด็กหญิง";
    },
    pageShow() {
      return 'U2'
    }
  }
};
</script>
