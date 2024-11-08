import styles from "./styles.module.css"
import { Link } from "react-router-dom";

function Stock (){
    return(
    <>
    <h2 className={styles.stockTitle}>Stock Items</h2>
    <div className={styles.stockItem}>

    <Link to="/itens">
        Todos os itens
    </Link>

    <Link to="/novoitem">
        Novo item
    </Link>
        

    </div>
    <hr></hr>

    </>
    )
}

export default Stock