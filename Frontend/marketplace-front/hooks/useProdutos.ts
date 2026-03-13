import { useQuery } from "@tanstack/react-query";
import { listarProdutos } from "@/services/produtos-service";

export function useProdutos() {
  return useQuery({
    queryKey: ["produtos"],
    queryFn: listarProdutos,
  });
}