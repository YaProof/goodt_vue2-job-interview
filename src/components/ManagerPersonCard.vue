<script>
import PersonCard from './PersonCard.vue';

const withSecretPersonProps = (component, fields, mask) => {
    const parent = { ...component };
    parent.props = { ...component.props };
    delete parent.props.person;

    return {
        name: 'ManagerPersonCard',
        extends: parent,
        props: {
            manager: Object
        },
        computed: {
            person() {
                const result = { ...this.manager };

                fields.forEach(p => {
                    if (result[p]) {
                        result[p] = result[p].replace(/[\s\S]/g, mask);
                    }
                });

                return result;
            }
        }
    }
}

const SecurePersonCard = withSecretPersonProps(PersonCard, ['email'], '*');

export default SecurePersonCard;
</script>

<style lang="pcss" scoped>
.card {
    padding: 1rem;
    background: white;
    box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.3);
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
    &-name {
      text-decoration: underline;
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