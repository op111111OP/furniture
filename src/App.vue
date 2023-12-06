<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

</script>

<template>
   <div class="wrapper">
      <Header />
      <div class="conteiner__">
         <RouterView />
      </div>
      <Footer />
   </div>
</template>

<style scoped>
.wrapper {
   padding-top: 180px;
   min-height: 100vh;
   overflow: hidden;
   display: flex;
   flex-direction: column;
   min-width: 100%;

}

.conteiner__ {
   flex: 1 1 auto;
   width: 60%;

   margin: 0 auto;

}

@media screen and (max-width: 1180px) {
   .conteiner__ {
      width: 80%;
   }
}

@media screen and (max-width: 1080px) {
   .conteiner__ {
      width: 100%;
   }
}
</style>
