<template>
  <v-layout class="justify-end mt-3 mr-5 mb-3">
    <v-flex xs9 sm11>
      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap class="mb-1">
            <h2 class="txt-title mt-2">
              <v-icon large color="pink">date_range</v-icon>&nbsp;ปฏิทินกำหนดการ
            </h2>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              v-if="usernow.admin=='1'"
              dark
              class="mb-2 txt-title"
              @click="dialog = true"
            >เพิ่มกำหนดการ</v-btn>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm3>
              <v-card height="500">
                <v-toolbar color="primary" dark>
                  <v-btn dark icon @click="$refs.calendar.prev()">
                    <v-icon>chevron_left</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <h3 class="txt-title">กำหนดการ</h3>
                  <v-spacer></v-spacer>
                  <v-btn dark icon @click="$refs.calendar.next()">
                    <v-icon>chevron_right</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-list two-line style="max-height: 435px" class="scroll-y">
                  <template v-for="(item, index) in eventsFil">
                    <v-list-tile :key="index" avatar ripple @click="goTo(item.date)">
                      <v-list-tile-content>
                        <v-list-tile-title class="txt-title">{{ item.title }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.details }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider v-if="index + 1 < events.length" :key="`divider-${index}`"></v-divider>
                  </template>
                </v-list>
              </v-card>
            </v-flex>
            <v-flex xs12 sm9>
              <v-card>
                <v-sheet height="500">
                  <v-calendar
                    ref="calendar"
                    v-model="start"
                    type="month"
                    :end="end"
                    color="primary"
                    class="txt-title"
                  >
                    <template v-slot:day="{ date }">
                      <template v-for="event in eventsMap[date]">
                        <v-menu :key="event.title" full-width offset-x>
                          <template v-slot:activator="{ on }">
                            <div
                              v-if="!event.time"
                              v-ripple
                              class="my-event"
                              v-on="on"
                              v-html="event.title"
                            ></div>
                          </template>
                          <v-card color="grey lighten-4" min-width="350px" flat>
                            <v-toolbar color="primary" dark>
                              <v-btn
                                icon
                                v-if="usernow.admin=='1'"
                                @click="editEvent(event.id,event)"
                              >
                                <v-icon>edit</v-icon>
                              </v-btn>
                              <v-toolbar-title class="txt-title" v-html="event.title"></v-toolbar-title>
                              <v-spacer></v-spacer>
                              <v-btn
                                icon
                                v-if="usernow.admin=='1'"
                                @click="deleteEvent(event.id,event)"
                              >
                                <v-icon>delete</v-icon>
                              </v-btn>
                            </v-toolbar>
                            <v-card-title primary-title>
                              <span v-html="event.details"></span>
                            </v-card-title>
                            <v-card-actions>
                              <v-btn flat color="secondary">Close</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-menu>
                      </template>
                    </template>
                  </v-calendar>
                </v-sheet>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <h2 class="txt-title">{{formTitle}}</h2>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  v-model="editItem.title"
                  label="ชื่อกิจกรรม*"
                  v-validate="'required'"
                  :error-messages="errors.collect('title')"
                  data-vv-name="title"
                  required
                  attach
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  v-model="editItem.details"
                  label="รายละเอียด*"
                  v-validate="'required'"
                  :error-messages="errors.collect('details')"
                  data-vv-name="details"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="editItem.date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="editItem.date"
                      label="เลือกวันเดือนปี*"
                      prepend-icon="event"
                      v-validate="'required'"
                      :error-messages="errors.collect('date')"
                      data-vv-name="date"
                      readonly
                      v-on="on"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="editItem.date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu.save(editItem.date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-checkbox v-model="checkNoti" label="แจ้งเตือนผ่านอีเมล์ให้แก่สมาชิก"></v-checkbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  mounted() {
    this.getEventData();
    console.log("events", this.events);
  },
  $_veeValidate: {
    validator: "new"
  },
  props: ["usernow"],
  data() {
    return {
      start: new Date().toISOString().substr(0, 7) + "-01",
      end: new Date().toISOString().substr(0, 7) + "-30",
      type: "month",
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      menu: false,
      checkNoti: false,
      events: [],
      color: "success",
      snackbar: false,
      dialog: false,
      editid: null,
      type: "",
      editIndex: -1,
      editItem: {
        title: "",
        details: "",
        date: ""
      },
      defItem: {
        title: "",
        details: "",
        date: ""
      }
    };
  },
  methods: {
    open(event) {
      alert(event.title);
    },
    goTo(date) {
      var newStart = date.substr(0, 7) + "-01";
      this.start = newStart;
    },
    getEventData() {
      axios.get("api/event").then(response => {
        console.log(response.data);
        this.events = response.data;
      });
    },
    editEvent(id, item) {
      this.editIndex = this.events.indexOf(item);
      this.editItem = Object.assign({}, item);
      this.dialog = true;
      this.editid = id;
    },
    deleteEvent(id, item) {
      const index = this.events.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.events.splice(index, 1) &&
        axios.delete("api/event/" + id).catch(error => {
          console.log(error);
        });
    },
    save() {
      console.log();
      this.$validator.validateAll(this.editItem);
      if (this.editIndex > -1) {
        Object.assign(this.events[this.editIndex], this.editItem) &&
          axios.put("/api/event/" + this.editid, {
            title: this.editItem.title,
            details: this.editItem.details,
            date: this.editItem.date
          });
        this.snackbar = true;
        this.close();
      } else {
        if (this.checkInput) {
          this.events.push(this.editItem) &&
            axios
              .post("/api/event", {
                title: this.editItem.title,
                details: this.editItem.details,
                date: this.editItem.date
              })
              .then(
                response => {
                  console.log(response);
                },
                error => {
                  console.log(error);
                }
              );
          if (this.checkNoti) {
            console.log("SENT!!!");
            var mail =
              "mailto:p.madhero@gmail.com?subject=New Mail&body=Mail text body";
            var mlink = document.createElement("a");
            mlink.setAttribute("href", mail);
            mlink.click();
          }
          this.snackbar = true;
          this.close();
        }
      }
    },
    close() {
      this.$validator.reset();
      this.dialog = false;
      this.editIndex = -1;
      this.editItem = Object.assign({}, this.defItem);
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  computed: {
    eventsMap() {
      const map = {};
      this.eventsFil.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    },
    formTitle() {
      return this.editIndex === -1 ? "เพิ่มกำหนดการ" : "แก้ไขกำหนดการ";
    },
    formAddOrEdit() {
      if (this.editIndex === -1) return true;
      else return false;
    },
    checkInput: function() {
      if (this.editItem.title && this.editItem.details && this.editItem.date) {
        return true;
      } else {
        return false;
      }
    },
    eventsFil: function() {
      return this.events.filter(event => {
        return event.date >= this.date;
      });
    }
  }
};
</script>


<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 10px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>
