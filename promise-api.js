// const p1 = new Promise(resolve => {
//     setTimeout(() => {
//         console.log('Async operation 1...');
//         resolve(1);
//     }, 2000)
// });
//
// const p2 = new Promise((resolve) => {
//     setTimeout(() => {
//         console.log('Async operation 2...');
//         resolve(2)
//     }, 2000)
// });
//
//
// Promise.race([p1, p2]) // Return array of promises
//     .then(result => console.log(result))
//     .catch(err => console.log('Error', err.message));

// Promise-based approach
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits', commits))
//     .catch(err => console.log('Error', err.message));

// Async and await approach
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err) {
        console.log('Error', err.message);
    }
}

displayCommits();


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