export const getUser = (req, res) => {
    res.status(200).send("user");
}
export const getUsers = (req, res) => {
    res.status(200).send("users");
}
export const deleteUser = (req, res) => {
    res.status(200).send("user deleted");
}
export const updateUser = (req, res) => {
    res.status(200).send("user updated");
}
export const addUser = (req, res) => {
    res.status(200).send("user added");
}