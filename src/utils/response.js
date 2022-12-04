export const success = ({ data }) => data;
export const error = ({ response: { data } }) => data;