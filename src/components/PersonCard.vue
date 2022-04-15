<template>
  <div class="card">
    <div class="card-avatar">
        <card-avatar :url="person.avatar"></card-avatar>
        <div v-if="isShowCommentCount" class="card-comment">
            {{ commentCount }}
        </div>
    </div>

    <div class="card-info">
        <div class="card-name">
        <b v-html="name"></b>
        </div>
        <div class="card-email">{{ email }}</div>
    </div>

    <div>
        <span class="action-btn" @click="onPersonEdit">edit</span>
    </div>
  </div>
</template>

<script>
import CardAvatar from './Avatar.vue';
import { markText } from '../tools/formating';

export default {
    name: 'PersonCard',
    components: { CardAvatar },
    limits: {
        MAX_BADGE_VALUE: 950
    },
    props: {
        person: {
            type: Object,
            require: true
        }
    },
    data: () => ({  }),
    computed: {
        isShowCommentCount() {
            return this.person.comments && this.person.comments.length > 0;
        },
        commentCount() {
            if (this.isShowCommentCount) {
                return this.person.comments.length > this.$options.limits.MAX_BADGE_VALUE
                    ? `${this.$options.limits.MAX_BADGE_VALUE}+`
                    : this.person.comments.length;
            }
            return '';
        },
        name() {
            return markText(this, this.person.name);
        },
        email() {
            return this.person.email;
        }
    },
    watch: {},
    methods: {
        onPersonEdit() {
            this.$emit('onPersonEdit', this.person.id);
        }
    }
};
</script>

<style lang="pcss" scoped>
.card {
    padding: 1rem;
    background: white;
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1);
    display: flex;
    /*box-sizing: border-box;*/
    &-avatar {
        position: relative;
        margin-right: 1rem;
    }
    &-comment {
        position: absolute;
        right: -7px;
        top: -10px;
        font-size: var(--font-size-small);
        background-color: var(--color-primary);
        color: #fff;
        padding: 0 3px;
    }
    &-info {
        width: 100%;
        overflow: hidden;
    }
    &-email {
        font-size: var(--font-size-small);
    }
    &-email,
    &-name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
.action-btn {
    color: var(--color-primary);
    font-size: var(--font-size-small);
    line-height: 1;
    border-bottom: 1px dashed currentColor;
    cursor: pointer;
    &:hover {
        opacity: .75;
    }

}
</style>
