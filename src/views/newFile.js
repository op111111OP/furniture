export default (await import("vue")).defineComponent({
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      ApiData: [],
      showBlock: {},
      ApiImage: [],
      ApiCredits: [],
      ApiVideos: [],
      settings: {
        itemsToShow: 3,
        snapAlign: "center",
      },

      breakpoints: {
        // 700px and up
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
    fetchData() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDZjNmEyYmZkNmQ1MDRiODY0YzIzMTI2NzM3MThhNSIsInN1YiI6IjY1MjQxYmMzZmQ2MzAwMDExYzc3ZGE2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d6UJmamV2guxBJvRTiiSEVqCqS4jkO545CMafUEV8ZQ",
        },
      };
      fetch(
        `https://api.themoviedb.org/3/${this.$route.params.type}/${this.$route.params.id}?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.ApiData = response; // Збереження отриманих даних в ApiData
          console.log(this.ApiData);
        });
      fetch(
        `https://api.themoviedb.org/3/${this.$route.params.type}/${this.$route.params.id}/images?language=en`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.ApiImage = response; // Збереження отриманих даних в ApiData
        });
      fetch(
        `https://api.themoviedb.org/3/${this.$route.params.type}/${this.$route.params.id}/credits?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.ApiCredits = response; // Збереження отриманих даних в ApiData
        });
      fetch(
        `https://api.themoviedb.org/3/${this.$route.params.type}/${this.$route.params.id}/videos`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.ApiVideos = response;
        });
      fetch(
        `https://api.themoviedb.org/3/${this.$route.params.type}/${this.$route.params.id}/watch/providers`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.ApiWatchProviders = response; // Збереження отриманих даних в ApiData
          console.log();
        });
      fetch(
        `https://api.themoviedb.org/3/${this.$route.params.type}/${this.$route.params.id}/videos`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.ApiVideos = response;
        });
    },
  },
  created() {
    this.fetchData();
  },
});
