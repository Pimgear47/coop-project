<template>
  <v-layout class="justify-end mt-4 mr-5 mb-3">
    <v-flex xs9 sm11>
      <v-card>
        <v-container fluid grid-list-md>
          <v-card-title>
            <v-layout row wrap justify-space-between>
              <h2 class="txt-title mt-0">
                <v-icon large color="pink">description</v-icon>&nbsp;รายงานยอดขาย
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
              <td :colspan="headers.length"></td>
            </template>
          </v-data-table>
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
      document.getElementById("price").innerHTML =
        "รวม&nbsp;" + this.sumOfPrice + "&nbsp;บาท";
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