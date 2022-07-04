import {useEffect} from "react";
import {fetchAndStoreCategoriesInRedux} from "../../utils/category/category.utils";
import CategoryForm from "../../components/CategoryComponents/CategoryForm/CategoryForm.component";
import {useDispatch} from "react-redux";
import CategoriesTable from "../../components/CategoryComponents/CategoriesTable/CategoriesTable.component";
import BasicBreadcrumb from "../../components/Breadcrumb/Breadcrumb.component";

export const AdminCategories = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAndStoreCategoriesInRedux(dispatch);
    }, [])

    return (
        <>
            <BasicBreadcrumb path={["Admin", "Categories"]}/>
            <CategoryForm/>
            <CategoriesTable/>
        </>
    );

};

export default AdminCategories

