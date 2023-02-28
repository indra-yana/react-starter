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

function dateFormater(date, dateFormat, separator) {
    function format(m) {
        let f = new Date(date);

        return f.toLocaleDateString(['id', 'en'], m);
    }
    return dateFormat.map(format).join(separator);
}

function dateFormat2(date, separator = '-') {
    const format = [
        { year: 'numeric' },
        { month: '2-digit' },
        { day: '2-digit' },
    ];

    date = date || new Date();

    return dateFormater(date, format, separator);
}