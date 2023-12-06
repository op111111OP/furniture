<template>
   <div class="api-box">
      <div class="api-kategori">
         <div class="videoCat">
            <slot></slot>
         </div>
         <div v-if="ApiData.dates">
            {{ ApiData.dates.maximum }} - {{ ApiData.dates.minimum }}
         </div>
      </div>

      <div class="api-card">
         <carousel v-bind="settings" :breakpoints="breakpoints" :items-to-show="6" :wrap-around="'loop'" :autoplay="5000">
            <slide v-for="item in ApiData.results" :key="item" class="api-card-box">


               <div @click="$router.push(`/movie/${item.id}`)">
                  <img :src="'https://image.tmdb.org/t/p/original' + item.poster_path" alt="">
                  <div class="api-card-box-text">
                     <div class="api-card-text">{{ item.title ? item.title : item.name }}</div>
                     <div class="api-card-text">{{ item.release_date ? item.release_date : item.first_air_date }}</div>

                  </div>
               </div>
            </slide>

            <template #addons>
               <navigation />
               <!-- <pagination /> -->
            </template>
         </carousel>

      </div>
   </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default {
   components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
   },
   name: "now-playing",
   props: {
      posts: {
         type: String
      },
      pitos: String,
      week: String,

   },

   data() {
      return {
         ApiData: [],
         settings: {
            itemsToShow: 3,
            snapAlign: 'center',
         },
         breakpoints: {
            0: {
               itemsToShow: 2,
            },
            400: {
               itemsToShow: 3,
            },

            650: {
               itemsToShow: 4,
            },
            800: {
               itemsToShow: 5,
            },

         },
      }
   },
   methods: {

      fetchData() {
         const options = {

            method: 'GET',
            headers: {
               accept: 'application/json',
               Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDZjNmEyYmZkNmQ1MDRiODY0YzIzMTI2NzM3MThhNSIsInN1YiI6IjY1MjQxYmMzZmQ2MzAwMDExYzc3ZGE2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d6UJmamV2guxBJvRTiiSEVqCqS4jkO545CMafUEV8ZQ'
            }
         };

         fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=us', options)
            .then(response => response.json())
            .then(response => {
               this.ApiData = response; // Збереження отриманих даних в ApiData
               console.log(this.ApiData.dates.maximum); // Вивід даних в консоль

            })
            .catch(err => console.error(err));
      }
   },
   created() {
      this.fetchData(); // Викликаємо fetchData() при створенні компонента

   },
}
</script>

<style lang="scss" scoped>
.api-box {
   max-width: 100%;
   min-height: 254px;
   display: flex;
   flex-direction: column;
}

img {
   max-height: 100%;
   max-width: 100%;
   object-fit: cover;
}

.api-card {
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
}

.api-card-text {
   background: #00000066;
   text-shadow: 0 0 2px #ffb300;
}

.api-card-box-text {
   flex-direction: column;
   bottom: 0;
   width: 100%;
   height: 45%;
   z-index: 0;
   position: absolute;
   display: flex;
   justify-content: center;
   align-items: center;
}

.api-card-box {
   position: relative;
   overflow: hidden;
   width: 14.2857142857%;
   cursor: pointer;
}

.api-card-box:hover {
   border: 2px solid rgba(253, 245, 230, 0);
}





.api-kategori {
   display: flex;
   gap: 20px;
   padding: 10px;

}

.videoCat {
   border-radius: 10%;
   padding: 2px 10px;
   background: orange;
   color: #000;
}
</style>