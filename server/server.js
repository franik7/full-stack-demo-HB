//import packages
const express = require("express");
const cors = require("cors");

let usersDB = require('./users.JSON')

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//Routes
app.get("/allUsers", (req , res) => {
    res.status(200).send(usersDB)
} )



app.post('/createNewUser', (req, res) => {
    console.log(req.body);
    const { username, firstName, lastName, age } = req.body;

    if (!username || !firstName || !lastName) {
        res.status(400).send('Forms cannot be empty');
        return;
    }

    // Ensure usersDB is an array (initialize as an empty array if undefined)
    if (!Array.isArray(usersDB)) {
        usersDB = [];
    }

    // Insert into database
    let newUser = {
        username: username,
        firstName: firstName,
        lastName: lastName,
        age: age,
    };

    usersDB.push(newUser);

    // Send a response to the client
    res.status(200).send(usersDB);
});


app.put('/updateUser/:name', (req, res) => {
    const { name } = req.params;
    const { username } = req.body;

    if (!username) {
        res.status(400).send('User not found');
        return;
    }

    // Corrected usage: find instead of filter
    const userToBeUpdated = usersDB.find(el => el.username === name);

    // Check if the user to be updated exists
    if (!userToBeUpdated) {
        res.status(400).send('User not found');
        return;
    }

    userToBeUpdated.username = username;

    res.status(200).send('Successfully updated user');
});

app.delete('/deleteUser/:username', (req ,res) => {
    const {username} = req.params
    usersDB.filter((el, index, arr) => {
        if(el.username === username){
            arr.splice(index, 1)
            res.status(200).send('Successfully deleted user')
        }
    })
   
    res.status(400).send('User not found')
})



app.listen(4001, () => {
    console.log("Server is listening on port 4001");
})