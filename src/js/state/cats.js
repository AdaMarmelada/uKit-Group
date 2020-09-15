import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cats : []
    },
    actions: {
        load({commit}) {
            return new Promise((resolve => {
                commit('load_cats_data', require('../../../data/cats'));
                resolve();
            }));
        },
        create({commit}, cat) {
            return new Promise((resolve) => {
                commit('add_cat', cat);
                resolve();
            })
        },
        delete({commit}, index) {
            commit('delete_cat', index);
        },
        getByIndex({commit}, index) {
            let ctx = this;

            return new Promise((resolve) => {
                resolve(ctx.state.cats[index]);
            });
        },
        update({commit}, catInfo) {
            return new Promise((resolve => {
                commit('update_cat', catInfo);
                resolve();
            }));
        },
        getList({commit}, filter) {
            let ctx = this;

            return new Promise((resolve) => {
                resolve({
                    list: ctx.state.cats.slice(filter.offset, filter.count + filter.offset),
                    total: ctx.state.cats.length
                });
            });
        }
    },
    mutations: {
        load_cats_data(state, list) {
            state.cats = list
        },
        delete_cat(state, index) {
            state.cats.splice(index, 1)
        },
        add_cat(state, cat) {
            state.cats.push(cat)
        },
        update_cat(state, catInfo) {
            state.cats[catInfo.index] = catInfo.cat
        }
    },
    getters: {
        cats: state => state.cats
    }
})
