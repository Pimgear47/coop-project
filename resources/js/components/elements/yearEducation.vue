<template>
  <h3>ประจำปีการศึกษา {{year}}</h3>
</template>

<script>
export default {
  data: () => ({
    date: new Date()
  }),
  computed: {
    year() {
        console.log(this.date.getMonth()+1);
        if((this.date.getMonth()+1)>=5){
            return (this.date.getFullYear())+543;
        }else{
            return (this.date.getFullYear()-1)+543;
        }
    }
  }
};
</script>
