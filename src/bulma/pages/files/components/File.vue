<template>
    <div class="box file-box raises-on-hover p-2 mb-1"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false">
        <div class="level is-mobile m-0">
            <div class="level-left is-flex-shrink-1">
                <div class="level-item">
                    <p class="has-text-centered">
                        <fa :icon="icon"
                            size="2x"/>
                    </p>
                </div>
                <div class="filename level-item is-flex-direction-column
                    is-align-items-flex-start is-flex-shrink-1">
                    <p class="has-text-weight-bold">
                        {{ file.name }}
                    </p>
                    <p class="is-family-code">
                        {{ file.size }}, {{ timestamp }}
                    </p>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item is-flex-direction-column">
                    <actions class="is-align-self-flex-end"
                        v-bind="$attrs"
                        :file="file"
                        :hovering="hovering"
                        @copy-to-clipboard="showMessage"/>
                    <div class="is-flex is-align-self-flex-end">
                        <fade>
                            <p class="has-text-success mr-2"
                                v-if="message">
                                {{ message }}
                            </p>
                        </fade>
                        <avatar class="is-24x24"
                            :user="file.owner"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import Avatar from '@enso-ui/users/src/bulma/pages/users/components/Avatar.vue';
import { Fade } from '@enso-ui/transitions';
import { EnsoFile, numberFormat } from '@enso-ui/mixins';
import format from '@enso-ui/ui/src/modules/plugins/date-fns/format';
import Actions from './Actions.vue';

export default {
    name: 'File',

    components: { Fade, Actions, Fa, Avatar },

    inject: ['errorHandler', 'http', 'route'],

    props: {
        file: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        hovering: false,
        message: null,
    }),

    computed: {
        icon() {
            return (new EnsoFile(this.file.name)).icon();
        },
        timestamp() {
            return format(this.file.createdAt, 'd M Y h:i');
        }
    },

    methods: {
        showMessage(message) {
            this.message = message;

            setTimeout(() => (this.message = null), 2500);
        },
    },
};
</script>

<style lang="scss">
    .box.file-box {
        cursor: pointer;
        max-width: 600px;

        .level {
            .level-left {
                min-width: 0;

                .filename {
                    min-width: 0;

                    p {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        max-width: 100%;
                    }
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
