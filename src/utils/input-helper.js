export function handleInputType(e) {
    const { 
        type = 'text', 
        value = "", 
        checked = false,
        files = null 
    } = e.target;

    switch (type) { 
        case 'file':
            return files[0];
        case 'checkbox':
        case 'radio':
            return checked;
        case 'text': 
        case 'number': 
        case 'email':
        case 'select':
        case 'hidden':
        default:
            return value;
    }
}