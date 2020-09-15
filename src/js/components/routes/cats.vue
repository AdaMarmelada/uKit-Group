<template >
  <div class="container mt-2">
    <div class="d-flex pb-2 justify-content-between">
      <h2 class="m-0">Котики</h2>
      <button class="btn btn-secondary border-0 col-3" @click='createCat'>Добавить котика</button>
    </div>
    <div class="text-center">
      <div class="d-flex mb-2">
        <select v-model="searchField" class="form-control col-4">
          <option value="" disabled selected>Выберите фильтр</option>
          <option v-for="header in columnsHeader" :value="header.key" v-if="header.isFiltered">
              {{ header.title }}
            </option>
        </select>
        <input type="text" class="form-control col-8" v-model="searchValue" placeholder="Поиск">
      </div>
      <table class="table table-hover text-center">
        <thead>
          <tr>
              <th v-for="header in columnsHeader" :key="header.key">
                {{ header.title }}
              </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in filteredCats" :key="row.id">

            <td v-for="td in columnsHeader" :key="td.id">
              <span v-if="td.key === 'actions'">
                <router-link
                        :to="{name: getDetailRouteName(), params: {index: index}}"
                >
                    <i class="fas fa-pen"></i>
                </router-link>
                  <a href="#">
                    <i class="fas fa-trash" @click="deleteCat(index)"></i>
                  </a>
              </span>
              <span v-else-if="td.key === 'photo'">
                <img src="/dist/img/1411643599401098qee.jpg" alt="" v-if="row.photo === ''" class="preview-photo">
                <img :src="row.photo" alt="" class="preview-photo">
              </span>
              <span v-else>{{ row[td.key] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-secondary" @click="loadList" v-if="totalCats > cats.length">Показать еще</button>
    </div>
    <modal  v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <h2>Новый котик</h2>
      </template>
      <template v-slot:body>
        <form @submit.prevent="saveCat" id="UsersForm">
          <div class="form-group col-12">
            <label for="inputName">Кличка</label>
            <input type="text" class="form-control" id="inputName" placeholder="Введите кличку" minlength="2" v-model="formData.name" required>
          </div>
          <div class="form-group col-12">
            <label for="inputColor">Окрас</label>
            <input v-model="formData.color" type="text" class="form-control" id="inputColor" placeholder="Введите окрас">
          </div>
          <div class="form-group col-12">
            <label for="inputBreed">Порода</label>
            <input v-model="formData.breed" type="text" class="form-control" id="inputBreed"  placeholder="Введите породу">
          </div>
          <div class="form-group col-12">
            <label for="inputGender">Пол</label>
            <select v-model="formData.gender" type="checkbox" class="form-control" id="inputGender" required>
              <option value="" disabled selected>Выберите пол</option>
              <option value="Мужской">Мужской</option>
              <option value="Женский">Женский</option>
            </select>
          </div>
          <div class="form-group col-12">
            <label for="inputAge">Возраст</label>
            <input v-model="formData.age" type="number" min="1" step="1" class="form-control" id="inputAge"  placeholder="Введите возраст">
          </div>
          <div class="form-group col-12">
            <label for="inputComment">Комментарий</label>
            <textarea v-model="formData.comment" class="form-control" id="inputComment"  placeholder="Введите комментарий"></textarea>
          </div>
        </form>
      </template>
      <template v-slot:footer>
        <div class="form-group d-flex justify-content-between col-12">
          <button class="btn btn-info col-3" type="submit" form="UsersForm">Сохранить</button>
          <button class="btn btn-secondary col-3" type="submit" @click='closeModal'>Отмена</button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
  import catsState from "../../state/cats";
  import catDetail from "./detail";

  export default {
    name: 'v-cats',
    routerData: {
      path: '/'
    },
    components: {catDetail},
    data: function () {

        let columnsHeader = [
          {title: '', key: 'photo', isFiltered: false},
          {title: 'Кличка', key: 'name', isFiltered: false},
          {title: 'Окрас', key: 'color', isFiltered: true},
          {title: 'Порода', key: 'breed', isFiltered: true},
          {title: 'Пол', key: 'gender', isFiltered: true},
          {title: 'Возраст ', key: 'age',isFiltered: false},
          {title: 'Комментарий ', key: 'comment', isFiltered: false},
          {title: 'Действия', key: 'actions', isFiltered: false}
        ];

        return {
          isModalVisible: false,
          searchValue: '',
          searchField: '',
          formData: {
            id: 0,
            name: '',
            color: '',
            breed: '',
            gender: '',
            age: '',
            comment: '',
            photo: ''
          },
          columnsHeader: columnsHeader,
          cats: [],
          countPerPage: 10,
          offset: 0,
          totalCats: 0
        }
    },
    methods: {
      showModal () {
        this.isModalVisible = true
      },
      closeModal () {
        this.isModalVisible = false
      },
      refreshFormData () {
        this.formData = {
          id: 0,
          name: '',
          color: '',
          breed: '',
          gender: '',
          age: '',
          comment: '',
          photo: ''
        }
      },
      createCat () {
        this.refreshFormData()
        this.showModal()
      },
      editCat (index) {
        this.formData = JSON.parse(JSON.stringify(this.users[index]))
        this.showModal()
      },
      deleteCat (index) {
        if (confirm("Удалить котика?")) {
          catsState.dispatch('delete', index);
        }
      },
      saveCat () {
        catsState.dispatch('create', this.formData)
          .then(() => this.closeModal());
      },
      getDetailRouteName() {
        return catDetail.routerData.name
      },
      loadList() {
        let ctx = this;
        catsState.dispatch('getList', {count: ctx.countPerPage, offset: ctx.offset})
                .then((response) => {
                  ctx.cats = ctx.cats.concat(response.list);
                  ctx.totalCats = response.total;
                  ctx.offset += ctx.countPerPage;
                });

      },
    },
    computed: {
      filteredCats: function () {
        let ctx = this;

        if (ctx.searchField.length > 0 && ctx.searchValue.length > 0) {
          return this.cats.filter(cat => {
            return cat[ctx.searchField].toLowerCase().includes(ctx.searchValue.toLowerCase())
          })
        }

        return this.cats
      }
    },
    mounted () {
      let ctx = this;
      ctx.$root.load()
        .then (() => ctx.loadList());
    }
  } // export default
</script>
