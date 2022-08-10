import Categoria from "./Categoria";

interface Produto{
  id: number;
  nome_produto: string;
  valor_produto: number;
  descricao_produto: string;
  categoria?: Categoria|null;
}

export default Produto;