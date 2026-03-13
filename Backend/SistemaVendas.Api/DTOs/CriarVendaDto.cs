namespace SistemaVendas.Api.DTOs;

public class CriarVendaDto
{
    public int ClienteId { get; set; }
    public string FormaPagamento { get; set; } = string.Empty;
}