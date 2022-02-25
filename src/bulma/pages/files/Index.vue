<template>
    <div class="file-manager"
        v-if="folders.length">
        <top v-model:query="query"
            :count="files.length"
            :filtered="filteredFiles.length"
            @clear="query = ''"
            @refresh="browse"/>
        <div class="columns is-variable is-2">
            <div class="column is-narrow py-1">
                <div class="box folders p-1">
                    <p class="is-family-secondary has-text-weight-medium"
                        v-for="folder in folders">
                        <folder :class="{'selected': folderId === folder.id}"
                            :folder="folder"
                            :key="folder.id"
                            @selected="browse(folder)"/>
                    </p>
                </div>
            </div>
            <div class="column files">
                <transition-group tag="div"
                    class="columns is-multiline is-variable is-1"
                    enter-active-class="animate__fadeIn"
                    leave-active-class="animate__fadeOut">
                    <div class="animate__animated column is-half py-1"
                        v-for="file in filteredFiles"
                        :key="file.id">
                        <file :file="file"
                            @delete="destroy(file)"/>
                    </div>
                </transition-group>
            </div>
            <loader large
                v-if="loading"/>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Loader from '@enso-ui/loader/bulma';
import Top from './components/Top.vue'
import Folder from './components/Folder.vue'
import File from './components/File.vue';

library.add(faUpload);

export default {
    name: 'Index',

    inject: ['errorHandler', 'http', 'i18n', 'route'],

    components: { Top, Folder, File, Fa, Loader },

    data: () => ({
        currentFolder: null,
        folders: [],
        files: [],
        loading: false,
        query: '',
    }),

    computed: {
        filteredFiles() {
            return this.query
                ? this.files.filter(({ name }) => name.toLowerCase()
                    .indexOf(this.query.toLowerCase()) > -1)
                : this.files;
        },
        folderId() {
            return this.currentFolder?.id;
        },
    },

    created() {
        this.fetch();
    },

    methods: {
        browse(folder = this.currentFolder) {
            this.currentFolder = folder;

            const { isSystem, endpoint, id } = folder;

            const path = isSystem 
                ? this.route(`core.files.${endpoint}`)
                : this.route('core.files.browse', id);

            this.loading = true;

            this.http.get(path)
                .then(({ data }) => this.files = data)
                .catch(this.errorHandler)
                .finally(() => (this.loading = false));
        },
        destroy({ id }) {
            this.loading = true;

            const index = id => this.files.findIndex(file => file.id === id);

            this.http.delete(this.route('core.files.destroy', id, false))
                .then(() => this.files.splice(index(id), 1))
                .catch(this.errorHandler)
                .finally(() => (this.loading = false));
        },
        fetch() {
            this.loading = true;

            this.http.get(this.route('core.files.index'))
                .then(({ data: { folders } }) => {
                    this.folders = folders;
                    if (folders.length > 0) {
                        this.browse(folders[0]);
                    }
                }).catch(this.errorHandler)
                .finally(() => (this.loading = false));
        },
    },
};
</script>

<style lang="scss">
    .file-manager {
        .control.has-icons-right {
            .icon.clear-button {
                pointer-events: all;
            }

            .input {
                width: 20em;
            }
        }

        .folders {
            .button {
                .icon {
                    width: 2em;
                }
            }
        }

        .box.folders {
            .selected {
                opacity: 1;
            }
        }
    }    
</style>
