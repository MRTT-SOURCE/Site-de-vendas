🛒 Sistema de Vendas / Marketplace

Sistema completo de Marketplace / E-commerce com painel administrativo, desenvolvido com arquitetura Full Stack moderna.

O projeto permite:

gerenciamento de produtos

cadastro de clientes

criação de pedidos

acompanhamento de vendas

painel administrativo

loja online com carrinho


🏗 Arquitetura do Projeto
```
Sistemadevendas
│
├── backend
│   └── SistemaVendas.Api
│        ├── Controllers
│        ├── Models
│        ├── Data
│        ├── Services
│        ├── Program.cs
│        └── SistemaVendas.Api.csproj
│
├── frontend
│   └── marketplace-front
│        ├── app
│        ├── components
│        ├── context
│        ├── services
│        ├── types
│        └── styles
│
└── README.md
```
🚀 Tecnologias Utilizadas
Backend

.NET 8

ASP.NET Web API

Entity Framework Core

SQLite

Swagger

Frontend

Next.js

React

TailwindCSS

Axios

🎯 Funcionalidades
Loja

✔ Listagem de produtos
✔ Página de detalhes do produto
✔ Carrinho de compras
✔ Checkout
✔ Criação de pedidos
✔ Tema Dark / Light

Painel Administrativo

✔ Dashboard
✔ Gestão de produtos
✔ Gestão de clientes
✔ Gestão de pedidos
✔ Alteração de status de pedidos

📦 Modelos do Sistema
```
Cliente

Id
Nome
Email
Telefone
Cpf
DataCadastro
```
```
Produto

Id
Nome
Descricao
Preco
Estoque
ImagemUrl
DataCadastro
```
```
Venda

Id
ClienteId
DataVenda
Status
ValorTotal
```
```
ItemVenda

Id
VendaId
ProdutoId
Quantidade
PrecoUnitario
```
📊 Status de Pedido

Pendente
Em processamento
Finalizado
Cancelado

🗄 Banco de Dados

Banco utilizado:

SQLite

Arquivo gerado automaticamente:

vendas.db

Tabelas principais:

Clientes
Produtos
Vendas
ItensVenda

⚙️ Instalação e Execução

1️⃣ Clonar o projeto
git clone https://github.com/seuusuario/sistemadevendas.git

▶ Rodar Backend

Entre na pasta:

cd backend/SistemaVendas.Api

Execute:

dotnet run

Swagger disponível em:

http://localhost:5000/swagger

▶ Rodar Frontend

Entre na pasta:

cd frontend/marketplace-front

Instale dependências:

npm install

Execute:

npm run dev

Acesse:

http://localhost:3000

🔌 Rotas da API
```
Produtos
GET    /api/produtos
GET    /api/produtos/{id}
POST   /api/produtos
PUT    /api/produtos/{id}
DELETE /api/produtos/{id}
```
```
Clientes
GET    /api/clientes
GET    /api/clientes/{id}
POST   /api/clientes
PUT    /api/clientes/{id}
DELETE /api/clientes/{id}
```
```
Pedidos / Vendas
GET    /api/vendas
GET    /api/vendas/{id}
POST   /api/vendas
PUT    /api/vendas/{id}/status
DELETE /api/vendas/{id}
```
🧠 Conceitos Aplicados

Arquitetura REST

API First

Context API no React

Gerenciamento de estado

Clean Code

Separação Backend / Frontend

CRUD completo

🌙 Dark / Light Mode

O sistema possui suporte completo a:

Light Mode
Dark Mode

Aplicado em:

Layout

Cards

Header

Footer

Painel admin

📈 Melhorias Futuras

Login e autenticação JWT

Controle de estoque automático

Upload de imagens de produtos

Dashboard com gráficos

Integração com pagamentos

Sistema de cupons

Histórico completo de pedidos

🧑‍💻 Autor

Desenvolvido por Gustavo Brandão

Projeto criado para estudo e prática de desenvolvimento Full Stack.

📄 Licença

Este projeto está sob a licença MIT.

⭐ Contribuição

Pull requests são bem-vindos.

Para grandes mudanças:

abra uma issue

discuta a alteração

envie o PR

⭐ Se este projeto te ajudou

Considere dar uma ⭐ no repositório.
