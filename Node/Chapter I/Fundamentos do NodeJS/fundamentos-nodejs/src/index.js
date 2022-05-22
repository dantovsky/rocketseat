const express = require('express');
const req = require('express/lib/request');

const app = express();

app.use(express.json()); // Middleware

app.get('/courses', (request, response) => {

    const query = request.query
    console.log(query) // { page: '1', order: 'asc' }
    // GET http://localhost:3333/courses?page=1&order=asc

    return response.json(["Curso 1", "Curso 2", "Curso 3"])
})

app.post("/courses", (request, response) => {

    const body = request.body;
    console.log(body)

    return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"])
})

app.put("/courses/:id", (request, response) => {
    
    const {id} = request.params
    console.log(id)

    return response.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"])
})

app.patch("/courses/:id", (request, response) => {
    return response.json(["Curso 6", "Curso 7", "Curso 3", "Curso 4"])
})

app.delete("/courses/:id", (request, response) => {
    return response.json(["Curso 1", "Curso 2", "Curso 4"])
})

// Start app
app.listen(3333);