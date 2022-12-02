const reducer = (state, { type, payload }) => {
    throw new Error(`no such action: ${type}`);
}

export default reducer