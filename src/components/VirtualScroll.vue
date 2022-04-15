<template>
    <div>
        <slot :items="list" />
    </div>
</template>

<script>
export default {
    name: 'VirtualScroll',
    props: {
        items: {
            type: Array,
            require: true
        },
        step: {
            type: Number,
            default: 5
        },
        offset: {
            type: Number,
            default: 50
        }
    },
    data: () => ({ count: 0 }),
    computed: {
        list() {
            return this.items.slice(0, this.count);
        }
    },
    methods: {
        getDocumentHeight() {
            return Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            );
        },
        isBottom() {
            if ((window.innerHeight + window.pageYOffset) >= (this.getDocumentHeight() - this.offset)) {
                return true;
            }
            return false;
        },
        isLittleItems() {
            return window.innerHeight >= this.getDocumentHeight();
        },
        autoLoading() {
            this.$nextTick(function () {
                if (this.count < this.items.length && this.isLittleItems()) {
                    this.load();
                    this.autoLoading();
                }
            })
        },
        load() {
            this.count += this.step;
        },
        onscroll() {
            if (this.isBottom()) {
                this.load();
            }
        }
    },
    watch: {
        step: {
            handler() {
                if (this.step > this.count) {
                    this.count = this.step;
                }
            },
            immediate: true
        },
        items: {
            handler() {
                this.autoLoading();
            },
            immediate: true
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onscroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onscroll);
    },
};
</script>

<style scoped>
</style>
