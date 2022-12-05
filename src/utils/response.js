export const success = ({ data = {} }) => data;
export const error = ({ response: { data = {message: 'An error occured'} } = {} }) => data;