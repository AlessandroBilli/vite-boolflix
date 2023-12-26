// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const API_KEY = 'ba12ea65874e1916dbd6559c1d3346b8';
const API_URL = 'https://api.themoviedb.org/3/search/movie';

export default new Vuex.Store({
    state: {
        searchQuery: '',
        movies: [],
        error: null,
        loading: false
    },
    mutations: {
        SET_SEARCH_QUERY(state, query) {
            state.searchQuery = query;
        },
        SET_MOVIES(state, movies) {
            state.movies = movies;
        },
        SET_ERROR(state, error) {
            state.error = error;
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        }
    },
    actions: {
        async searchMovies({ commit, state }) {
            try {
                commit('SET_LOADING', true);
                const response = await axios.get(API_URL, {
                    params: {
                        api_key: API_KEY,
                        query: state.searchQuery,
                    },
                });
                commit('SET_MOVIES', response.data.results);
                commit('SET_LOADING', false);
            } catch (error) {
                commit('SET_ERROR', 'Si è verificato un errore nella ricerca dei film.');
                commit('SET_LOADING', false);
            }
        }
    },
    getters: {
        getMovies: state => state.movies
    }
});
