const users = [
  {id: 100, email: 'me@gmail.com', password: 'me'},
  {id: 101, email: 'them@gmail.com', password: 'them'},
]

const findUser = ({email, id}) => users.find(u => u.email == email || u.id == id)
const updateUserById = (id, payload) => {
  let idx = users.findIndex(u => u.id == id)
  if (idx == -1) {
    return null
  }
  users[idx] = {
    ...users[idx],
    ...payload
  }
  return users[idx]
}

const printUsers = () => console.log(users)

module.exports = {
  findUser,
  updateUserById,
  printUsers
}