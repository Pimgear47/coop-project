<template>
  <v-layout class="justify-end mt-4 mr-5 mb-3">
    <v-flex xs9 sm11>
      <v-card>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            <h3>
              <v-icon large color="pink">monetization_on</v-icon>
              &nbsp;รายงานปันผลและเฉลี่ยคืน ({{pageShow}})
            </h3>
          </v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <date-show></date-show>
          <v-spacer></v-spacer>
          <year-education text="ประจำปีการศึกษา "></year-education>
        </v-toolbar>
        <v-container grid-list-xl text-xs-center>
          <v-layout justify-space-between row wrap>
            <v-flex xs12 sm5 md4>
              <v-data-table
                :items="monthReport"
                class="elevation-1 txt-title"
                hide-actions
                hide-headers
              >
                <template v-slot:items="props">
                  <td class="text-xs-center">{{ props.item.title }} {{yearEd(props.item.id)}}</td>
                  <td class="text-xs-center">{{ props.item.data }} บาท</td>
                </template>
              </v-data-table>
            </v-flex>
            <v-flex xs12 sm5 md8>
              <apexchart type="line" height="408" :options="chartOptions" :series="series" />
              <v-container grid-list-xl text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12 sm5 md6>
                    <show-dividend text="ยอดปันผลจากหุ้น(บาท)" :value="Math.round(usernow.unit)"></show-dividend>
                  </v-flex>
                  <v-flex xs12 sm5 md6>
                    <show-dividend
                      text="ยอดเฉลี่ยคืนจากการซื้อ(บาท)"
                      :value="Math.round(this.totalPaid*0.02)"
                    ></show-dividend>
                  </v-flex>
                </v-layout>
              </v-container>
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
    date: new Date(),
    reports: [],
    chartOptions: {
      chart: {
        type: "line",
        shadow: {
          enabled: false,
          color: "#bbb",
          top: 3,
          left: 2,
          blur: 3,
          opacity: 1
        }
      },
      stroke: {
        width: 6,
        curve: "smooth"
      },
      xaxis: {
        categories: [
          "พฤษภาคม",
          "มิถุนายน",
          "กรกฎาคม",
          "สิงหาคม",
          "กันยายน",
          "ตุลาคม",
          "พฤษจิกายน",
          "ธันวาคม",
          "มกราคม",
          "กุมภาพันธ์",
          "มีนาคม",
          "เมษายน"
        ]
      },
      title: {
        text: "กราฟแสดงยอดใช้จ่ายรายเดือน",
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 4,
        opacity: 0.9,
        colors: ["#FFA41B"],
        strokeColor: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      yaxis: {
        title: {
          text: "ยอดใช้จ่าย"
        }
      }
    }
  }),
  computed: {
    series: function() {
      var series = [
        {
          name: "ยอดใช้จ่าย",
          data: []
        }
      ];
      let self = this;
      for (var i = 0; i < this.monthReport.length; i++) {
        series[0].data.push(this.monthReport[i].data);
      }
      return series;
    },
    totalPaid: function() {
      var totalPaid = 0;
      for (var i = 0; i < this.filteredReport.length; i++) {
        totalPaid += this.filteredReport[i].count * this.filteredReport[i].cost;
      }
      return totalPaid;
    },
    filteredReport: function() {
      var arrReport = [];
      arrReport = this.reports.filter(report => {
        return report.iduser == this.usernow.id;
      });
      const result = [
        ...arrReport
          .reduce((mp, o) => {
            const key = JSON.stringify([
              o.cost,
              o.product,
              o.created_at.substr(0, 7)
            ]);
            if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
            mp.get(key).count++;
            return mp;
          }, new Map())
          .values()
      ];
      return result;
    },
    monthReport: function() {
      var month = [
        {
          id: "05",
          title: "พฤษภาคม",
          data: 0
        },
        {
          id: "06",
          title: "มิถุนายน",
          data: 0
        },
        {
          id: "07",
          title: "กรกฎาคม",
          data: 0
        },
        {
          id: "08",
          title: "สิงหาคม",
          data: 0
        },
        {
          id: "09",
          title: "กันยายน",
          data: 0
        },
        {
          id: "10",
          title: "ตุลาคม",
          data: 0
        },
        {
          id: "11",
          title: "พฤศจิกายน",
          data: 0
        },
        {
          id: "12",
          title: "ธันวาคม",
          data: 0
        },
        {
          id: "01",
          title: "มกราคม",
          data: 0
        },
        {
          id: "02",
          title: "กุมพาพันธ์",
          data: 0
        },
        {
          id: "03",
          title: "มีนาคม",
          data: 0
        },
        {
          id: "04",
          title: "เมษายน",
          data: 0
        }
      ];
      for (var i = 0; i < this.filteredReport.length; i++) {
        var idenID = this.filteredReport[i].created_at.substr(5, 2);
        month.find(x => x.id === idenID).data +=
          this.filteredReport[i].count * this.filteredReport[i].cost;
        this.totalPaid +=
          this.filteredReport[i].count * this.filteredReport[i].cost;
      }
      return month;
    },
    pageShow() {
      return 'U1'
    }
  },
  created() {
    this.getReportData();
  },
  methods: {
    yearEd(id) {
      var month = parseInt(id);
      if (month >= 5) {
        return this.date.getFullYear() + 543;
      } else {
        return this.date.getFullYear() + 544;
      }
    },
    getReportData() {
      axios.get("api/reportuser").then(response => {
        this.reports = response.data;
      });
    }
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
