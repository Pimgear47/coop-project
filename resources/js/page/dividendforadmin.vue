<template>
  <v-layout class="justify-end mt-3 mr-5 mb-3">
    <v-flex xs9 sm11>
      <v-toolbar flat color="white">
        <v-toolbar-title>
          <h3>
            <v-icon large color="pink">monetization_on</v-icon>&nbsp;รายงานปันผลและเฉลี่ยคืน
          </h3>
        </v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line></v-text-field>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="filteredusers"
        :search="search"
        :pagination.sync="pagination"
        class="elevation-1 txt-title"
      >
        <template v-slot:items="props">
          <td>{{ props.item.firstname }}</td>
          <td>{{ props.item.lastname }}</td>
          <td>{{ props.item.type }}</td>
          <td>{{ props.item.unit }}</td>
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
  data: () => ({
    pagination: {
      rowsPerPage: 10
    },
    search: "",
    headers: [
      { text: "ชื่อ", sortable: false, value: "firstname" },
      { text: "นามสกุล", sortable: false, value: "lastname" },
      { text: "สถานะ", sortable: false, value: "type" },
      // { text: "ระดับชั้น", value: "level" },
      // { text: "ห้อง", value: "room" },
      { text: "จำนวนหุ้น", value: "unit" },
      { text: "ปันผล(บาท)", value: "dividend" },
      { text: "เฉลี่ยคืน(บาท)", value: "avg" },
      { text: "รวมเป็นเงิน(บาท)", value: "total" }
    ],
    users: [],
  }),
  computed: {
    filteredusers() {
      return this.users.filter(user => {
        return user.type != "staff";
      });
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
  }
};
</script>