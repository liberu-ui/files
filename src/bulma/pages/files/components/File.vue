<template>
    <div class="box file-box raises-on-hover p-1 mb-1"
        v-click-outside="() => actions = false">
        <div class="level is-mobile m-0">
            <div class="level-left is-flex-shrink-1">
                <div class="level-item is-narrow mr-2">
                    <p class="has-text-centered">
                        <fa :icon="icon"
                            size="2x"/>
                    </p>
                </div>
                <div class="level-item is-flex-direction-column is-align-items-flex-start
                    is-flex-shrink-1">
                    <div class="filename has-text-weight-bold">
                        <input class="input"
                            v-model="file.name"
                            v-click-outside="cancelEdit"
                            v-focus
                            v-select-on-focus
                            @keydown.enter="update"
                            @keydown.esc="cancelEdit"
                            v-if="editing">
                        <span class="base"
                            @click.right.prevent="edit"
                            v-else>
                            {{ file.name }}.
                        </span>    
                        <span class="extension"
                            @click.right.prevent="edit"
                            v-if="!editing">
                            {{ file.extension }}
                        </span>    
                    </div>
                    <p class="info is-family-code">
                        {{ file.size }}, {{ timestamp }}
                    </p>
                </div>
            </div>
            <div class="level-right is-narrow">
                <div class="level-item is-flex-direction-column">
                    <actions class="is-align-self-flex-end"
                        :file="file"
                        :visible="actions"
                        @copy-to-clipboard="showMessage"
                        @show="actions = true"
                        @hide="actions = false"
                        v-bind="$attrs"
                        v-if="!editing"/>
                    <div class="is-flex is-align-self-flex-end">
                        <p class="has-text-success mr-2"
                            v-if="message">
                            {{ message }}
                        </p>
                        <avatar class="is-24x24"
                            tooltip
                            :user="file.owner"
                            v-if="file.owner"/>
                        <figure class="image is-24x24"
                            v-else/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import Avatar from '@enso-ui/users/src/bulma/pages/users/components/Avatar.vue';
import { EnsoFile } from '@enso-ui/mixins';
import { clickOutside, focus, selectOnFocus } from '@enso-ui/directives';
import format from '@enso-ui/ui/src/modules/plugins/date-fns/format';
import Actions from './Actions.vue';

export default {
    name: 'File',

    directives: { clickOutside, focus, selectOnFocus },

    components: { Actions, Fa, Avatar },

    inject: ['errorHandler', 'http', 'route'],

    props: {
        file: {
            type: Object,
            required: true,
        },
    },

    data: v => ({
        editing: false,
        actions: false,
        message: null,
        originalName: v.file.name,
    }),

    computed: {
        icon() {
            return (new EnsoFile(this.file)).icon();
        },
        timestamp() {
            return format(this.file.createdAt, 'd M Y h:i');
        }
    },

    methods: {
        cancelEdit() {
            this.file.name = this.originalName;
            this.editing = false;
        },
        edit() {
            if (this.file.isManageable) {
                this.editing = true;
            }
        },
        showMessage(message) {
            this.message = message;

            setTimeout(() => (this.message = null), 2500);
        },
        update() {
            if (this.file.name === '' || this.file.name.length > 255) {
                return;
            }

            const { id, name } = this.file;

            this.http.patch(this.route('core.files.update', id), { name })
                .then(() => (this.originalName = this.file.name))
                .catch(this.errorHandler)
                .finally(() => (this.editing = false));
        },
    },
};
</script>

<style lang="scss">
    .box.file-box {
        cursor: pointer;

        .level {
            .level-left {
                overflow: hidden;

                .filename .base, .info {
                    word-break: break-all;
                }
            }
            .level-right {
                .v-popper__inner {
                    padding: 1px;
                }

                .image.avatar {
                    margin: 0 0 0 auto;
                }
            }
        }
    }
</style>
