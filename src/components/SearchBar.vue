<template>
    <div>
        <input
            type="search"
            v-model="text"
            :placeholder="placeholder"
            @input="onInput"
        />
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    props: {
        placeholder: String,
        value: String
    },
    data: () => ({ text: '' }),
    watch: {
        value: {
            handler() {
                if (this.text !== this.value) {
                    this.text = this.value || '';
                }
            },
            immediate: true
        }
    },
    methods: {
        onInput() {
            this.$emit('input', this.text);
        }
    }
};
</script>

<style scoped>
</style>
