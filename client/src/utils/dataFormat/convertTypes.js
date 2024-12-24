export const strToBool = (str) => {
    if (str === 'true') return true;
    return false;
}
export const fileToArray = (file, acceptedFileType, storeSetter) => {
    if (!file) {
        console.log("No file selected.")
        alert("No file selected.");
        return;
    }
    if (file.type !== acceptedFileType) {
        console.log("Unaccepted file type. must be a type of " + acceptedFileType);
        alert("unaccepted file type. must be a type of " + acceptedFileType);
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const json = JSON.parse(e.target.result);
            storeSetter(json);
        } catch (error) {
            alert("Invalid JSON file.");
            console.error(error);
        }
    };

    reader.onerror = () => {
        alert("Failed to read file.");
    };
    reader.readAsText(file);
}