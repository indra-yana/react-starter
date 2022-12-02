let users = [
    {
        id: "dsknfseilerywq",
        first: "Your",
        last: "Name",
        avatar: "https://placekitten.com/g/200/200",
        twitter: "your_handle",
        notes: "Some notes",
        favorite: true,
    },
    {
        id: "iymldefmgidfgm",
        first: "Another",
        last: "Else",
        avatar: "https://placekitten.com/g/200/200",
        twitter: "another twiter",
        notes: "My Notes!",
        favorite: false,
    }
];

async function getContacts(q = null) {
    if (q) {
        // await sleep(2000);
        return users.filter((item) => {
            return item.first.concat(item.last).toLowerCase().indexOf(q) != -1
        });
    }

    return users;
}

// Fake like thread.sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function createContact(newContact = {}) {
    newContact = {
        id: "jgydgs3ehgfhb",
        first: "John",
        last: "Doe",
        avatar: "https://placekitten.com/g/200/200",
        twitter: "@john",
        notes: "This is some another notes",
        favorite: true,
    };

    users.push(newContact);

    return newContact;
}

async function updateContact(id, data) {
    const index = users.findIndex((item) => item.id === id);

    if (index === -1) {
        throw new Error('Data not found!');
    } 

    users[index] = {
        ...users[index],
        ...data, 
    };
}

async function deleteContact(id) {
    const index = users.findIndex((item) => item.id === id);
    if (index === -1) {
        throw new Error('Data not found!');
    }

    users.splice(index, 1);
}

async function find(id) {
    const contact = (await getContacts()).filter((item) => item.id === id)[0];
    if (!contact) {
        throw new Error('Data not found!');
    }

    return contact;
}

export {
    getContacts,
    find,
    createContact,
    updateContact,
    deleteContact,
}