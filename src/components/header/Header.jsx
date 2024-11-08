import { Link } from "react-router-dom";
import styles from "./styles.module.css"

function Header(){
    return(
        <header>
        <nav>
          <div className={styles.linksNav}>
            <h1 className={styles.dashboard}>ReactStock</h1>
          </div>
          <div className={styles.linksNav}>
            <Link to="/" className={styles.linkNav}>
              Inicio
            </Link>
            <Link to="/itens"  className={styles.linkNav}>
              Itens
            </Link>
          </div>
        </nav>
      </header>
    )
}
export default Header 