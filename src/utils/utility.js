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
