<template >
  <div class="container mt-2">
    <div class="d-flex pb-2 justify-content-between">
      <h2 class="m-0">{{formData.name}}</h2>
      <button class="btn btn-secondary border-0 col-3" @click='editCat()'>Редактировать</button>
    </div>
    <div class="cat-data d-flex flex-wrap justify-content-between align-items-center">
      <img :src="formData.photo" alt="" class="preview-photo col-6 p-0" v-if="formData.photo !== ''">
      <img src="/dist/img/1411643599401098qee.jpg" alt="" class="preview-photo col-6 p-0" v-else>
      <div class="col-5 p-0">
        <div class="cat-data-item">Кличка - {{formData.name}}</div>
        <div class="cat-data-item">Окрас - {{formData.color}}</div>
        <div class="cat-data-item">Порода - {{formData.breed}}</div>
        <div class="cat-data-item">Пол - {{formData.gender}}</div>
        <div class="cat-data-item">Возраст - {{formData.age}}</div>
        <div class="cat-data-item">Комментарий - {{formData.comment}}</div>
      </div>
    </div>
    <modal  v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <h2>Редактирование</h2>
      </template>
      <template v-slot:body>
        <form @submit.prevent="saveCat()" id="UsersForm">
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

  export default {
    name: 'v-detail',
    routerData: {
      path: '/detail/:index',
      name: 'detail'
    },
    data: function () {
        return {
          index: this.$route.params.index,
          isModalVisible: false,
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
        }
    },
    methods: {
      showModal() {
        this.isModalVisible = true
      },
      closeModal() {
        this.isModalVisible = false
      },
      editCat() {
        this.showModal();
      },
      saveCat() {
        catsState.dispatch('update', {cat: this.formData, index: this.index})
            .then(() => {
              this.closeModal();
            })
      },
    },
    computed: {},
    mounted () {
      let ctx = this;

      ctx.$root.load()
        .then(() => {
          catsState.dispatch('getByIndex', this.index)
            .then((response) => ctx.formData = response)
        })
    }
  }
</script>
