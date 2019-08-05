<template>
  <h3>{{dateDisplay}}</h3>
</template>

<script>
export default {
  data: () => ({
    date: new Date()
  }),
  computed: {
    dateDisplay() {
      var month = new Array();
      month[0] = "มกราคม";
      month[1] = "กุมภาพันธ์";
      month[2] = "มีนาคม";
      month[3] = "เมษายน";
      month[4] = "พฤษภาคม";
      month[5] = "มิถุนายน";
      month[6] = "กรกฎาคม";
      month[7] = "สิงหาคม";
      month[8] = "กันยายน";
      month[9] = "ตุลาคม";
      month[10] = "พฤษจิกายน";
      month[11] = "ธันวาคม";
      return (
        month[this.date.getMonth()] + " " + (this.date.getFullYear() + 543)
      );
    }
  }
};
</script>
