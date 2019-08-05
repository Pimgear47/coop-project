<template>
  <v-layout class="justify-end mt-4 mr-5 mb-3">
    <v-flex xs9 sm11>
      <v-card>
        <v-container fluid grid-list-md>
          <v-card-title>
            <v-layout row wrap justify-space-between>
              <h2 class="txt-title mt-0">
                <v-icon large color="pink">description</v-icon>&nbsp;รายงานการซิื้อ
              </h2>
              <v-flex xs12 sm5 md3>
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="รายงานประจำเดือน"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" color="pink accent-3" type="month" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-layout row wrap>
            <v-flex xs9 sm11 md5>
              <v-data-table
                :headers="headers"
                :items="filteredReport"
                :pagination.sync="pagination"
                class="elevation-1 txt-title"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.product.name }}</td>
                  <td>{{ props.item.count }}</td>
                  <td>{{ props.item.cost }}</td>
                  <td>{{ props.item.count*props.item.cost }}</td>
                </template>
                <template v-slot:footer>
                  <td :colspan="headers.length" v-if="check">
                    <b>รวมเป็นเงิน {{total}} บาท</b>
                  </td>
                </template>
              </v-data-table>
            </v-flex>
            <v-flex xs9 sm11 md7>
              <v-card>
                <v-card-title>
                  <h3 class="txt-title">กราฟวิเคราะห์ยอดซื้อ(บาท)</h3>
                </v-card-title>
                <apexchart type="donut" height="503" :options="chartOptions" :series="series" />
                <br />
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["usernow"],
  data: () => ({
    check: false,
    date: new Date().toISOString().substr(0, 7),
    pagination: {
      rowsPerPage: 7
    },
    modal: false,
    search: "",
    headers: [
      { text: "ชื่อ", sortable: false, value: "product.name" },
      { text: "จำนวน", sortable: false, value: "count" },
      {
        text: "ราคา",
        sortable: false,
        value: "cost"
      },
      { text: "รวมเป็นเงิน", sortable: false, value: "cost*count" }
    ],
    reports: [],
    price: [],
    forCountSumPrice: [],
    chartOptions: {
      chart: {
        type: "donut"
      },
      labels: [
        "อาหาร/เครื่องดื่ม",
        "เสื้อผ้า/เครื่องแต่งกาย/ชุดเครื่องนอน",
        "อุปกรณ์เครื่องเขียน"
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    },
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
      console.log("this.filteredReport", this.filteredReport);
    }
  },
  computed: {
    series: function() {
      var series = [0, 0, 0];
      for (var i = 0; i < this.filteredReport.length; i++) {
        if (this.filteredReport[i].product.type == "food") {
          series[0] +=
            this.filteredReport[i].count * this.filteredReport[i].cost;
        } else if (this.filteredReport[i].product.type == "clothes") {
          series[1] +=
            this.filteredReport[i].count * this.filteredReport[i].cost;
        } else {
          series[2] +=
            this.filteredReport[i].count * this.filteredReport[i].cost;
        }
      }
      return series;
    },
    filteredReport: function() {
      var arrReport = [];
      arrReport = this.reports.filter(report => {
        return (
          report.iduser == this.usernow.id &&
          report.created_at.substr(0, 7) == this.date
        );
      });
      this.forCountSumPrice = arrReport;
      const result = [
        ...arrReport
          .reduce((mp, o) => {
            const key = JSON.stringify([o.cost, o.product]);
            if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
            mp.get(key).count++;
            return mp;
          }, new Map())
          .values()
      ];
      console.log("result", result);
      this.check = true;
      return result;
    },
    total: function() {
      let total = [];
      Object.entries(this.forCountSumPrice).forEach(([key, val]) => {
        total.push(val.cost);
      });
      return total.reduce(function(total, num) {
        return total + num;
      }, 0);
    }
  }
};
</script>