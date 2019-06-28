<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      hide-overlay
      stateless 
      fixed 
      persistent
      style="z-index: 1"
      class="mt-5 pt-3"
    >
      <v-toolbar flat class="transparent" >
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img v-if="usernow.type=='student' && usernow.sex=='ชาย'" src="https://sv1.picz.in.th/images/2019/06/18/1xmdjP.png">
              <img v-if="usernow.type=='student' && usernow.sex=='หญิง'" src="https://sv1.picz.in.th/images/2019/06/18/1xm0vt.png">
              <img v-if="usernow.type!='student'" src="https://sv1.picz.in.th/images/2019/06/18/1xmW9I.png">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="txt-title">{{usernow.firstname}} {{usernow.lastname}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                icon
                @click.stop="mini = !mini"
              >
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
  
      <v-list class="pt-0" dense v-if="usernow.type=='staff'&&usernow.admin">
        <v-divider></v-divider>
        <v-list-tile
          v-for="item in itemsAdmin"
          :key="item.title"
          :href="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense v-if="usernow.type=='staff'&&usernow.admin!=1">
        <v-divider></v-divider>
        <v-list-tile
          v-for="item in itemsStaff"
          :key="item.title"
          :href="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense v-if="usernow.type=='student'">
        <v-divider></v-divider>
        <v-list-tile
          v-for="item in itemsUser"
          :key="item.title"
          :href="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>

  
</template>


<script>
export default {
  props: ["usernow"],
  mounted() {
    console.log("Component mounted.");
    console.log(this.usernow);
  },
  data () {
    return {
      drawer: true,
      itemsAdmin: [
        { title: 'หน้าแรก', icon: 'dashboard' , link: '/' },
        { title: 'รายการสินค้า', icon: 'shopping_cart' , link: '/product' },
        { title: 'ทำรายการ', icon: 'assignment_turned_in' , link: '/transaction' },
        { title: 'ดูรายงานยอดขาย', icon: 'description' , link: '/salereport' },
        { title: 'ดูรายงานปันผล/เฉลี่ยคืน', icon: 'monetization_on' , link: '/dividend-for-admin' },
        { title: 'ปฏิทินกำหนดการ', icon: 'date_range' , link: '#' },
        { title: 'จัดการสมาชิก', icon: 'supervised_user_circle' , link: '/user' },
      ],
      itemsStaff: [
        { title: 'หน้าแรก', icon: 'dashboard' , link: '/' },
        { title: 'รายการสินค้า', icon: 'shopping_cart' , link: '/product' },
        { title: 'ทำรายการ', icon: 'assignment_turned_in' , link: '/transaction' },
        { title: 'ปฏิทินกำหนดการ', icon: 'date_range' , link: '#' },
      ],
      itemsUser: [
        { title: 'หน้าแรก', icon: 'dashboard' , link: '/' },
        { title: 'รายการสินค้า', icon: 'shopping_cart' , link: '/product' },
        { title: 'ดูรายงานการซื้อ', icon: 'description' , link: '/reportuser' },
        { title: 'ดูยอดปันผล/เฉลี่ยคืน', icon: 'monetization_on' , link: '#' },
        { title: 'ปฏิทินกำหนดการ', icon: 'date_range' , link: '#' },
      ],
      mini: true,
      right: null
    }
}};
</script>
