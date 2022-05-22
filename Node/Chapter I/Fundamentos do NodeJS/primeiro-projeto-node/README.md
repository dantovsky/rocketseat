# FinApi - Financeia

---

## Requisitos

- [x] Deve ser possível criar umma conta
- [x] Deve ser possível buscar o extrato bancário (statement) do cliente
- [] Deve ser possível realizar um depósito
- [] Deve ser possível realizar um saque
- [] Deve ser possível buscar o extrato bancário do cliente por data
- [] Deve ser possível atualizar dados da conta do cliente
- [] Deve ser possível obter dados da conta do cliente
- [] Deve ser possível deletar uma conta

---

## Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com CPF já existente
- [x] Não deve ser possível fazer depósito em uma conta não existente
- [] Não deve ser possível buscar extrato em uma conta não existente
- [] Não deve ser possível fazer saque em uma conta não existente
- [] Não deve ser possível excluir uma conta não existente
- [] Não deve ser possível fazer saque quando o saldo for insuficiente

## Pacotes instalados

- yarn add uuid


## Middlewares

Como definimos que uma função vai ser um Middleware?  
» Precisa receber 3 params: `request, response, next`. O `next` é que irá definir se o Middleware prossegue com a operação ou se vai parar.

```js

// Criação de um Middleware
function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.params

    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return response.status(400).json({ error: "Customer not found!" })
    }

    return next(); // Manda prosseguir, pois existe um customer (o Middleware não encontrou nenhum problemas nas verificações)
}

// Para usar o Middleware, temos 2 formas:

// Forma 1
app.use(verifyIfExistsAccountCPF); // neste caso, todas as rotas que se encontra abaixo irão utilizar esse Middleware

// Forma 2 :: devemos chamá-los entre a rota e o (req, res)
app.get('/statement/:cpf', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    
    return response.json(customer.statement)
})
```