namespace SistemaVendas.Api.Models;

public class VendaListagemDto
{
    public int Id { get; set; }
    public string ClienteNome { get; set; } = string.Empty;
    public DateTime DataVenda { get; set; }
    public string Status { get; set; } = string.Empty;
    public decimal ValorTotal { get; set; }
}