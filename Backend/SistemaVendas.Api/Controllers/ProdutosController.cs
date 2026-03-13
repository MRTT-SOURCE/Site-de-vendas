using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaVendas.Api.Data;
using SistemaVendas.Api.Models;

namespace sistemavendas.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProdutosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Produto>>> Get()
    {
        var produtos = await _context.Produtos
            .OrderBy(p => p.Id)
            .ToListAsync();

        return Ok(produtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Produto>> GetById(int id)
    {
        var produto = await _context.Produtos.FindAsync(id);

        if (produto == null)
            return NotFound(new { mensagem = "Produto não encontrado." });

        return Ok(produto);
    }

    [HttpPost]
    public async Task<ActionResult<Produto>> Post([FromBody] Produto produto)
    {
        if (string.IsNullOrWhiteSpace(produto.Nome))
            return BadRequest(new { mensagem = "O nome do produto é obrigatório." });

        if (produto.Preco < 0)
            return BadRequest(new { mensagem = "O preço não pode ser negativo." });

        if (produto.Estoque < 0)
            return BadRequest(new { mensagem = "O estoque não pode ser negativo." });

        produto.DataCadastro = DateTime.UtcNow;

        _context.Produtos.Add(produto);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = produto.Id }, produto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] Produto produtoAtualizado)
    {
        var produto = await _context.Produtos.FindAsync(id);

        if (produto == null)
            return NotFound(new { mensagem = "Produto não encontrado." });

        produto.Nome = produtoAtualizado.Nome;
        produto.Descricao = produtoAtualizado.Descricao;
        produto.Preco = produtoAtualizado.Preco;
        produto.Estoque = produtoAtualizado.Estoque;
        produto.ImagemUrl = produtoAtualizado.ImagemUrl;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var produto = await _context.Produtos.FindAsync(id);

        if (produto == null)
            return NotFound(new { mensagem = "Produto não encontrado." });

        _context.Produtos.Remove(produto);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}