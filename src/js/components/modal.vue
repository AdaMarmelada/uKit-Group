<template v-if="$parent.isModalVisible">
  <div name="modal">
    <div class="modal-mask" @mousedown.self="$emit('close')">
      <transition name="slide-fade">
        <div class="modal-container col-6 h-100" v-if="$parent.isModalVisible">
          <div class="modal-header">
            <slot name="header">
              <h2>Новый клиент</h2>
            </slot>
            <button type="button" class="btn-close btn-right border-0 bg-transparent" @click="$parent.closeModal" aria-label="Close modal"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <slot name="body">
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
