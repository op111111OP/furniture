<template>
   <div class="oneFilm-box">
      <div class="oneFilm-title-box">

         <img class="backdrop-img" :src="'https://image.tmdb.org/t/p/original' + ApiData.backdrop_path" alt="">
         <div class="img-text-conteiner">
            <div class="img-box">
               <img :src="'https://image.tmdb.org/t/p/original' + ApiData.poster_path" alt="">
            </div>
            <div class="text-box">
               <div class=""><b class="big">{{ ApiData.name }}{{ ApiData.original_title }}</b></div>
               <div class="">{{ ApiData.first_air_date }} {{ ApiData.first_air_date ? '-' : null }} {{
                  ApiData.last_air_date
               }} {{ ApiData.release_date }}</div>
               <div class="">{{ ApiData.overview }}</div>
               <div class="tagline">tagline: {{ ApiData.tagline }}</div>
               <div class="genres">genres: <div v-for="item in ApiData.genres" :key="item"> {{ item.name }}</div>
               </div>
               <div class="seasons">
                  <div v-for="item in ApiData.seasons" :key="item.id" class="text-overview-box">
                     <div class="text-overview">
                        <!--  -->
                        <div class="bi bi-caret-up-fill text-overview-i" v-if="!showBlock[item.id] && item.overview"></div>
                        <div class="bi bi-caret-down-fill text-overview-i" v-if="showBlock[item.id] && item.overview">
                        </div>
                        <div @mouseenter="showBlock[item.id] = true" @mouseleave="showBlock[item.id] = false"
                           v-if="item.air_date">
                           {{ item.air_date ? item.name : null }}
                           Episode: {{ item.episode_count }}
                              {{ item.air_date }}
                        </div>
                     </div>
                     <div v-if="showBlock[item.id] && item.overview" class="showBlock-overview">
                        <div class="showBlock-overview_text"> {{ item.overview }}</div>
                        <div class="img-box img-box_text"><img
                              :src="'https://image.tmdb.org/t/p/original' + item.poster_path" alt="">
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </div>
         <div class="lower-text-box">
            <div class="spoken-languages-box">
               <div class="spoken-languages">
                  spoken languages:
                  <pre class="spoken-languages" v-for="item in ApiData.spoken_languages"
                     :key="item"> {{ item.name }} </pre>
               </div>
               <div class="watchProviders-box" v-if="ApiWatchProviders.results.US">
                  <providers :posts="ApiWatchProviders.results.US.buy">buy:</providers>
                  <providers :posts="ApiWatchProviders.results.US.rent">rent:</providers>
                  <providers :posts="ApiWatchProviders.results.US.ads">ads:</providers>
                  <providers :posts="ApiWatchProviders.results.US.free">free:</providers>
               </div>
            </div>
            <button @click="showBlockCast = !showBlockCast" class="showBlockCast-button">Cast:</button>
            <div class="cast" v-if="showBlockCast">
               Cast:
               <div v-for="item in ApiCredits.cast" :key="item.id" class="text-overview-box">
                  <div class="text-overview">
                     <!--  -->
                     <div class="bi bi-caret-up-fill text-overview-i" v-if="!showBlock[item.id] && item.profile_path">
                     </div>
                     <div class="bi bi-caret-down-fill text-overview-i" v-if="showBlock[item.id] && item.profile_path">
                     </div>

                     <div @mouseenter="showBlock[item.id] = true" @mouseleave="showBlock[item.id] = false">
                        {{ item.name }}

                     </div>
                  </div>
                  <div v-if="showBlock[item.id] && item.profile_path" class="showBlock-overview-img ">
                     <div class="img-box">
                        <img :src="'https://image.tmdb.org/t/p/original' + item.profile_path" alt="">
                     </div>
                  </div>

               </div>
            </div>
         </div>

      </div>
      <div class="images-box" v-if="ApiImage.backdrops && ApiImage.backdrops.length > 0">
         <carousel :breakpoints="breakPoster" :items-to-show="3" :wrap-around="true">
            <slide v-for="item in ApiImage.backdrops" :key="item.id" class="img-box-carusel">
               <img :src="'https://image.tmdb.org/t/p/original' + item.file_path" alt="">

            </slide>

            <template #addons>
               <navigation />
               <pagination />
            </template>
         </carousel>

      </div>
      <div class="videos" v-if="ApiVideos.results && ApiVideos.results.length > 0">
         <div class="video-container">
            <iframe class="iframe" width="100%" height="515"
               :src="'https://www.youtube.com/embed/' + ApiVideos.results[0].key" title="YouTube video player"
               frameborder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
               allowfullscreen>
            </iframe>
         </div>
      </div>

      <carousel :breakpoints="breakFilm" :items-to-show="2" :wrap-around="true" v-if="ApiSimilar.length > 0">
         <slide v-for="     item      in    ApiSimilar   " :key="item.id" class=" similar "
            @click="$router.push(`/${$route.params.type}/${item.id}`), fetchData(`/${$route.params.type}/${item.id}`)">
            <img :src="'https://image.tmdb.org/t/p/original' + item.backdrop_path" alt="similar"
               class="backdrop-img backdrop-img-similar">
            <div class="img-box-similar">
               <img :src="'https://image.tmdb.org/t/p/original' + item.poster_path" alt="similar" class="">

            </div>
            <div class="text-box-similar">
               <div>{{ item.name }}{{ item.title }}</div>
               <div>{{ item.release_date }}{{ item.first_air_date }}</div>
            </div>
         </slide>

         <template #addons>
            <navigation />
            <pagination />
         </template>
      </carousel>
   </div>
