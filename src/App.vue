<template>
    <div id="app">
        <div class="search-bar">
            <search-bar v-model="searchText" placeholder="Search by first/last" />
        </div>

        <section>
            <virtual-scroll :items="personGroupsByPosition">
                <template v-slot="{ items }">
                    <person-group
                        v-for="group in items"
                        :key="group.name"
                        :personGroup="group"
                        @onPersonEdit="onPersonEdit"
                    />
                </template>
            </virtual-scroll>
        </section>

        <person-editor
            v-if="editedPersonIndex > -1"
            :person="persons[editedPersonIndex]"
            :positions="positions"
            @save="changePerson"
            @cancel="cancelEditor"
        />

        <app-confirm
            ref="confirmMessage"
            title="Отмена внесения изменения"
            message="Вы уверены?"
        />
    </div>
</template>
<script>
// use this Service class to load data
import ApiService from './api/service.js';
import PersonGroup from './components/PersonGroup.vue';
import SearchBar from './components/SearchBar.vue';
import PersonEditor from './components/PersonEditor.vue';
import AppConfirm from './components/AppConfirm.vue';
import VirtualScroll from './components/VirtualScroll.vue';
// import persons from './api/data';
import { getFilteredFunction } from './tools/util';

export default {
    name: 'App',
    components: {
        PersonGroup,
        SearchBar,
        PersonEditor,
        AppConfirm,
        VirtualScroll
    },
    data: () => ({
        persons: [],
        positions: [],
        editedPersonIndex: -1,
        searchText: ''
    }),
    computed: {
        /**
         * @return {import('./api/service.js').Person[]}
         */
        filteredPersons() {
            const filters = [
                getFilteredFunction('name', this.searchText, this.filteredByName),
                getFilteredFunction('email', this.searchText, this.filteredByEmail)
            ]

            return this.persons.filter(p => filters.some(fn => fn.call(p)));
        },
        /**
         * @return {PersonGroup[]}
         */
        personGroupsByPosition() {
            return this.getGroupPersonByPosition(this.filteredPersons);
        }
    },
    methods: {
        /**
         * @param {Person[]} persons
         * @return {string[]}
         */
        getPositions(persons) {
            return [ ...new Set(persons.map(p => p.position)) ];
        },
        /**
         * @param {string} text
         * @param {string} subText
         * @param {string} seporator
         * @return {boolean}
         */
        searchStartTextWithSeporator(text, subText, seporator) {
            const words = text.toUpperCase().split(seporator);
            const start = subText.toUpperCase();
            return words.some(w => w.startsWith(start));
        },
        /**
         * @param {string} text
         * @param {string} subText
         * @return {boolean}
         */
        filteredByName(text, subText) {
            return this.searchStartTextWithSeporator(text, subText, ' ');
        },
        /**
         * @param {string} text
         * @param {string} subText
         * @return {boolean}
         */
        filteredByEmail(text, subText) {
            return this.searchStartTextWithSeporator(text, subText, '@');
        },
        updatePerson(val) {
            const idx = this.persons.findIndex(p => p.id === val.id);
            
            if (idx === -1) {
                throw new Error(`Unknow persons id = ${val.id}`);
            }

            this.persons.splice(idx, 1, { ...this.persons[idx], ...val });
        },
        changePerson(val) {
            this.updatePerson(val);
            this.closePersonEditor();
        },
        cancelEditor() {
            this.$refs.confirmMessage.confirm()
                .then(res => {
                    if (res) {
                        this.closePersonEditor();
                    }
                });
        },
        /**
         * @return {PersonGroup[]}
         */
        getGroupPersonByPosition(persons) {
            const result = [];

            const groups = {};
            persons.forEach(p => {
                if (!groups[p.position]) {
                    groups[p.position] = [];
                }
                groups[p.position].push(p);
            });

            for(const key of Object.keys(groups)) {
                result.push({
                    name: key,
                    persons: groups[key]
                });
            }

            return result;
        },
        async fetchPersons() {
            // Use ApiService `getPersons` call here to load data
            const api = new ApiService();
            this.persons = await api.getPersons();
            this.positions = this.getPositions(this.persons);
        },
        onPersonEdit(id) {
            this.editedPersonIndex = this.persons.findIndex(p => p.id === id);
        },
        closePersonEditor() {
            this.editedPersonIndex = -1;
        }
    },
    created() {
        this.fetchPersons();
    }
};
</script>
<style lang="pcss" scoped>
.search-bar {
    margin-bottom: 1rem;
    &-input {
        width: 100%;
    }
}

</style>
