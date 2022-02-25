<template>
     <div class="level is-mobile">
        <div class="level-left">
            <div class="level-item">
                <div class="field has-addons has-addons-right">
                    <div class="control has-icons-left has-icons-right">
                        <input class="input filter"
                            :value="query"
                            @input="$emit('update:query', $event.target.value)"
                            type="text"
                            :placeholder="i18n('Filter files')">
                        <span class="icon is-small is-left">
                            <fa icon="search"/>
                        </span>
                        <span class="icon is-small is-right clear-button"
                            @click="$emit('clear')"
                            v-if="query">
                            <a class="delete is-small"/>
                        </span>
                    </div>
                </div>
            </div>
            <div class="level-item"
                v-if="count > 0">
                <span class="mr-1"
                    v-if="filtered !== count">
                    {{ filtered }} {{ i18n('filtered from') }}
                </span>
                <span>
                    {{ count }} {{ i18n('files')}}
                </span>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <enso-uploader compact
                    multiple
                    :url="route('core.uploads.store')"
                    file-key="upload"
                    @upload-successful="filesUploaded"/>
            </div>
            <div class="level-item">
                <a class="button"
                    @click="$emit('refresh')">
                    <span class="icon">
                        <fa icon="sync"/>
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faSync } from '@fortawesome/free-solid-svg-icons';
import { EnsoUploader } from '@enso-ui/uploader/bulma';

library.add(faSearch, faSync);

export default {
    name: 'Top',

    components: { Fa, EnsoUploader },

    inject: ['i18n', 'route'],

    props: {
        count: {
            type: Number,
            required: true,
        },
        filtered: {
            type: Number,
            required: true,
        },
        query: {
            type: String,
            required: true,
        },
    },

    emits: ['clear', 'refresh', 'update:query'],

    methods: {
        filesUploaded() {
            console.log('not implemented');
        },
    },
};
</script>