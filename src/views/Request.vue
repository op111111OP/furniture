<template>
   <div class="box-request">
      <div class="api-card">
         <div v-for="item in ApiData.results" :key="item" class="api-card-box"
            @click="$router.push(`/${item.media_type}/${item.id}`)">
            <img v-if="item.poster_path" :src="'https://image.tmdb.org/t/p/original' + item.poster_path" alt="" />
            <img v-if="item.profile_path" :src="'https://image.tmdb.org/t/p/original' + item.profile_path" alt="" />
            <div class="api-card-box-text">
               <div class="api-card-text">{{ item.title ? item.title : item.name }}</div>
               <div class="api-card-text">
                  {{ item.release_date ? item.release_date : item.first_air_date }}
               </div>
            </div>
         </div>
      </div>
      <div class="carusel-box">
         <div class="tables1" @click="tables1Fun()">←</div>
         <div class="images-box">
            <carousel :items-to-show="14" :wrap-around="true">
               <slide v-for="item in ApiData.total_pages" :key="item" class="img-box-carusel"
                  :style="{ border: item == $route.params.page ? '2px solid rgb(255, 183, 0)' : '2px solid white' }">
                  <div @click="$router.push(`/search/${$route.params.request}/${item}`)">
                     {{ item }}
                  </div>
               </slide>

               <template #addons>
                  <!-- <navigation /> -->
                  <!-- <pagination /> -->
               </template>
            </carousel>
         </div>
         <div class="tables1" @click="tables2Fun()">→</div>
      </div>
   </div>
</template>

<script>
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
   components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
   },
   data() {
      return {
         ApiData: {},
         settings: {
            itemsToShow: 3,
            snapAlign: "center",
         },

         breakpoints: {
            // 700px and up
            500: {
               itemsToShow: 1,
               snapAlign: "center",
            },
            700: {
               itemsToShow: 2,
               snapAlign: "center",
            },
            // 1024 and up
            1024: {
               itemsToShow: 3,
               snapAlign: "start",
            },
         },
      };
   },
   methods: {
      tables1Fun() {
         var i = this.$route.params.page;
         i > 1 ? i-- : null;
         this.$router.push(`/search/${this.$route.params.request}/${i}`);
         console.log(i);
      },
      tables2Fun() {
         var i = this.$route.params.page;
         i < this.ApiData.total_pages ? i++ : null;
         this.$router.push(`/search/${this.$route.params.request}/${i}`);
         console.log(i);
      },
      fetchData(d, p) {
         const options = {
            method: "GET",
            headers: {
               accept: "application/json",
               Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDZjNmEyYmZkNmQ1MDRiODY0YzIzMTI2NzM3MThhNSIsInN1YiI6IjY1MjQxYmMzZmQ2MzAwMDExYzc3ZGE2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d6UJmamV2guxBJvRTiiSEVqCqS4jkO545CMafUEV8ZQ",
            },
         };
         'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
         fetch(
            `https://api.themoviedb.org/3/search/multi?query=${d}&include_adult=false&language=en-US&page=${p}`,
            options
         )
            .then((response) => response.json())
            .then((response) => {
               this.ApiData = response;
               console.log(this.ApiData, 222);
            })
            .catch((err) => console.error(err));
      },
   },
   created() {
      this.fetchData(this.$route.params.request, this.$route.params.page); // Викликаємо fetchData() при створенні компонента
   },
   beforeRouteUpdate(to, from, next) {
      this.fetchData(to.params.request, to.params.page);
      next();
   },
};
</script>

<style lang="scss" scoped>
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
   width: 20%;
   cursor: pointer;
}

.api-card-box:hover {
   border: 2px solid rgba(184, 135, 11, 0);
}

.images-box {
   min-height: 20px;
   width: 100%;
   // justify-content: center;
   // align-items: center;
}

.img-box-carusel {
   cursor: pointer;
   min-height: 20px;
   width: 100%;
   background-color: var(--vc-clr-primary);
   color: var(--vc-clr-white);
   font-size: 20px;
   border-radius: 8px;
   display: flex;
   justify-content: center;
   align-items: center;
   border: 1px solid white;
}

.carusel-box {
   min-height: 20px;
   width: 500px;
   justify-content: center;
   align-items: center;
   display: flex;

}

.tables1 {
   cursor: pointer;
   font-size: 30px;
   padding: 0 5px;
}

.box-request {
   display: flex;
   flex-direction: column;
   justify-content: end;
   align-items: center;

}

@media screen and (max-width: 1080px) {
   .api-card-box {
      width: 20%;
   }
}

@media screen and (max-width: 800px) {
   .api-card-box {
      width: 25%;
   }
}

@media screen and (max-width: 600px) {
   .api-card-box {
      width: 33%;
   }
}

@media screen and (max-width: 400px) {
   .api-card-box {
      width: 50%;
   }
}
</style>
