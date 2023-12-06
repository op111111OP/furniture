<template>
   <header>
      <div class="haeder_dox">
         <RouterLink to="/" class="logo_box"><img src="@/assets/film_8.svg" alt="SVG Image" class="logo">
            <div class="logo_text">KINO<b>X</b></div>
         </RouterLink>
         <div class="menu-kategori-box">
            <menu-kategori :posts="posts[0]" :typek="'movie'">
               MOVIES
            </menu-kategori>
            <menu-kategori :posts="posts[1]" :typek="'tv'">
               SERIES
            </menu-kategori>
         </div>
         <div class="search-box">
            <input class="input-text" type="text" placeholder="search" v-model="myValue">
            <div alt="SVG Image" class="bi bi-search logo-search" @click="$router.push(`/search/${myValue}/1`)"></div>
         </div>
         <div>
            <button>Registration</button>
            <button>Login</button>
         </div>
      </div>
   </header>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import 'bootstrap-icons/font/bootstrap-icons.css';

export default {
   data() {
      return {
         myValue: "",
         posts: ['https://api.themoviedb.org/3/genre/movie/list?language=en', 'https://api.themoviedb.org/3/genre/tv/list?language=en'],
      }
   },
   methods: {

   },
   created() {

   },
}
</script>

<style scoped>
.haeder_dox {
   width: 60%;
   margin: 0 auto;
   height: 60px;
   background-color: #111;
   display: flex;
   align-items: center;
   justify-content: space-around;
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

.input-text {
   border: none;
   outline: none;
   background: #111;
   border: 1px solid rgb(0, 0, 0);
   width: 250px;
   height: 34px;
   border-radius: 3%;
   padding-left: 5px;

}

.search-box {
   padding-right: 10px;
   align-items: center;
   display: flex;
   justify-content: space-between;
   border: 2px solid wheat;
}

.logo-search {
   cursor: pointer;
}

.menu-kategori-box {
   display: flex;
   gap: 15px;
}



@media screen and (max-width: 1180px) {

   .haeder_dox {
      width: 80%;
   }

   .input-text {
      width: 90%;
   }

}

@media screen and (max-width: 1080px) {
   .haeder_dox {
      width: 100%;
   }

   .input-text {
      width: 90%;
   }

}

@media screen and (max-width: 650px) {
   .logo_text {
      display: none;
   }

   .menu-kategori-box {
      flex-wrap: wrap;
      gap: 0px 5px;
   }

   .haeder_dox>* {
      margin: 0px 0px 0px 5%;
   }
}
</style>