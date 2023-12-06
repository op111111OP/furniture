<template>
   <div class="img-text-conteiner">
      <div class="img-box">
         <img :src="'https://image.tmdb.org/t/p/original' + ApiData.profile_path" alt="">
      </div>
      <div class="text-box">
         <div class=""><b class="big">{{ ApiData.name }}</b></div>
         <div class="">{{ ApiData.birthday }} {{ ApiData.deathday ? '-' : null }} {{
            ApiData.deathday
         }} </div>
         <div class="">{{ ApiData.biography }}</div>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         ApiData: [],
      }
   },
   methods: {
      fetchData(d) {

         const options = {
            method: 'GET',
            headers: {
               accept: 'application/json',
               Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDZjNmEyYmZkNmQ1MDRiODY0YzIzMTI2NzM3MThhNSIsInN1YiI6IjY1MjQxYmMzZmQ2MzAwMDExYzc3ZGE2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d6UJmamV2guxBJvRTiiSEVqCqS4jkO545CMafUEV8ZQ'
            }
         };
         Promise.all([
            fetch(` https://api.themoviedb.org/3/person/${d}?language=en-US`, options),


         ])
            .then(([response1]) => Promise.all([response1.json()]))
            .then(([data1]) => {
               this.ApiData = data1;
               console.log(data1)
            },
            );

      }
   },
   created() {
      this.fetchData(`${this.$route.params.id}`)

   },

}
</script>

<style lang="scss" scoped>
.img-box {
   overflow: hidden;
   max-width: 350px;
   max-height: 500px;
   min-width: 300px;
}

img {
   max-height: 100%;
   max-width: 100%;
   object-fit: cover;
}

.img-text-conteiner {
   display: flex;
   z-index: 10;
}

.text-box {
   padding: 20px;
}

.text-box>* {
   margin: 5px;
}
</style>