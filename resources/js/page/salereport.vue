<template>
  <v-layout class="justify-end mt-3 mr-5 mb-3">
    <v-flex xs9 sm11>
      <v-toolbar flat color="white">
        <v-toolbar-title>
          <h2>รายงานการซื้อ</h2>
        </v-toolbar-title>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="filteredReport"
        :pagination.sync="pagination"
        class="elevation-1 txt-title"
      >
        <template v-slot:items="props">
          <td>{{ props.item.product.name }}</td>
          <td>{{ props.item.product.price }}</td>
          <td>{{ props.item.created_at }}</td>
        </template>
        <template v-slot:footer>
          <td :colspan="headers.length">
            <v-btn @click="calSum">ดูยอดรวมรายจ่ายทั้งหมด</v-btn>
            <strong id="price"></strong>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["usernow"],
  data: () => ({
    check: false,
    pagination: {
      rowsPerPage: 10
    },
    search: "",
    headers: [
      { text: "ชื่อ", sortable: false, value: "product.name" },
      { text: "ราคา", sortable: false, value: "product.price" },
      { text: "วันเวลาที่ทำรายการ", sortable: false, value: "created_at" }
    ],
    reports: [],
    sumOfPrice: 0
  }),
  mounted() {
    this.getReportData();
  },
  methods: {
    getReportData() {
      axios
        .get("api/reportuser")
        .then(response => {
          this.reports = response.data;
        })
        .then();
    },
    calSum() {
      console.log(this.filteredReport.length);
      this.check = true;
      var step;
      for (step = 0; step < this.filteredReport.length; step++) {
        this.sumOfPrice += this.filteredReport[step].product.price;
      }
      console.log(this.sumOfPrice);
      document.getElementById("price").innerHTML = "รวม&nbsp;" + this.sumOfPrice + "&nbsp;บาท";
    }
  },
  computed: {
    filteredReport: function() {
      return this.reports.filter(report => {
        return report.iduser == this.usernow.id;
      });
    }
  }
};
</script>