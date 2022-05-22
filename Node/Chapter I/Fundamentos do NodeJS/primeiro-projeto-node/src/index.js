const { response } = require("express");
const express = require("express");
const req = require("express/lib/request");
const { v4: uuidv4 } = require("uuid")

const app = express();

app.use(express.json());

const customers = [];

// ------------------------------------------
// Middleware
// ------------------------------------------

function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.params

    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return response.status(400).json({ error: "Customer not found!" })
    }

    // Forma de repassar a info que estamos consumindo dentro do Middleware para as demais rotas » vamos utilizar o request
    request.customer = customer // quem chamar o Middleware verifyIfExistsAccountCPF vai ter acesso ao request.customer

    return next(); // Manda prosseguir, pois existe um customer (o Middleware não encontrou nenhum problemas nas verificações)
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

// app.use(verifyIfExistsAccountCPF); // neste caso, todas as rotas que se encontra abaixo irão utilizar esse Middleware

// Obter o estrato bancário a partir de um CPF :: statement é o estrato bancário
app.get('/statement/:cpf', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    
    return response.json(customer.statement)
})

app.listen(3333)