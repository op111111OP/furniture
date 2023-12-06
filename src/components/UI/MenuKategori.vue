<template>
   <div>
      <div class="Kategori" @mouseenter="showBlock = true" @mouseleave="showBlock = false">
         <slot></slot>
      </div>
      <div class="Kategori__menu" @mouseenter="showBlock = true" @mouseleave="showBlock = false" v-if="showBlock">
         <div v-for="item in ApiData.genres" :key="item">
            <div @click="$router.push(`/kategori/${typek}/${item.id}/1`)" class="kategori-text">{{ item.name }} </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: "menu-kategori",
   props: {
      posts: {
         type: String
      },
      typek: String,
   },
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

         fetch(this.posts, options)
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

<style scoped>
.Kategori {
   transition: all 500ms;
   position: relative;
}

.Kategori:hover {
   background-color: rgba(4, 4, 4, 0.339);
   box-shadow: inset 0 0 0 2px #b6a220;
   cursor: pointer;
}

.Kategori__menu {
   z-index: 20;
   display: flex;
   flex-direction: column;
   flex-wrap: wrap;
   border-top: 2px solid orange;
   position: absolute;
   min-width: 300px;
   height: 200px;
   background: rgb(64, 64, 64);
   padding: 5px;

}

.Kategori__menu>* {
   margin: 5px;
   text-align: center;
}

.Kategori__menu:hover {

   box-shadow: inset 0 0 0 1px #b6a220;
}

.kategori-text {
   cursor: pointer;
}
</style>