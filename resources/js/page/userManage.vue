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
                    <v-text-field v-model="editedItem.firstname" label="ชื่อ"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.lastname" label="นามสกุล"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.code" label="รหัส"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.email" label="email"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.type" label="สถานะ"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.point" label="คะแนน"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.level" label="ระดับชั้น"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.room" label="ห้อง"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.unit" label="จำนวนหุ้น"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.bdate" label="วันเดือนปีเกิด"></v-text-field>
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
            <v-icon small class="mr-2" @click="editItem(props.item.id,props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item.id,props.item)">delete</v-icon>
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
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    pagination: {
      rowsPerPage: 10
    },
    editid: null,
    search: "",
    dialog: false,
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
    editedIndex: -1,
    editedItem: {
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
      return this.editedIndex === -1 ? "New User" : "Edit User";
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
    editItem(id, item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editid = id;
    },
    deleteItem(id, item) {
      const index = this.users.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.users.splice(index, 1) &&
        axios.delete("api/user/" + id).catch(error => {
          console.log(error);
        });
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        //กรณีที่เคยมี Edit
        Object.assign(this.users[this.editedIndex], this.editedItem) &&
          axios.put("/api/user/" + this.editid, {
            firstname: this.editedItem.firstname,
            lastname: this.editedItem.lastname,
            code: this.editedItem.code,
            email: this.editedItem.email,
            type: this.editedItem.type,
            point: this.editedItem.point,
            level: this.editedItem.level,
            room: this.editedItem.room,
            unit: this.editedItem.unit
          });
      } else {
        this.users.push(this.editedItem)
        &&
          axios.post("/api/user", {
            firstname: this.editedItem.firstname,
            lastname: this.editedItem.lastname,
            code: this.editedItem.code,
            type: this.editedItem.type,
            point: this.editedItem.point,
            level: this.editedItem.level,
            room: this.editedItem.room,
            unit: this.editedItem.unit,
            bdate: this.editedItem.bdate,
          });
      }
      this.close();
    }
  }
};
</script>