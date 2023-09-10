export function parseJsonOrString(text) {
    return isJson(text) ? JSON.parse(text) : text;
}

export function isJson(text) {
    if (typeof text !== "string") {
        return false;
    }

    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}

export function handleUploadedFile(config = {}) {
    const { folder, key, filename } = config;

    if (!isValidUrl(filename) && filename) {
        const url = import.meta.env.VITE_APP_UPLOADED_URL;

        return url.replace(':folder', folder).replace(':key', key).replace(':filename', filename);
    }

    if (!filename && folder === 'avatar') {
        return "/assets/img/avatar-profile.png";
    }

    return filename;
}

export function isValidUrl(urlString) {
    try {
        return Boolean(new URL(urlString));
    } catch (e) {
        return false;
    }
}
