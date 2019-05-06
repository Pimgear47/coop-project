<template>
  <v-carousel height="100%">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://www.img.in.th/images/0a1b35dd1d3fb4e9604df679ea0c3aa7.png'
          },
          {
            src: 'https://www.img.live/images/2019/05/06/Scrot_5-copy.png'
          },
          {
            src: 'https://lh3.googleusercontent.com/p/AF1QipNH8ndFeuTs40hsiYLK8A3k4Lpgh0jrdkJ8Y6dY=w1024-k'
          },
          {
            src: 'https://www.img.live/images/2019/05/06/5193fc1.png'
          }
        ]
      }
    }
  }
</script>