</template>

<script>
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default {
   components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
   },
   data() {

      return {
         showBlock: {},
         showBlockCast: false,
         //   Api
         ApiData: [],
         ApiImage: [],
         ApiCredits: [],
         ApiVideos: [],
         ApiWatchProviders: [],
         ApiSimilar: [],
         //  

         settings: {
            itemsToShow: 3,
            snapAlign: 'center',
         },

         breakPoster: {
            0: {
               itemsToShow: 1,
            },
            400: {
               itemsToShow: 1.5,
            },
            600: {
               itemsToShow: 2,
            },
            800: {
               itemsToShow: 3,
            },

         },
         breakFilm: {
            0: {
               itemsToShow: 1,
            },
            500: {
               itemsToShow: 1.5,
            },

            800: {
               itemsToShow: 2,
            },

         },
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
            fetch(`https://api.themoviedb.org/3${d}?language=en-US`, options),
            fetch(`https://api.themoviedb.org/3${d}/images?language=en`, options),
            fetch(`https://api.themoviedb.org/3${d}/credits?language=en-US`, options),
            fetch(`https://api.themoviedb.org/3${d}/videos`, options),
            fetch(`https://api.themoviedb.org/3${d}/watch/providers`, options),
            fetch(`https://api.themoviedb.org/3${d}/similar?language=en-US&page=1`, options),

         ])
            .then(([response1, response2, response3, response4, response5, response6]) => Promise.all([response1.json(), response2.json(), response3.json(), response4.json(), response5.json(), response6.json()]))
            .then(([data1, data2, data3, data4, data5, data6]) => {
               this.ApiData = data1;
               this.ApiImage = data2;
               this.ApiCredits = data3;
               this.ApiVideos = data4;
               this.ApiWatchProviders = data5;
               this.ApiSimilar = data6.results;
            },);

      }
   },
   created() {
      this.fetchData(`/${this.$route.params.type}/${this.$route.params.id}`)

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

.img-box-similar {
   max-width: 60%;
   overflow: hidden;
   min-height: 100%;
}

img {
   max-height: 100%;
   max-width: 100%;
   object-fit: cover;
}

.images-box {
   min-height: 200px;
   width: 100%;
   justify-content: center;
   align-items: center;
}

.img-box-carusel {
   min-height: 200px;
   width: 100%;
   background-color: var(--vc-clr-primary);
   color: var(--vc-clr-white);
   font-size: 20px;
   border-radius: 8px;
   display: flex;
   justify-content: center;
   align-items: center;
}

.oneFilm-box {
   display: flex;
   flex-direction: column;
   background: #1a1a1a;
   min-height: 100%;
   width: 100%;

}

.oneFilm-title-box {
   position: relative;
   display: flex;
   flex-direction: column;
}



.backdrop-img {
   opacity: 0.3;
   position: absolute;
   // z-index: -1;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;

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

.lower-text-box {
   display: flex;
   padding: 10px;
   flex-direction: column;
}

.genres {
   display: flex;
}

.big {
   font-size: 34px;
}

.text-overview-box {

   transition: all 500ms;
   position: relative;
}

.text-overview-box:hover {

   cursor: pointer;
}

.text-overview {
   position: relative;

}

.text-overview-i {
   position: absolute;
   left: -20px;
}

.showBlock-overview {
   display: flex;
   left: 150px;
   bottom: 2vh;
   z-index: 10;
   border-top: 2px solid orange;
   position: absolute;
   background: rgb(14, 14, 14);
   padding: 5px;
   justify-content: space-between;
}

.showBlock-overview_text {
   min-width: 150px;
}

.img-box_text {
   max-width: 300px;
   max-height: 400px;
   min-width: 250px;
}

.showBlock-overview-img {
   display: flex;
   left: 0px;
   bottom: 4vh;
   z-index: 10;
   border-top: 2px solid orange;
   position: absolute;
   background: rgb(14, 14, 14);
   padding: 5px;
}



.spoken-languages-box {
   display: flex;
   flex-direction: column;
}

.spoken-languages {
   display: flex;
}

.cast {
   gap: 0 25px;
   padding: 15px;
   display: flex;
   width: 100%;
   flex-wrap: wrap;
}

// videos
.videos {
   width: 100%;
   margin: 0px auto;
   /* Центрируйте контейнер */
}

.video-container {
   position: relative;
   padding-bottom: 56.25%;
   /* Задайте соотношение сторон видео (высота / ширина * 100%) */
   overflow: hidden;
}

.iframe {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
}

// videos and
.showBlockCast-button {
   position: relative;
   background-color: inherit;
   border: 1px solid white;
   width: 20%;
   height: 30px;
}

.showBlockCast-button:hover {
   cursor: pointer;
}

.similar {
   width: 500px;
   position: relative;
   display: flex;
   max-height: 400px;
   background-color: var(--vc-clr-primary);
   color: var(--vc-clr-white);
   font-size: 20px;
   justify-content: flex-start;
}

.similar:hover {
   cursor: pointer;
   border: 3px solid rgba(244, 165, 96, 0);
}

.backdrop-img-similar {
   z-index: -1;
}

.similar:hover .backdrop-img-similar {
   opacity: 0.2;
}

.text-box-similar {
   padding-left: 10px;

}
</style>
<!-- // async fetchData() {
   //    const apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDZjNmEyYmZkNmQ1MDRiODY0YzIzMTI2NzM3MThhNSIsInN1YiI6IjY1MjQxYmMzZmQ2MzAwMDExYzc3ZGE2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d6UJmamV2guxBJvRTiiSEVqCqS4jkO545CMafUEV8ZQ';

   //    const endpoints = [
   //       `${this.$route.params.type}/${this.$route.params.id}?language=en-US`,
   //       `${this.$route.params.type}/${this.$route.params.id}/images?language=en`
   //    ];

   //    for (const endpoint of endpoints) {
   //       try {
   //          const response = await fetch(`https://api.themoviedb.org/3/${endpoint}`, {
   //             method: 'GET',
   //             headers: {
   //                accept: 'application/json',
   //                Authorization: `Bearer ${apiKey}`,
   //             },
   //          });
   //          const responseData = await response.json();

   //          if (endpoint.includes('images')) {
   //             this.ApiImage = responseData;
   //             console.log(this.ApiImage);
   //          } else {
   //             this.ApiData = responseData;
   //             console.log(this.ApiData);
   //          }
   //       } catch (error) {
   //          console.error(`Ошибка при запросе данных для ${endpoint}:`, error);
   //       }
   //    }
   // } -->