export const VIEW_STATE = {
    LOADING: false,
    SUCCESS: false,
    ERROR: false,
    RESULT: {},
}

export const STATE = {
    Default: VIEW_STATE,
    Loading: () => {
        return {
            ...VIEW_STATE,
            LOADING: true,
        }
    },

    Success: (result) => {
        return {
            ...VIEW_STATE,
            SUCCESS: true,
            RESULT: result,
        }
    },

    Error: (result) => {
        return {
            ...VIEW_STATE,
            ERROR: true,
            RESULT: result,
        }
    },
}
