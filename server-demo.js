// Asynchronous
// console.log('Before');
// getUser(1, user => {
//     getRepositories(user.gitHubUsername, repos => {
//         getCommits(repos[0], commits => {
//             console.log(commits)
//         })
//     })
// });

getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message));

console.log('After');

// Callbacks
// Promises
// Async/await

// function getUser(id, callback) { // Function with callback
//     setTimeout(() => {
//         console.log('Reading a user form the database...');
//         callback({id: id, gitHubUsername: 'Oleg'});
//     }, 2000);
// }

function getUser(id) { // Function with Promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from the database...');
            resolve({id: id, gitHubUsername: 'Oleg'})
        }, 2000);
    })
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading repositories from the database...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading the commits from the database...');
            resolve(['commit']);
        }, 2000)
    })
}
