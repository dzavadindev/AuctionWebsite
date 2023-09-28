export const getProduct = (req, res) => {
    res.status(200).send("product");
}
export const getProducts = (req, res) => {
    res.status(200).send("products");
}
export const deleteProduct = (req, res) => {
    res.status(200).send("product deleted");
}
export const updateProduct = (req, res) => {
    res.status(200).send("product updated");
}
export const addProduct = (req, res) => {
    res.status(200).send("product added");
}