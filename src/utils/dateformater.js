const dateOptions = {
    weekday: 'short', // (i.e. full, long, short)
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
};

const timeOptions = {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    // second:'2-digit',
}

export function dateFormat(date, useTime = false) {
    if (!date) {
        return 'N/A';
    }

    const dateFormat = new Date(date);
    let options = dateOptions;
    if (useTime) {
        options = {
            ...options,
            ...timeOptions,
        }
    }

    return dateFormat.toLocaleDateString(['id', 'en'], options);
}