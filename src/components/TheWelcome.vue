<template>
   <div>
      <now-playing>NowPlaying</now-playing>
      <api-film :posts="masOptin[0]" :week="masSor[2]" :pitos="masSor[0]">Movies</api-film>
      <api-film :posts="masOptin[1]" :week="masSor[3]" :pitos="masSor[1]">Series</api-film>
   </div>
</template>
<!--  https://image.tmdb.org/t/p/original/6aoyUbvu0419XLKLIMoH0TkEicH.jpg -->

<script>

export default {
   data() {
      return {
         ApiData: [],
         masOptin: ["https://api.themoviedb.org/3/movie/103/recommendations?language=en-US&page=1", "https://api.themoviedb.org/3/tv/103/recommendations?language=en-US&page=1"],
         masSor: ["https://api.themoviedb.org/3/trending/movie/day?language=en-US", "https://api.themoviedb.org/3/trending/tv/day?language=en-US", 'https://api.themoviedb.org/3/trending/movie/week?language=en-US', "https://api.themoviedb.org/3/trending/tv/week?language=en-US"]
      }
   },
   methods: {

   },
   created() {
      // console.log(this.masSor[0])
   },
}
</script>

<style lang="scss" scoped>
div {

   background-color: #1a1a1a;
}

// Стилізація параграфів всередині дива
div p {
   font-size: 16px;
   line-height: 1.5;
}

// Стилізація заголовка h1 всередині дива
div h1 {
   font-size: 24px;
   font-weight: bold;
}
</style>