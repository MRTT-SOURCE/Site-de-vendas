using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaVendas.Api.Data;
using SistemaVendas.Api.Models;

namespace SistemaVendas.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VendasController : ControllerBase
{
    private readonly AppDbContext _context;

    public VendasController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<VendaListagemDto>>> Get()
    {
        var vendas = await _context.Vendas
            .Include(v => v.Cliente)
            .OrderByDescending(v => v.Id)
            .Select(v => new VendaListagemDto
            {
                Id = v.Id,
                ClienteNome = v.Cliente != null ? v.Cliente.Nome : "Sem cliente",
                DataVenda = v.DataVenda,
                Status = v.Status,
                ValorTotal = v.ValorTotal
            })
            .ToListAsync();

        return Ok(vendas);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Venda>> GetById(int id)
    {
        var venda = await _context.Vendas
            .Include(v => v.Cliente)
            .Include(v => v.Itens)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (venda == null)
            return NotFound(new { mensagem = "Venda não encontrada." });

        return Ok(venda);
    }

    [HttpPost]
    public async Task<ActionResult<Venda>> Post([FromBody] Venda venda)
    {
        venda.DataVenda = DateTime.UtcNow;

        if (string.IsNullOrWhiteSpace(venda.Status))
            venda.Status = "Pendente";

        _context.Vendas.Add(venda);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = venda.Id }, venda);
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> AtualizarStatus(int id, [FromBody] AtualizarStatusVendaDto dto)
    {
        var venda = await _context.Vendas.FindAsync(id);

        if (venda == null)
            return NotFound(new { mensagem = "Venda não encontrada." });

        var statusPermitidos = new[] { "Pendente", "Em processamento", "Finalizado", "Cancelado" };

        if (!statusPermitidos.Contains(dto.Status))
            return BadRequest(new { mensagem = "Status inválido." });

        venda.Status = dto.Status;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var venda = await _context.Vendas.FindAsync(id);

        if (venda == null)
            return NotFound(new { mensagem = "Venda não encontrada." });

        _context.Vendas.Remove(venda);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}