import Stock from "../../components/stock/Stock";
import styles from "./styles.module.css";
import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";
const products = JSON.parse(localStorage.getItem("products")) || [];
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditarItem() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const [nome, setNome] = useState(product?.nome || "");
  const [quantidade, setQuantidade] = useState(product?.quantidadeEmEstoque || 0);
  const [preco, setPreco] = useState(product?.preco || 0);
  const [categoria, setCategoria] = useState(product?.categoria || "");
  const [descricao, setDescricao] = useState(product?.descricao || "");

  useEffect(() => {
    if (product) {
      setNome(product.nome);
      setQuantidade(product.quantidadeEmEstoque);
      setPreco(product.preco);
      setCategoria(product.categoria);
      setDescricao(product.descricao);
    }
  }, [product]);

  if (!product) {
    return <><Stock/><br></br><p>Produto não encontrado</p></>;
  }

  // Função para converter data de ISO 8601 para DD-MM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const updatedProduct = {
      ...product,
      nome,
      quantidadeEmEstoque: quantidade,
      preco,
      categoria,
      descricao,
      dataAtualizacao: formatDate(new Date().toISOString()), // Adiciona a data de atualização      
    };

    const updatedProducts = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.success("Produto atualizado com sucesso!");
    
  };

  return (
    <>
      <Stock />
      <h1>Atualizar item {product.nome}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formulario}>
          <div>
            <label>Nome</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(ev) => setNome(ev.target.value)}
            />
          </div>
          <div>
            <label>Quantidade</label>
            <input
              type="number"
              required
              value={quantidade}
              onChange={(ev) => setQuantidade(ev.target.value)}
            />
          </div>
          <div>
            <label>Preço</label>
            <input
              type="number"
              step="0.01"
              required
              value={preco}
              onChange={(ev) => setPreco(ev.target.value)}
            />
          </div>
          <div>
            <label>Categoria</label>
            <select
              name="categoria"
              value={categoria}
              onChange={(ev) => setCategoria(ev.target.value)}
              required
            >
              <option value="">SELECIONE</option>
              <option value="Cadernos">Cadernos</option>
              <option value="Canetas">Canetas</option>
              <option value="Lápis">Lápis</option>
              <option value="Borrachas">Borrachas</option>
              <option value="Marcadores">Marcadores</option>
              <option value="Clips e Grampos">Clips e Grampos</option>
              <option value="Blocos e Notas">Blocos e Notas</option>
              <option value="Papéis">Papéis</option>
              <option value="Estojos">Estojos</option>
              <option value="Tesouras">Tesouras</option>
              <option value="Grampeadores">Grampeadores</option>
            </select>
          </div>
        </div>
        <div className={styles.divFinal}>
          <h4>Descrição</h4>
          <textarea
            value={descricao}
            onChange={(ev) => setDescricao(ev.target.value)}
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
      <ToastContainer className={styles.toastContainer}/>
    </>
  );
}

export default EditarItem;
