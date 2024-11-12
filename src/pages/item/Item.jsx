import React, { useState, useEffect } from 'react';
import Stock from '../../components/stock/Stock';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";

function Item() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const selectedProduct = products.find(p => p.id === parseInt(id));
    setProduct(selectedProduct);
  }, [id]);

  if (!product) {
    return (
      <>
        <Stock />
        <br />
        <p>Produto não encontrado</p>
      </>
    );
  }

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Stock />
      <div className={styles.divInicial}>
        <h1>{product.nome}</h1>
        <Link to={`/editaritem/${product.id}`} className={styles.botaoAtualizar}>
          Atualizar
        </Link>
        <Link to={`/excluir/${product.id}`} className={styles.botaoExcluir}>
          Excluir
        </Link>
      </div>
      <div className={styles.divIntermediaria}>
        <p className={styles.tags}>Categoria: {product.categoria}</p>
        <p className={styles.tags}>Preço: {formatPrice(product.preco)}</p>
        <p className={styles.tags}>Quantidade em Estoque: {product.quantidadeEmEstoque}</p>
      </div>
      <div>
        <p className={styles.descricao}>{product.descricao}</p>
      </div>
      <div className={styles.datas}>
        <p>Cadastrado em: {formatDate(product.dataCadastro)}</p>
        <p>Atualização em: {formatDate(product.dataAtualizacao)}</p>
      </div>
    </>
  );
}

export default Item;
