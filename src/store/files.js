export const state = {
    types: [],
};

export const getters = {
    browsable: state => state.types.filter(({ isBrowsable }) => isBrowsable),
    uploadFolder: state => state.types.find(({ isUpload }) => isUpload)
};

export const mutations = {
    set: (state, types) => (state.types = types),
};
