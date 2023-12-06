<template>
   <div class="box-request">
      <div class="text">

         Page: {{ $route.params.page }}
      </div>
      <div class="api-card">
         <div v-for="item in ApiData.results" :key="item" class="api-card-box"
            @click="$router.push(`/${$route.params.tupe}/${item.id}`)">
            <img :src="'https://image.tmdb.org/t/p/original' + item.poster_path" alt="" />
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
            <input type="text" name="" id="" class="inputPage" v-model="myValue"> <button class="buttonPage"
               @click="goToPage()">Go to</button>
         </div>
         <div class="tables1" @click="tables2Fun()">→</div>
         <div class="total_pages">
            <div>max:</div>
            <div>
               <span v-if="ApiData.total_pages > 500">500</span>
               <span v-else>{{ ApiData.total_pages }}</span>
            </div>
         </div>
      </div>
   </div>
</template>

<script>

export default {

   data() {
      return {
         myValue: '',
         ApiData: {},
         settings: {
            itemsToShow: 3,
            snapAlign: "center",
         },


      };
   },
   methods: {
      tables1Fun() {
         var i = this.$route.params.page;
         i > 1 ? i-- : null;
         this.$router.push(`/kategori/${this.$route.params.tupe}/${this.$route.params.kNum}/${i}`);
         console.log(i);
      },
      tables2Fun() {
         var i = this.$route.params.page;
         i < this.ApiData.total_pages ? i++ : null;
         this.$router.push(`/kategori/${this.$route.params.tupe}/${this.$route.params.kNum}/${i}`);
         console.log(i);
      },
      fetchData(t, k, p) {
         const options = {
            method: "GET",
            headers: {
               accept: "application/json",
               Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDZjNmEyYmZkNmQ1MDRiODY0YzIzMTI2NzM3MThhNSIsInN1YiI6IjY1MjQxYmMzZmQ2MzAwMDExYzc3ZGE2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d6UJmamV2guxBJvRTiiSEVqCqS4jkO545CMafUEV8ZQ",
            },
         };

         fetch(
            `https://api.themoviedb.org/3/discover/${t}?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${p}&sort_by=popularity.desc&with_genres=${k}`,
            options
         )
            .then((response) => response.json())
            .then((response) => {
               this.ApiData = response;
            })
            .catch((err) => console.error(err));
      },
      goToPage() {
         const pageV = parseInt(this.myValue); // Преобразуем значение myValue в число
         const pageT = parseInt(this.ApiData.total_pages);
         if (pageV > 0 && pageV < 501 && pageV <= pageT) {
            const route = `/kategori/${this.$route.params.tupe}/${this.$route.params.kNum}/${this.myValue}`;

            this.$router.push(route);
         }
      },
   },
   created() {
      this.fetchData(this.$route.params.tupe, this.$route.params.kNum, this.$route.params.page,); // Викликаємо fetchData() при створенні компонента
   },
   beforeRouteUpdate(to, from, next) {
      this.fetchData(to.params.tupe, to.params.kNum, to.params.page);
      next();
   },
}
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
   display: flex;
   min-height: 20px;
   width: 100%;
   justify-content: space-around;
   align-items: center;
}



.carusel-box {
   min-height: 20px;
   width: 350px;
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

.buttonPage {
   height: 20px;
   width: 50px;
   cursor: pointer;
   background: rgb(61, 60, 60);
}

.inputPage {
   background: black;
   cursor: pointer;
   width: 130px;
}

.total_pages {
   display: flex;
   gap: 5px;
}

.text {
   font-size: 30px;
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

@media screen and (max-width: 450px) {
   .api-card-box {
      width: 50%;
   }
}
</style>