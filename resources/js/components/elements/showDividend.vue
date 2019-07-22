<template>
  <v-card>
    <v-card-title primary-title>
      <h2 class="txt-title text-md-center">{{text}}</h2>
    </v-card-title>
    <v-card-text>{{value}}</v-card-text>
  </v-card>
</template>

<script>
export default {
    props: ['text','value']
}
</script>