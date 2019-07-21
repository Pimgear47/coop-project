<template>
  <v-layout class="justify-end mt-1 mr-5 mb-3">
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
        <year-education></year-education>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex xs12 sm5 md4>
          <v-data-table
            :items="monthReport"
            class="elevation-1 txt-title"
            hide-actions
            hide-headers
          >
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item.title }}</td>
              <td class="text-xs-center">{{ props.item.data }} บาท</td>
            </template>
          </v-data-table>
        </v-flex>
        <v-flex xs12 sm5 md8>
          <apexchart type="line" height="350" :options="chartOptions" :series="series" />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["usernow"],
  data: () => ({
    headers: [
      { text: "เดือน", sortable: false, value: "firstname" },
      { text: "ยอดใช้จ่าย(บาท)", sortable: false, value: "lastname" }
    ],
    reports: [],
    series: [
      {
        name: "Likes",
        data: [4, 3, 10, 9, 15, 29, 15, 22, 11, 32, 8, 23]
      }
    ],
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
        type: "datetime",
        categories: [
          "2018-01",
          "2018-02",
          "2018-03",
          "2018-04",
          "2018-05",
          "2018-06",
          "2018-07",
          "2018-08",
          "2018-09",
          "2018-10",
          "2018-11",
          "2018-12"
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
        min: 0,
        max: 40,
        title: {
          text: "ยอดใช้จ่าย"
        }
      }
    }
  }),
  computed: {
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
      }
      return month;
    }
  },
  created() {
    this.getReportData();
  },
  methods: {
    getReportData() {
      axios.get("api/reportuser").then(response => {
        this.reports = response.data;
      });
    }
  }
};
</script>