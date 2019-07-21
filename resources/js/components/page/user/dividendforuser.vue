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
        <v-spacer>
        </v-spacer>
        <year-education></year-education>
      </v-toolbar>
      
    </v-flex>
  </v-layout>
</template>

<script>
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
        total.push(val.unit * 10 * 0.1 + val.total * 0.23);
      });
      return total.reduce(function(total, num) {
        return total + num;
      }, 0);
    },
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
    }
  }
};
</script>