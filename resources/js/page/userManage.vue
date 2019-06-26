<template>
  <v-layout class="justify-end mt-3 mr-5 mb-3">
    <v-flex xs9 sm11>
      <v-toolbar flat color="white">
        <v-toolbar-title>
          <h2>สมาชิกในระบบ</h2>
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
              <span class="headline">{{ formTitle }}</span>
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
                      v-model="editItem.level"
                      v-validate="'required'"
                      label="ระดับชั้น*"
                      data-vv-name="level"
                      :error-messages="errors.collect('level')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editItem.room"
                      v-validate="'required'"
                      label="ห้อง*"
                      data-vv-name="room"
                      :error-messages="errors.collect('room')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editItem.email" label="email"></v-text-field>
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
          <td>{{ props.item.level }}</td>
          <td>{{ props.item.room }}</td>
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
export default {
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    pagination: {
      rowsPerPage: 10
    },
    snackbar: false,
    color: "success",
    editid: null,
    search: "",
    dialog: false,
    statusTypes: ["staff", "student"],
    headers: [
      { text: "ชื่อ", sortable: false, value: "firstname" },
      { text: "นามสกุล", sortable: false, value: "lastname" },
      { text: "รหัส", value: "code" },
      { text: "Email", sortable: false, value: "email" },
      { text: "สถานะ", value: "type" },
      { text: "คะแนน", value: "point" },
      { text: "ระดับชั้น", value: "level" },
      { text: "ห้อง", value: "room" },
      { text: "จำนวนหุ้น", value: "unit" }
    ],
    users: [],
    editIndex: -1,
    editItem: {
      firstname: "",
      lastname: "",
      code: "",
      email: "",
      type: "",
      point: 0,
      level: null,
      room: null,
      bdate: null,
      unit: 0
    },
    defaultItem: {
      firstname: "",
      lastname: "",
      code: "",
      email: "",
      type: "",
      point: 0,
      level: null,
      room: null,
      bdate: null,
      unit: 0
    }
  }),
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
        this.editItem.level &&
        this.editItem.room &&
        this.editItem.bdate
      ) {
        return true;
      } else {
        return false;
      }
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
    save() {
      this.$validator.validateAll();
      if (this.editIndex > -1) {
        //กรณีที่เคยมี Edit
        Object.assign(this.users[this.editIndex], this.editItem) &&
          axios.put("/api/user/" + this.editid, {
            firstname: this.editItem.firstname,
            lastname: this.editItem.lastname,
            code: this.editItem.code,
            email: this.editItem.email,
            type: this.editItem.type,
            point: this.editItem.point,
            level: this.editItem.level,
            room: this.editItem.room,
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
              type: this.editItem.type,
              point: this.editItem.point,
              level: this.editItem.level,
              room: this.editItem.room,
              unit: this.editItem.unit,
              bdate: this.editItem.bdate
            });
          this.snackbar = true;
          this.close();
        }
      }
    }
  }
};
</script>