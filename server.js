const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            email: 'dsally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(db.users);
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (email === db.users[0].email
        && password === db.users[0].password) {
        
        res.json('success');
    } else {
        res.status(400).json('username or password is incorrect');
    }
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;

    const user = findUser(id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json(`Could not find user with id: ${id}`);
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        // Store hash in your password DB.
        console.log(hash);
    });

    db.users.push({
        id: '125',
        name,
        email,
        password,
        entries: 0,
        joined: new Date()
    });

    res.json(db.users[db.users.length -1])
});

app.put('/image', (req, res) => {
    const { id } = req.body;

    const user = findUser(id);

    if (user) {
        user.entries++
        res.json(user.entries)
    } else {
        res.status(404).json(`Could not find user with id: ${id}`);
    }
});

app.listen(3000, () => {
    console.log('app is running in port 3000')
});

const findUser = (id) => {
    return db.users.find(user => {
        return user.id === id;
    });
}