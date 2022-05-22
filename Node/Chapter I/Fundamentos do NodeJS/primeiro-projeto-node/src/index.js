const { response } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid")

const app = express();

app.use(express.json());

const customers = [];

// ------------------------------------------
// Middleware
// ------------------------------------------

function verifyIfExistsAccountCPF(request, response, next) {
    
}

// ------------------------------------------
// Rotas
// ------------------------------------------

/**
 * Adicionar uma nova conta de cliente
 * cpf: string
 * name: string
 * id: uuid
 * statement: º[]
 */
app.post('/account', (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    )

    if (customerAlreadyExists) {
        return response.status(400).json({ error: "customer already exists" })
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })

    return response.status(201).send(customers);
})

// Obter o estrato bancário a partir de um CPF :: statement é o estrato bancário
app.get('/statement/:cpf', (request, response) => {
    const { cpf } = request.params

    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return response.status(400).json({ error: "Customer not found!" })
    }

    return response.json(customer.statement)

})

app.listen(3333)