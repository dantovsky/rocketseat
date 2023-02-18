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
    const { cpf } = request.headers

    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return response.status(400).json({ error: "Customer not found!" })
    }

    // Forma de repassar a info que estamos consumindo dentro do Middleware para as demais rotas » vamos utilizar o request
    request.customer = customer // quem chamar o Middleware verifyIfExistsAccountCPF vai ter acesso ao request.customer

    return next(); // Manda prosseguir, pois existe um customer (o Middleware não encontrou nenhum problemas nas verificações)
}

function getBalance(statement) {
    // Usar o reduce() para calcular o que recebeu e o que gastou

    const balance = statement.reduce((acc, operation) => {
        if (operation.type === 'credit') {
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }, 0);

    return balance;
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

// Obter o extrato bancário (geral) :: statement é o extrato bancário
app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    // console.log(customer)

    return response.json(customer.statement)
})

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
    const { description, amount } = request.body;

    const { customer } = request; // recupera o user, já validando se a conta é válida

    // Vamos chamar o depósito e o saque de "operações"
    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit" // credit | debit
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();
})

// Realizar saque
app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
    const { amount } = request.body;
    const { customer } = request;

    const balance = getBalance(customer.statement);

    if (balance < amount) {
        return response.status(400).json({ error: "Insufficient funds!" })
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit" // credit | debit
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();
})

// Obter o extrato bancário a partir de uma data :: statement é o extrato bancário
app.get('/statement/date', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00"); // buscar pela data independente da hora da transação ("00:00" é um hack para obter qualquer horário do dia)
    // console.log(customer)

    const statement = customer.statement.filter(statement => statement.created_at.toDateString() === new Date(dateFormat).toDateString())

    return response.json(statement)
})

app.put('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { name } = request.body;
    const { customer } = request;

    customer.name = name;

    return response.status(201).send(customer);
})

app.get('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    return response.send(customer);
})

app.delete('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    // splice
    customers.splice(customer, 1);

    return response.send(customers);
})

app.get("/balance", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    const balance = getBalance(customer.statement);

    return response.json(balance)
})

app.listen(3333)