import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard"
import Editaritem from "./pages/editaritem/EditarItem"
import Item from "./pages/item/Item"
import Itens from "./pages/itens/Itens"
import NovoItem from "./pages/novoitem/NovoItem"
import Excluir from "./pages/excluir/Excluir";
import RootLayout from "./pages/RootLayout";
const products = JSON.parse(localStorage.getItem("products")) || [];

const router = createBrowserRouter([
    {path:"/",
    element: <RootLayout/>,
    children:[{
        index: true,
        element: <Dashboard/>    
    },
    {path:"/editaritem/:id",
    element:<Editaritem products={products} />
    },
    {path:"/item/:id",
    element: <Item products={products}/>
    },
    {path:"/itens",
    element:<Itens/>
    },
    {path:"/novoitem",
    element:<NovoItem/>
    },
    {path:"/excluir/:id",
        element:<Excluir products={products}/>
    }]
}
])
export default router