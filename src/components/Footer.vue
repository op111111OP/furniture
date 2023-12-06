<template>
   <div class="footer">
      <RouterLink to="/" class="logo_box"><img src="@/assets/film_8.svg" alt="SVG Image" class="logo">
         <div class="logo_text">KINO<b>X</b></div>
      </RouterLink>
      <!-- <div class="Kategori__menu">
         <div v-for="item in ApiData.genres" :key="item">
            <div @click="$router.push(`/kategori/movie/${item.id}/1`)" class="kategori-text">{{ item.name }} </div>
         </div>
      </div> -->

      <div class="texe-footer">
         <div>
            <div>© 2023 Your Movie Site Name</div>
            <div> Address: Street, City, Zip Code</div>
         </div>

         <div>
            <div> Email: info@yourmoviesite.com</div>
            <div> Phone: +1 (123) 456-7890</div>
         </div>
      </div>


   </div>
</template>

<script>
import { RouterLink } from 'vue-router'
export default {
   data() {
      return {
         showBlock: false, // Начальная видимость блока
         ApiData: [],
      };
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

         fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            .then(response => response.json())
            .then(response => {
               this.ApiData = response;
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
.footer {
   width: 60%;
   margin: 0 auto;
   height: 100px;
   background: #111;
   display: flex;
   justify-content: space-around;
   align-items: center;
}

.logo {
   background: rgb(255, 174, 0);
   /* Змінити колір заливки SVG */
   width: 40px;
   /* Змінити ширину SVG */
   height: 40px;
   /* Змінити висоту SVG */
   border-radius: 20%;
   border: 2px solid rgb(255, 174, 0);
}

.logo_box {
   display: flex;
   gap: 5px;
   align-items: center;

}

.logo_text {
   font-family: JosefinSans-VariableFont_wght, sans-serif;
   font-size: 25px;
   font-weight: 300;
}

.Kategori__menu {
   height: 100%;
   width: 300px;
   display: flex;
   flex-direction: column;
   flex-wrap: wrap;

}

.texe-footer {
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 40px;
}

@media screen and (max-width: 1180px) {
   .footer {
      width: 80%;
   }
}

@media screen and (max-width: 1080px) {
   .footer {
      width: 100%;
   }
}

@media screen and (max-width: 650px) {
   .texe-footer {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
   }

   .footer {
      height: 150px;
   }
}
</style>