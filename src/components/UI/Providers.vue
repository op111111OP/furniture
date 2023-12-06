<template>
   <div class="watchProviders" v-if="posts && posts.length > 0">
      <slot></slot>
      <div v-for="item in posts" :key="item.id" class=" watchProviders-for text-overview-box">
         <div class="WatchProvidersLogo"><img :src="'https://image.tmdb.org/t/p/original' + item.logo_path"
               alt="logo_path"></div>
         <div class="buy">{{ item.provider_name }}
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: "providers",
   props: {
      posts: {
         type: Array
      }
   },

}
</script>

<style lang="scss" scoped>
.WatchProvidersLogo {
   border-radius: 4px;
   overflow: hidden;
   max-width: 50px;
   max-height: 500px;
}

.watchProviders {
   display: flex;
   gap: 10px;
   margin: 10px;
   flex-wrap: wrap;
}

.watchProviders>* {
   display: flex;
   gap: 10px;
   align-items: center;
   background: rgba(0, 0, 0, 0.427);
   border-radius: 4px;
   padding: 1px;
}

// .watchProviders-for {

//    background: rgba(0, 0, 0, 0.758);

// }

.watchProviders-for:hover {
   cursor: pointer;
   background: rgba(0, 0, 0, 0.887);

}

.text-overview-box {

   transition: all 500ms;
   position: relative;
}

.text-overview-box:hover {

   cursor: pointer;
}

img {
   max-height: 100%;
   max-width: 100%;
   object-fit: cover;
}
</style>