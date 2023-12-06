<template>
   <div class="api-box">
      <div class="api-kategori">
         <div class="videoCat">
            <slot></slot>
         </div>
         <div @click="pramsMas = posts, fetchData(), showBlock = false" class="api-button">Recommendations</div>
         <div @click="pramsMas = pitos, fetchData(), showBlock = true" class="api-button">Popular
         </div>
         <select name="" id="selApi" class="selectData" v-if="showBlock" v-model="selectData"
            @change="fetchWeek(), fetchData()">
            <option value="day">day</option>
            <option value="week">week</option>
         </select>
      </div>

      <div class="api-card">
         <div v-for="item in ApiData" :key="item" class="api-card-box"
            @click="$router.push(`/${item.media_type}/${item.id}`)">
            <img :src="'https://image.tmdb.org/t/p/original' + item.poster_path" alt="">
            <div class="api-card-box-text">
               <div class="api-card-text">{{ item.title ? item.title : item.name }}</div>
               <div class="api-card-text">{{ item.release_date ? item.release_date : item.first_air_date }}</div>

            </div>
         </div>

      </div>
   </div>
</template>

<script>
export default {
   name: "api-film",
   props: {
      posts: {
         type: String
      },
      pitos: String,
      week: String,

   },

   data() {
      return {
         selectData: "day",
         showBlock: false,
         apiend: "",
         ApiData: [],
         pramsMas: this.posts,
         indeX: 0,
      }
   },
   methods: {
      fetchWeek() {
         this.selectData == 'day' ? this.pramsMas = this.pitos : this.pramsMas = this.week;
         console.log(this.selectData);
      },
      fetchData() {
         const options = {

            method: 'GET',
            headers: {
               accept: 'application/json',
               Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDZjNmEyYmZkNmQ1MDRiODY0YzIzMTI2NzM3MThhNSIsInN1YiI6IjY1MjQxYmMzZmQ2MzAwMDExYzc3ZGE2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d6UJmamV2guxBJvRTiiSEVqCqS4jkO545CMafUEV8ZQ'
            }
         };

         fetch(this.pramsMas, options)
            .then(response => response.json())
            .then(response => {
               this.ApiData = response.results; // Збереження отриманих даних в ApiData
               console.log(this.ApiData); // Вивід даних в консоль

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

.api-button {
   cursor: pointer;
   background-color: rgba(4, 4, 4, 0.812);
   padding: 0px 3px;
   transition: all 1s;
}

.api-button:hover {
   background-color: rgba(4, 4, 4, 0.339);
   box-shadow: inset 0 0 0 2px #b6a220;
   padding: 0px 3px;
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

.selectData {
   background: #000;
   border: none;
   padding: 0 10px;
   border-radius: 10%;
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