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
          <td :colspan="headers.length" v-if="check">รวมเป็นเงิน {{total}} บาท</td>
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
    price: [],
    sumPrice: 0
  }),
  mounted() {
    this.getReportData();
  },
  methods: {
    getReportData() {
      axios
        .get("api/reportuser")
        .then(response => {
          var data = response.data;
          this.reports = data;
          console.log("reports", this.reports);
          this.mapPrice();
        })
        .then();
    },
    mapPrice() {
      console.log("MapPrice");
      for (var i = 0; i < this.reports.length; i++) {
        this.price.push(this.reports[i].product.price);
      }
      this.sumPrice = this.price.reduce((a, b) => a + b, 0);
      this.check = true;
    }
  },
  computed: {
    filteredReport: function() {
      return this.reports.filter(report => {
        return report.iduser == this.usernow.id;
      });
    },
    total: function() {
      let total = [];
      Object.entries(this.filteredReport).forEach(([key, val]) => {
        total.push(val.product.price);
      });
      return total.reduce(function(total, num) {
        return total + num;
      }, 0);
    }
  }
};
</script>