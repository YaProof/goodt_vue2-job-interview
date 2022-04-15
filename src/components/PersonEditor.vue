<template>
  <ui-popup>
      <template #header>
          <h3>Имя Фамилия Сотрудника</h3>
      </template>
      <template #body>
          <div class="form">
              <div class="form-elem">
                  <label class="form-elem-label">name</label>
                  <input
                    type="text"
                    v-model="value.name"
                    :class="{'invalid': invalidName}"
                    title="Введите имя и фамилию с прописной буквы"
                    required
                />
              </div>
              <div class="form-elem">
                  <label class="form-elem-label">email</label>
                  <input
                    type="email"
                    v-model="value.email"
                    :class="{'invalid': invalidEmail}"
                    required
                />
              </div>
              <div class="form-elem">
                  <label class="form-elem-label">position</label>
                  <select v-model="value.position" :class="{'invalid': !value.position}">
                      <option
                        v-for="value in positions"
                        :value="value"
                        :key="value"
                      >{{ value }}</option>
                  </select>
              </div>
          </div>
      </template>
      <template #footer>
          <div class="popup-btn-group">
              <button class="outline" @click="onCancel">Отменить</button>
              <button :disabled="disabledSave" @click="onSave">Сохранить</button>
          </div>
      </template>
  </ui-popup>
</template>

<script>
import UiPopup from './Popup.vue';

export default {
    name: 'PersonEditor',
    components: {
      UiPopup
    },
    props: {
      person: {
        type: Object,
        require: true
      },
      positions: Array
    },
    data: () => ({
      value: {
        id: -1,
        name: '',
        email: '',
        position: ''
      }
    }),
    computed: {
        invalidName() {
            if (!this.value.name) {
                return true;
            }

            const arr = this.value.name.split(' ');
            if (arr.length < 2) {
                return true;
            }

            return arr.some(w => !/[A-ZА-Я]/.test(w.charAt(0)));
        },
        invalidEmail() {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return !this.value.email || !re.test(this.value.email);
        },
        isValidForm() {
            return !this.invalidName && !this.invalidEmail && this.value.position;
        },
        disabledSave() {
            return !this.isValidForm || this.compare(this.person, this.value);
        }
    },
    watch: {
        person: {
            handler() {
                this.value.id = this.person.id || -1;
                this.value.name = this.person.name || '';
                this.value.email = this.person.email || '';
                this.value.position = this.person.position || '';
            },
            immediate: true
        }
    },
    methods: {
        onSave() {
            this.$emit('save', this.value);
        },
        onCancel() {
            this.$emit('cancel');
        },
        compare(outerObj, innerObj) {
            for (const key of Object.keys(innerObj)) {
                if (innerObj[key] !== outerObj[key]) {
                    return false;
                }
            }

            return true;
        }
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

.form {
  width: 25rem;
  &-elem {
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
    &-label {
      display: block;
      font-size: var(--font-size-small);
      text-transform: uppercase;
      opacity: 0.5;
    }
  }
}
.invalid {
    background-color: pink;
    border-color: #c00000;
}
</style>
