export const idGenerator = () => {
    return Math.floor(100000 + Math.random() * 900000 + 1).toString().toString();
}