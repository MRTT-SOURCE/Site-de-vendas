using SistemaVendas.Api.Models;

namespace SistemaVendas.Api.Data;

public static class DbInitializer
{
    public static void RecreateDatabase(AppDbContext context)
    {
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        if (!context.Produtos.Any())
        {
            var produtos = new List<Produto>
            {
                new Produto
                {
                    Nome = "Notebook Gamer RTX",
                    Descricao = "Notebook gamer com placa RTX e 16GB RAM",
                    Preco = 6500,
                    Estoque = 8,
                    ImagemUrl = "https://picsum.photos/400?1",
                    DataCadastro = DateTime.UtcNow
                },
                new Produto
                {
                    Nome = "Mouse Gamer RGB",
                    Descricao = "Mouse gamer com 16000 DPI e iluminação RGB",
                    Preco = 220,
                    Estoque = 30,
                    ImagemUrl = "https://picsum.photos/400?2",
                    DataCadastro = DateTime.UtcNow
                },
                new Produto
                {
                    Nome = "Teclado Mecânico",
                    Descricao = "Teclado mecânico switch blue com RGB",
                    Preco = 450,
                    Estoque = 20,
                    ImagemUrl = "https://picsum.photos/400?3",
                    DataCadastro = DateTime.UtcNow
                },
                new Produto
                {
                    Nome = "Monitor Gamer 144Hz",
                    Descricao = "Monitor gamer 27 polegadas 144Hz",
                    Preco = 1800,
                    Estoque = 12,
                    ImagemUrl = "https://picsum.photos/400?4",
                    DataCadastro = DateTime.UtcNow
                },
                new Produto
                {
                    Nome = "Headset Gamer",
                    Descricao = "Headset gamer com microfone removível",
                    Preco = 320,
                    Estoque = 18,
                    ImagemUrl = "https://picsum.photos/400?5",
                    DataCadastro = DateTime.UtcNow
                }
            };

            context.Produtos.AddRange(produtos);
        }

        if (!context.Clientes.Any())
        {
            var clientes = new List<Cliente>
            {
                new Cliente
                {
                    Nome = "João da Silva",
                    Email = "joao@email.com",
                    Telefone = "11999999999",
                    Cpf = "12345678900",
                    DataCadastro = DateTime.UtcNow
                },
                new Cliente
                {
                    Nome = "Maria Oliveira",
                    Email = "maria@email.com",
                    Telefone = "11988888888",
                    Cpf = "98765432100",
                    DataCadastro = DateTime.UtcNow
                }
            };

            context.Clientes.AddRange(clientes);
        }

        context.SaveChanges();
    }
}