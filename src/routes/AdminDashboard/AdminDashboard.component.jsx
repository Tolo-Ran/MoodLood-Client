import BasicBreadcrumb from "../../components/Breadcrumb/Breadcrumb.component";
import Loading from "../../components/Loading/Loading.component";
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {getProductsList} from "../../utils/product/product.utils";
import ProductCard from "../../components/ProductCard/ProductCard.component";

export const AdminDashboard = () => {
        const [isLoading, setIsLoading] = useState(true);
        const {user} = useSelector(state => ({...state}));
    const [products, setProducts] = useState([]);
    useEffect(() => {
    }, []);
    return (
        <>
            <BasicBreadcrumb path={["Admin", "Dashboard"]}/>
        </>
    );
    }
;
