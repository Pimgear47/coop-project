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
          <td>{{ props.item.count }}</td>
          <td>{{ props.item.product.price }}</td>
          <td>{{ props.item.count*props.item.product.price }}</td>
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
      { text: "จำนวน", sortable: false, value: "created_at" },
      { text: "ราคา", sortable: false, value: "product.price" },
      { text: "รวมเป็นเงิน", sortable: false, value: "product.price*count" },
    ],
    reports: [],
    price: [],
    forCountSumPrice: [],
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
        })
        .then();
    }
  },
  computed: {
    filteredReport: function() {
      var arrReport = [];
      arrReport = this.reports.filter(report => {
        return report.iduser == this.usernow.id;
      });
      this.forCountSumPrice = arrReport;
      const result = [
        ...arrReport
          .reduce((mp, o) => {
            const key = JSON.stringify([o.idproduct, o.product]);
            if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
            mp.get(key).count++;
            return mp;
          }, new Map())
          .values()
      ];
      this.check = true;
      return result;
    },
    productSet: function() {},
    total: function() {
      let total = [];
      Object.entries(this.forCountSumPrice).forEach(([key, val]) => {
        total.push(val.product.price);
      });
      return total.reduce(function(total, num) {
        return total + num;
      }, 0);
    }
  }
};
</script>