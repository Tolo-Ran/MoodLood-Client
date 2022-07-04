export const selectRowFeature = (selectionType, onChange) => {
    const config = {
        type: selectionType,
        onChange: onChange,
    };
    return config;
}
