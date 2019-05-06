<template>
  <v-layout wrap align-center>
    <v-flex xs12 sm12 d-flex>
      <v-select
        :items="items"
        item-text="title"
        v-model="value"
        item-value="value"
        label="status"
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "student", value: "student" },
      { title: "teacher", value: "teacher" }
    ],
    value: null
  }),
};
</script>