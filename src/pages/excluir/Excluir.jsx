import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Stock from '../../components/stock/Stock';
import styles from './styles.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Excluir() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const selectedProduct = products.find((p) => p.id === parseInt(id));
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

  const handleDelete = () => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.filter((p) => p.id !== parseInt(id));
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    toast.success('Produto excluído com sucesso!');
    navigate('/');
  };

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
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
        <h1>Deseja excluir o item {product.nome}?</h1>
        <button onClick={handleDelete} className={styles.botaoExcluir}>Excluir</button>
        <Link to="/" className={styles.botaoAtualizar}>Voltar</Link>
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
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}

export default Excluir;
