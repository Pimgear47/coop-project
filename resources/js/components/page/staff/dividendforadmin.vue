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
        <date-show></date-show>
        <v-spacer></v-spacer>
        <year-education text="ประจำปีการศึกษา "></year-education>
      </v-toolbar>
      <v-layout class="justify-end">
        <v-btn color="primary" @click="reportPdf()">พิมพ์รายงานปันผลและเฉลี่ยคืน</v-btn>
        <v-spacer></v-spacer>
        <v-flex xs12 sm5 md3>
          <v-select :items="select" v-model="selected" item-text="title" label="เลือกดูระดับชั้น"></v-select>
        </v-flex>&nbsp;&nbsp;
        <v-flex xs12 sm5 md3>
          <v-text-field v-model="search" append-icon="search" label="Search" single-line></v-text-field>
        </v-flex>
      </v-layout>
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
          <td>{{ Math.round(props.item.unit*10*0.1) }}</td>
          <td>{{ props.item.total }}</td>
          <td>{{ Math.round(props.item.total * 0.02)}}</td>
          <td>{{ (Math.round(props.item.unit*10*0.1)+Math.round(props.item.total*0.02))}}</td>
        </template>
        <template v-slot:footer>
          <td :colspan="headers.length" v-if="check">
            <b>รวมเป็นเงินที่ต้องเตรียมสำหรับจ่าย {{totalSum}} บาท</b>
          </td>
        </template>
        <template v-if="search!=''" v-slot:no-results>
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
import pdfdividend from "./pdfReport/pdfdividend";
var groupArray = require("group-array");
export default {
  data: () => ({
    pagination: {
      rowsPerPage: 10
    },
    check: false,
    search: "",
    headers: [
      { text: "ชื่อ", sortable: false, value: "firstname" },
      { text: "นามสกุล", sortable: false, value: "lastname" },
      { text: "สถานะ", sortable: false, value: "type" },
      { text: "จำนวนหุ้น", value: "unit" },
      { text: "ปันผล(บาท)", value: "dividend" },
      { text: "ยอดซื้อ(บาท)", value: "total" },
      { text: "เฉลี่ยคืน(บาท)", value: "avg" },
      { text: "รวมเป็นเงิน(บาท)", value: "totalSum" }
    ],
    select: [
      "ประถมศึกษาปีที่ 1/1",
      "ประถมศึกษาปีที่ 1/2",
      "ประถมศึกษาปีที่ 1/3",
      "ประถมศึกษาปีที่ 2/1",
      "ประถมศึกษาปีที่ 2/2",
      "ประถมศึกษาปีที่ 3/1",
      "ประถมศึกษาปีที่ 3/2",
      "ประถมศึกษาปีที่ 4/1",
      "ประถมศึกษาปีที่ 4/2",
      "ประถมศึกษาปีที่ 5/1",
      "ประถมศึกษาปีที่ 5/2",
      "ประถมศึกษาปีที่ 6/1",
      "ประถมศึกษาปีที่ 6/2"
    ],
    selected: "",
    users: [],
    forCountSumPrice: []
  }),
  computed: {
    filteredusers() {
      var arr = this.users.filter(user => {
        return user.type != "staff" && user.education.match(this.selected);
      });
      this.forCountSumPrice = arr;
      this.check = true;
      return arr;
    },
    totalSum: function() {
      let total = [];
      Object.entries(this.forCountSumPrice).forEach(([key, val]) => {
        total.push(
          Math.round(val.unit * 10 * 0.1) + Math.round(val.total * 0.02)
        );
      });
      return total.reduce(function(total, num) {
        return total + num;
      }, 0);
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
    getReportData() {
      axios.get("api/reportuser").then(response => {
        this.reports = response.data;
        console.log(this.reports);
      });
    },
    reportPdf() {
      let input = groupArray(this.filteredusers, "education");
      var output = [], item;
      for (var name in input) {
        item = {};
        item.name = name;
        item.data= input[name];
        output.push(item);
      }
      pdfdividend.pdfMaker(output, this.totalSum);
    }
  }
};
</script>