<template>
  <v-layout class="justify-end mt-3 mr-5 mb-3">
    <v-flex xs9 sm11>
      <v-toolbar flat color="white">
        <v-toolbar-title>
          <h3>
            <v-icon large color="pink">supervised_user_circle</v-icon>
            &nbsp;สมาชิกในระบบ ({{pageShow}})
            <!-- <v-btn color="primary" dark class="mb-2 txt-title" @click="genBC">GenBC</v-btn> -->
          </h3>
        </v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line></v-text-field>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2 txt-title" v-on="on">New User</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <h2 class="txt-title">{{ formTitle }}</h2>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-validate="'required'"
                      v-model="editItem.firstname"
                      label="ชื่อ*"
                      data-vv-name="firstname"
                      :error-messages="errors.collect('firstname')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-validate="'required'"
                      v-model="editItem.lastname"
                      label="นามสกุล*"
                      data-vv-name="lastname"
                      :error-messages="errors.collect('lastname')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      :items="statusSex"
                      v-model="editItem.sex"
                      item-text="title"
                      label="เพศ*"
                      v-validate="'required'"
                      data-vv-name="sex"
                      :error-messages="errors.collect('sex')"
                      required
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-validate="'required'"
                      v-model="editItem.code"
                      label="รหัส*"
                      data-vv-name="code"
                      :error-messages="errors.collect('code')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      :items="statusTypes"
                      v-model="editItem.type"
                      item-text="title"
                      label="สถานะ*"
                      v-validate="'required'"
                      data-vv-name="type"
                      :error-messages="errors.collect('type')"
                      required
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editItem.education"
                      v-validate="'required'"
                      label="ระดับชั้น*"
                      data-vv-name="education"
                      :error-messages="errors.collect('education')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editItem.point" label="คะแนน"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editItem.unit" label="จำนวนหุ้น"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-if="editIndex=='-1'"
                      v-model="editItem.bdate"
                      v-validate="'required'"
                      label="วันเดือนปีเกิด*"
                      data-vv-name="bdate"
                      :error-messages="errors.collect('bdate')"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog2" max-width="900px">
          <template v-slot:activator="{ on }">
            <v-btn color="success" dark class="mb-2 txt-title" v-on="on">
              Upload&nbsp;
              <img
                width="30"
                src="http://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/ms-excel-icon.png"
              />
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <h2 class="txt-title">Upload from CSV file</h2>
            </v-card-title>
            <v-card-text>
              <v-layout wrap>
                <label for="csv_file" class="control-label col-sm-3 text-right">CSV file to import</label>
                <input
                  hidden
                  type="file"
                  id="csv_file"
                  name="csv_file"
                  class="form-control"
                  @change="loadCSV($event)"
                />
                <table v-if="parse_csv">
                  <thead>
                    <tr>
                      <th v-for="key in parse_header">
                        {{ key | capitalize }}
                        <span class="arrow"></span>
                      </th>
                    </tr>
                  </thead>
                  <tr v-for="csv in parse_csv" :key="csv">
                    <td v-for="key in parse_header" :key="key">{{csv[key]}}</td>
                  </tr>
                </table>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close2">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="saveDataSet">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        :pagination.sync="pagination"
        class="elevation-1 txt-title"
      >
        <template v-slot:items="props">
          <td>{{ props.item.firstname }}</td>
          <td>{{ props.item.lastname }}</td>
          <td>{{ props.item.code }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.type }}</td>
          <td>{{ props.item.point }}</td>
          <td>{{ props.item.education }}</td>
          <td>{{ props.item.unit }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editUser(props.item.id,props.item)">edit</v-icon>
            <v-icon small @click="deleteUser(props.item.id,props.item)">delete</v-icon>
          </td>
        </template>
        <template v-slot:no-results>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </template>
      </v-data-table>
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
import { Ean13Utils } from "ean13-lib";
export default {
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    parse_header: [],
    parse_csv: [],
    sortOrders: {},
    sortKey: "",
    pagination: {
      rowsPerPage: 12
    },
    snackbar: false,
    color: "success",
    editid: null,
    search: "",
    dialog: false,
    dialog2: false,
    statusTypes: ["staff", "student"],
    statusSex: ["ชาย", "หญิง"],
    headers: [
      { text: "ชื่อ", sortable: false, value: "firstname" },
      { text: "นามสกุล", sortable: false, value: "lastname" },
      { text: "รหัส", value: "code" },
      { text: "Email", sortable: false, value: "email" },
      { text: "สถานะ", value: "type" },
      { text: "คะแนน", value: "point" },
      { text: "ระดับชั้น", value: "education" },
      { text: "จำนวนหุ้น", value: "unit" }
    ],
    users: [],
    editIndex: -1,
    editItem: {
      firstname: "",
      lastname: "",
      code: "",
      barcode: "",
      type: "",
      sex: "",
      point: 0,
      education: null,
      bdate: null,
      unit: 0
    },
    defaultItem: {
      firstname: "",
      lastname: "",
      code: "",
      type: "",
      sex: "",
      point: 0,
      education: null,
      bdate: null,
      unit: 0
    }
  }),
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  computed: {
    formTitle() {
      return this.editIndex === -1 ? "เพิ่มสมาชิกใหม่" : "แก้ไขข้อมูลสมาชิก";
    },
    checkInput: function() {
      if (
        this.editItem.firstname &&
        this.editItem.lastname &&
        this.editItem.code &&
        this.editItem.type &&
        this.editItem.sex &&
        this.editItem.education &&
        this.editItem.bdate
      ) {
        return true;
      } else {
        return false;
      }
    },
    pageShow() {
      return "A5";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      axios.get("api/user").then(response => {
        this.users = response.data;
      });
    },
    editUser(id, item) {
      this.editIndex = this.users.indexOf(item);
      this.editItem = Object.assign({}, item);
      this.dialog = true;
      this.editid = id;
    },
    deleteUser(id, item) {
      const index = this.users.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.users.splice(index, 1) &&
        axios.delete("api/user/" + id).catch(error => {
          console.log(error);
        });
    },
    close() {
      this.$validator.reset();
      this.dialog = false;
      this.editItem = Object.assign({}, this.defaultItem);
      this.editIndex = -1;
    },
    close2() {
      this.parse_csv = [];
      this.parse_header = [];
      this.sortOrders = {};
      this.sortKey = "";
      let file = document.getElementById("csv_file");
      if (file.value) {
        file.value = "";
      }
      this.dialog2 = false;
    },
    save() {
      this.$validator.validateAll();
      let forBarcode = "1000000" + this.editItem.code + "1";
      const result = Ean13Utils.calculateCheckDigit(forBarcode);
      this.editItem.barcode = forBarcode + result;
      if (this.editIndex > -1) {
        //กรณีที่เคยมี Edit
        Object.assign(this.users[this.editIndex], this.editItem) &&
          axios.put("/api/user/" + this.editid, {
            firstname: this.editItem.firstname,
            lastname: this.editItem.lastname,
            code: this.editItem.code,
            barcode: this.editItem.barcode,
            type: this.editItem.type,
            sex: this.editItem.sex,
            point: this.editItem.point,
            education: this.editItem.education,
            unit: this.editItem.unit
          });
        this.snackbar = true;
        this.close();
      } else {
        if (this.checkInput) {
          this.users.push(this.editItem) &&
            axios.post("/api/user", {
              firstname: this.editItem.firstname,
              lastname: this.editItem.lastname,
              code: this.editItem.code,
              barcode: this.editItem.barcode,
              type: this.editItem.type,
              sex: this.editItem.sex,
              point: this.editItem.point,
              education: this.editItem.education,
              unit: this.editItem.unit,
              bdate: this.editItem.bdate
            });
          this.snackbar = true;
          this.close();
        }
      }
    },
    csvJSON(csv) {
      var vm = this;
      var lines = csv.split("\n");
      var result = [];
      var headers = lines[0].split(",");
      vm.parse_header = lines[0].split(",");
      lines[0].split(",").forEach(function(key) {
        vm.sortOrders[key] = 1;
      });
      lines.map(function(line, indexLine) {
        if (indexLine < 1) return; // Jump header line
        var obj = {};
        var currentline = line.split(",");
        headers.map(function(header, indexHeader) {
          obj[header] = currentline[indexHeader];
        });
        result.push(obj);
      });
      result.pop(); // remove the last item because undefined values
      return result; // JavaScript object
    },
    loadCSV(e) {
      var vm = this;
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        // Handle errors load
        reader.onload = function(event) {
          var csv = event.target.result;
          vm.parse_csv = vm.csvJSON(csv);
        };
        reader.onerror = function(evt) {
          if (evt.target.error.name == "NotReadableError") {
            alert("Canno't read file !");
          }
        };
      } else {
        alert("FileReader are not supported in this browser.");
      }
    },
    saveDataSet() {
      console.log(this.parse_csv);
      for (var i = 0; i < this.parse_csv.length; i++) {
        let forBarcode = "1000000" + this.parse_csv[i].code + "1";
        const result = Ean13Utils.calculateCheckDigit(forBarcode);
        this.editItem.firstname = this.parse_csv[i].firstname;
        this.editItem.lastname = this.parse_csv[i].lastname;
        this.editItem.code = this.parse_csv[i].code;
        this.editItem.barcode = forBarcode + result;
        this.editItem.type = "student";
        this.editItem.sex = this.parse_csv[i].sex;
        this.editItem.education = this.parse_csv[i].education;
        this.editItem.bdate = this.parse_csv[i].birthDate;
        this.users.push(this.editItem) &
          axios.post("/api/user", {
            firstname: this.parse_csv[i].firstname,
            lastname: this.parse_csv[i].lastname,
            code: this.parse_csv[i].code,
            barcode: this.editItem.barcode,
            education: this.parse_csv[i].education,
            bdate: this.parse_csv[i].birthDate,
            sex: this.parse_csv[i].sex,
            type: "student",
            point: 0,
            unit: 0
          });
        this.editItem = Object.assign({}, this.defaultItem);
      }
      this.snackbar = true;
      this.close2();
    },
    // genBC() {
    //   let forBarcode = "1000000" + this.users[3924].code + "1";
    //   const result = Ean13Utils.calculateCheckDigit(forBarcode);
    //   this.editItem.barcode = forBarcode + result;
    //   axios.put("/api/user/" + this.users[3924].id, {
    //     barcode: this.editItem.barcode
    //   });
    // }
  }
};
</script>


<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>