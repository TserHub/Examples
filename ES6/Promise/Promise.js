const getUsers = async () => {
  const users = await fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json());
  return fetch(`http://jsonplaceholder.typicode.com/users/${users[0].id}`);
};
const getUser = () => {
  return new Promise((resolve, reject) => {
    getUsers()
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
getUser()
  .then(res => console.log(res))
  .catch(err => console.error(err));
