import Stock from "../../components/stock/Stock";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NovoItem() {
  const [dados, setDados] = useState([]);
  const [nome, setNome] = useState("");
  const [quantidadeEmEstoque, setquantidadeEmEstoque] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");

  // Carrega os produtos do localStorage quando o componente monta
  useEffect(() => {
    const produtosLocal = JSON.parse(localStorage.getItem("products")) || [];
    setDados(produtosLocal);
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    salvarProduto({ nome, quantidadeEmEstoque, preco, categoria, descricao });
  };

  const salvarProduto = (novoProduto) => {
    const id = dados.length + 1;
    const dataCadastro = new Date();
    const dataAtualizacao = new Date()
    const produtoCompleto = { id, ...novoProduto, dataCadastro, dataAtualizacao };

    // Atualiza o estado com o novo produto
    const novosDados = [...dados, produtoCompleto];
    setDados(novosDados);

    // Salva a lista atualizada no localStorage
    localStorage.setItem("products", JSON.stringify(novosDados));
    toast.success("Produto atualizado com sucesso!");

    // Limpa os campos do formulário
    setNome("");
    setquantidadeEmEstoque("");
    setPreco("");
    setCategoria("");
    setDescricao("");
  };

  return (
    <>
      <Stock />
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
              value={quantidadeEmEstoque}
              onChange={(ev) => setquantidadeEmEstoque(ev.target.value)}
            />
          </div>
          <div>
            <label>Preço</label>
            <input
              type="number"
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
      </form>
      <form onSubmit={handleSubmit}>
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

export default NovoItem;
