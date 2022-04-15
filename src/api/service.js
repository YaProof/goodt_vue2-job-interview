/**
 * @typedef {object} PersonGroup
 * @property {string} name
 * @property {Person[]} persons
 */
/**
 * @typedef {object} Person
 * @property {number} id
 * @property {string} name
 * @property {string} avatar
 * @property {string} position
 * @property {Comment[]} comments
 */
/**
 * @typedef {object} Comment
 * @property {number} id
 * @property {number} personId
 * @property {string} text
 * @property {string} createdAt
 */
/**
 * @typedef {object} ApiServiceOptions
 * @property {string} baseUrl
 */
export default class ApiService {
    /**
     * @param {ApiServiceOptions} options
     */
    constructor({ baseUrl = 'https://61adfd3ea7c7f3001786f510.mockapi.io/' } = {}) {
        this.options = { baseUrl };
    }
    /**
     * @returns {Promise.<Person[], Error>}
     */
    async getPersons() {
        const data = await Promise.all([fetch(`${this.options.baseUrl}person`), fetch(`${this.options.baseUrl}comment`)]);
        const [ persons, comments ] = await Promise.all(data.map(res => res.json()));

        // @TODO implement
        // mix comments to person here
        const commentObj = {};
        comments.forEach(c => {
            if (!commentObj[c.personId]) {
                commentObj[c.personId] = [];
            }
            commentObj[c.personId].push(c);
        });

        persons.forEach(p => {
            if (commentObj[p.id]) {
                p.comments = commentObj[p.id];
            }
        })

        return persons;
    }
    /**
     * @returns {Promise.<Comment[], Error>}
     */
    async getComments() {
       let response = await fetch(`${this.options.baseUrl}comment`);

        if (response.ok) {
            return await response.json(); 
        } else {
            throw new Error(`HTTPS status ${response.status}`);
        }
    }
}
