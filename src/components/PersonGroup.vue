<template>
    <div class="person-group">
        <h2 class="person-group-name">{{ personGroup.name }}</h2>

        <div v-if="isManagerGroup" class="list">
            <manager-person-card
                v-for="person in personGroup.persons"
                :key="person.id"
                :manager="person"
                @onPersonEdit="onPersonEdit"
            />
        </div>

        <div v-else class="list">
            <person-card
                v-for="person in personGroup.persons"
                :key="person.id"
                :person="person"
                @onPersonEdit="onPersonEdit"
            />
        </div>
    </div>
</template>

<script>
import PersonCard from './PersonCard.vue';
import ManagerPersonCard from './ManagerPersonCard.vue';

export default {
    name: 'PersonGroup',
    components: { PersonCard, ManagerPersonCard },
    props: {
        personGroup: {
            type: Object,
            require: true
        }
    },
    groupNames: {
        MANAGER: 'Manager'
    },
    data: () => ({  }),
    computed: {
        isManagerGroup() {
            return this.personGroup.name === this.$options.groupNames.MANAGER;
        }
    },
    watch: {},
    methods: {
        onPersonEdit(id) {
            this.$emit('onPersonEdit', id);
        }
    }
};
</script>

<style lang="pcss" scoped>
.person-group {
    margin-bottom: 2rem;

    &-name {
        margin-bottom: 1rem;
    }
}
.list {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}
</style>
