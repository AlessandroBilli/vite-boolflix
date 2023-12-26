<template>
    <div>
        <div>
            <input type="text" v-model="searchQuery" />
            <button @click="search">Cerca</button>
        </div>

        <p v-if="loading">Caricamento...</p>
        <p v-if="error">{{ error }}</p>

        <div v-for="movie in movies" :key="movie.id">
            <h3>{{ movie.title }}</h3>
            <p>Titolo Originale: {{ movie.original_title }}</p>
            <p>Lingua: {{ movie.original_language }}</p>
            <p>Voto: {{ movie.vote_average }}</p>
        </div>
    </div>
</template>
  
<script>
export default {
    computed: {
        searchQuery: {
            get() {
                return this.$store.state.searchQuery;
            },
            set(value) {
                this.$store.commit('SET_SEARCH_QUERY', value);
            }
        },
        movies() {
            return this.$store.getters.getMovies;
        },
        loading() {
            return this.$store.state.loading;
        },
        error() {
            return this.$store.state.error;
        }
    },
    methods: {
        search() {
            this.$store.dispatch('searchMovies');
        }
    }
};
</script>
  