const products = JSON.parse(localStorage.getItem("products")) || [];
import Stock from '../../components/stock/Stock';
import { Link } from "react-router-dom";
import styles from "./styles.module.css"


function Itens(){
    return(
        <>
        <Stock/>
        <section>
            
            <table>
                <thead>
                    <td>ID</td>
                    <td>Nome</td>
                    <td>Em Estoque</td>
                    <td>Categoria</td>
                    <td className={styles.acoes}>Ações</td>
                </thead>
                <tbody>
                    
                </tbody>


            
            
                {products.map((product)=>(
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.nome}</td>
                        <td>{product.quantidadeEmEstoque}</td>
                        <td>{product.categoria}</td>
                        <td className={styles.acoes}>
                    <Link to={`/item/${product.id}`} className={styles.botaoVer}>
                      Ver
                    </Link>
                 
                    <Link to={`/editaritem/${product.id}`} className={styles.botaoAtualizar}>
                      Atualizar
                    </Link>
                 
                    <Link to={`/excluir/${product.id}`} className={styles.botaoExcluir}>
                      Excluir
                    </Link>
                  </td>
                        </tr>
                ))}
            </table>

           
        </section>
        

        
        </>
        
    )
}
export default Itens