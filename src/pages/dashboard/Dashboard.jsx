import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [produtosDiferentes, setprodutosDiferentes] = useState(0);
  const [totalEstoque, settotalEstoque] = useState(0);
  const [itensAcabando, setitensAcabando] = useState([]);
  const [somaQuantidades, setsomaQuantidades] = useState(0);
  const [itensRecentes, setItensRecentes] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);

    setprodutosDiferentes(storedProducts.length);

    const total = storedProducts.reduce(
      (total, produto) => total + parseInt(produto.quantidadeEmEstoque),
      0
    );
    settotalEstoque(total);

    const abaixoDez = storedProducts.filter(
      (item) => item.quantidadeEmEstoque < 10
    );
    setitensAcabando(abaixoDez);
    setsomaQuantidades(abaixoDez.length);

    const hoje = new Date();
    const trintaDiasAtras = new Date(hoje);
    trintaDiasAtras.setDate(hoje.getDate() - 30);

    const itensRecentesProdutos = storedProducts.filter((item) => {
      const dataItem = new Date(item.dataCadastro); // Converte a string de data do JSON para um objeto Date
      return dataItem >= trintaDiasAtras; // Compara a data do item com a data de 30 dias atrás
    });
    setItensRecentes(itensRecentesProdutos);
  }, []);

  return (
    <>
      <h1 className={styles.dashboardTitle}>Dashboard</h1>
      <section className={styles.inventario}>
        <div className={styles.divInventario}>
          Itens diferentes
          <h3> {produtosDiferentes}</h3>
        </div>

        <div className={styles.divInventario}>
          Total geral de itens
          <h3>{totalEstoque}</h3>
        </div>

        <div className={styles.divInventario}>
          Itens recentes
          <h3>{itensRecentes.length}</h3>
        </div>

        <div className={styles.divInventario}>
          Itens acabando
          <h3>{somaQuantidades}</h3>
        </div>
      </section>
      <div className={styles.tables}>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>Itens recentes</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {itensRecentes.map((product) => (
                <tr key={product.id} className="listaRecentes">
                  <td>{product.nome}</td>
                  <td>
                    <Link to={`/item/${product.id}`} className={styles.linkNav}>
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>Itens acabando</th>
                <th>Qtd.</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {itensAcabando.map((product) => (
                <tr key={product.id} className="listaRecentes">
                  <td> {product.nome}</td>
                  <td> {product.quantidadeEmEstoque}</td>
                  <td>
                    <Link to={`/item/${product.id}`} className={styles.linkNav}>
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
