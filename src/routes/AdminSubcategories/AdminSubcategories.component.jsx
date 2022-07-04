import {useEffect} from "react";
import {fetchAndStoreCategoriesInRedux} from "../../utils/category/category.utils";
import SubcategoryForm from "../../components/SubcategoryComponents/SubcategoryForm/SubcategoryForm.component";
import {useDispatch, useSelector} from "react-redux";
import SubcategoriesTable from "../../components/SubcategoryComponents/SubcategoriesTable/SubcategoriesTable.component";
import {fetchAndStoreSubcategoriesInRedux, getSubcategoriesList} from "../../utils/subcategory/subcategory.utils";
import BasicBreadcrumb from "../../components/Breadcrumb/Breadcrumb.component";

export const AdminSubcategories = () => {
    const dispatch = useDispatch();
    const {subcategories} = useSelector(state => ({...state}));

    useEffect(() => {
        fetchAndStoreCategoriesInRedux(dispatch);
        fetchAndStoreSubcategoriesInRedux(dispatch);
    }, [])

    return (
        <>
            <BasicBreadcrumb path={["Admin", "Subcategories"]}/>
            <SubcategoryForm/>
            <SubcategoriesTable />
        </>
    );

};

export default AdminSubcategories

