const express = require('express');
const fs = require('fs');
const { v4 } = require('uuid');
const bcrypt = require('bcrypt');
const app = express();

// app.use((req, res, next) => {
//     console.log("1 Middleware")
//     next();
// })


// app.use((req, res, next) => {
//     req.user = "username"
//     console.log("2 Middleware")
//     next();
// })

app.use(express.json())

const port = 5000;

app.get('/products', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

    let response = data;

    if (req.query.price) {
        const price = Number(req.query.price);
        if (req.query.value === 'gt') {

            response = data.filter(item => item.price > price);

        } else if (req.query.value === 'lt') {
            response = data.filter(item => item.price < price);
        } else {
            response = data.filter(item => item.price === price);
        }
    }

    res.send(response)
});

app.get('/products/:id', (req, res) => {

    const id = Number(req.params.id)

    console.log(req.user)
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    const response = data.find(item => item.id === id)
    if (response) {
        res.send(response)
    } else {

        res.status(404).send("Data not found..!")
    }
});

async function checkPassword(userPassword, dataPassword) {
    const data = await bcrypt.compare(userPassword, dataPassword);
    return data;
}
app.post('/user', async (req, res) => {
    const { username, password } = req.body;

    const data = JSON.parse(fs.readFileSync('data.json'));

    if (username && password) {
        const response = data.find(item => item.username === username);
        const match = await checkPassword(password, response.password)
        if (match) {
            res.send(response)
        } else {
            res.status(404).send("Invalid username or password")
        }
    } else {
        res.status(400).send("Username and Password both filed required")
    }

})


app.post('/user/create', async (req, res) => {

    const id = v4()
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

    const password = await bcrypt.hash(req.body.password, 10);

    const checkEmail = data.find(user => user.email === req.body.email);

    if (checkEmail) {
        res.status(400).send("Duplicate email address")
        return;
    }

    const checkUsername = data.find(user => user.username === req.body.username);
    if (checkUsername) {
        res.status(400).send("Duplicate username")
        return;
    }

    data.push({ ...req.body, password, id })
    const newData = JSON.stringify(data)
    fs.writeFileSync('data.json', newData);

    res.send("user created")
})

app.put('/user/update/:id', (req, res) => {

    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    const user = data.find(items => items.id === req.params.id);

    if (user) {



        fs.writeFileSync('data.json', JSON.stringify(data));
        res.send("user updated");
        return;
    }

    res.send("User not found..!")
})

app.get('/user/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    const user = data.find(items => items.id === req.params.id);

    if (user) {
        res.send(user);
        return;
    }

    res.send("User not found..!")

})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
