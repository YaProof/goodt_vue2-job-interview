<template>
  <ui-popup v-if="active">
      <template #header>
          <h3>{{ title }}</h3>
      </template>
      <template #body>
          {{ message }}
      </template>
      <template #footer>
          <div class="popup-btn-group">
              <button class="outline" @click="onNo">Нет</button>
              <button @click="onYes">Да</button>
          </div>
      </template>
  </ui-popup>
</template>

<script>
import UiPopup from './Popup.vue';

export default {
    name: 'AppConfirm',
    components: {
      UiPopup
    },
    props: {
      title: String,
      message: String
    },
    data: () => ({
        active: false,
        listener: undefined
    }),
    computed: {
    },
    methods: {
        onYes() {
            if (this.listener) {
                this.listener(true);
            }
        },
        onNo() {
            if (this.listener) {
                this.listener(false);
            }
        },
        confirm() {
            this.active = true;
            return new Promise(resolve => {
                this.listener = val => {
                    this.listener = undefined;
                    this.active = false;
                    resolve(val);
                }
            });
        },
    }
};
</script>

<style scoped>
.popup-btn-group {
    text-align: right;
    button {
        margin-left: 1rem;
    }
    button:hover {
      cursor: pointer;
    }
    button:disabled {
        opacity: 1;
        cursor: not-allowed;
    }
}
</style>
