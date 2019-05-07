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
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
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
  
      <v-list class="pt-0" dense v-if="usernow.admin">
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
      <v-list class="pt-0" dense v-if="usernow.admin!=1">
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
  },
  data () {
    return {
      drawer: true,
      itemsAdmin: [
        { title: 'หน้าแรก', icon: 'dashboard' , link: '/' },
        { title: 'รายการสินค้า', icon: 'shopping_cart' , link: '/product' },
        { title: 'ทำรายการ', icon: 'assignment_turned_in' , link: '#' },
        { title: 'ดูรายงานยอดขาย', icon: 'description' , link: '#' },
        { title: 'ดูรายงานปันผล/เฉลี่ยคืน', icon: 'monetization_on' , link: '#' },
        { title: 'ปฏิทินกำหนดการ', icon: 'date_range' , link: '#' },
        { title: 'จัดการสมาชิก', icon: 'supervised_user_circle' , link: '/user' },
      ],
      itemsUser: [
        { title: 'หน้าแรก', icon: 'dashboard' , link: '/' },
        { title: 'รายการสินค้า', icon: 'shopping_cart' , link: '/product' },
        { title: 'ดูยอดปันผล', icon: 'monetization_on' , link: '#' },
        { title: 'ปฏิทินกำหนดการ', icon: 'date_range' , link: '#' },
      ],
      mini: true,
      right: null
    }
}};
</script>
