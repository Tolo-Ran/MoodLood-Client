import {Button, Col, Row} from 'antd';
import {useEffect, useState} from "react";
import {fetchAndStoreCategoriesInRedux, findCategoryId, getCategoriesList} from "../../utils/category/category.utils";
import {useDispatch, useSelector} from "react-redux";
import ProductForm from "../../components/ProductComponents/ProductsForm/ProductForm.component";
import { Collapse } from 'antd';
import BasicBreadcrumb from "../../components/Breadcrumb/Breadcrumb.component";
import {fetchAndStoreSubcategoriesInRedux, findSubcategoryId} from "../../utils/subcategory/subcategory.utils";
import ProductCard from "../../components/ProductCard/ProductCard.component";
import {
    createProduct,
    fetchAndStoreProductsInRedux,
    getProductsList,
    resizeFile
} from "../../utils/product/product.utils";
import PrimaryButton from "../../components/PrimatyButton/PrimaryButton.component";
import {FolderAddOutlined, PlusSquareOutlined} from "@ant-design/icons";
import BasicModalWindow from "../../components/ModalWindow/ModalWindow.component";
import CreateItemButton from "../../components/PrimatyButton/PrimaryButton.component";
import axios from "axios";

const {Panel} = Collapse;

export const AdminProducts = () => {
    const dispatch = useDispatch();
    const {products} = useSelector(state => ({...state}));
    const [isModalCreateProductVisible, setIsModalCreateProductVisible] = useState(false);
    useEffect(() => {
        fetchAndStoreCategoriesInRedux(dispatch);
        fetchAndStoreSubcategoriesInRedux(dispatch);
        fetchAndStoreProductsInRedux(dispatch)
    }, []);

    return (
        <>
            <BasicBreadcrumb path={["Admin", "Products"]}/>
            <BasicModalWindow
                title={"Create Product"}
                visible={isModalCreateProductVisible}
                setVisible={setIsModalCreateProductVisible}
                handleCancel={() => null}
                footer={[
                    <CreateItemButton
                        form={"create-product-form"}
                        type="primary"
                        htmlType={"submit"}
                        icon={<FolderAddOutlined/>}
                        innerText={"Create Product"}/>,
                    <PrimaryButton
                        innerText={"cancel"}
                        key="cancel"
                        type="primary"
                        onClick={() => setIsModalCreateProductVisible(false)}
                    />]}

                children={<ProductForm
                    formId={"create-product-form"}
                    fileListInitial={[]}/>}
            />
            <PrimaryButton
                type="primary"
                style={{
                    height: "80px",
                }}
                onClick={() => setIsModalCreateProductVisible(true)}
                innerText={"Add Product"}
                htmlType={"button"}
                icon={<PlusSquareOutlined style={
                    {fontSize: "50px",}
                }/>}
            />

            <Row style={{marginTop: "16px"}}>
                {products && products.list.map(product => <Col key={product.slug}>
                    <ProductCard props={product}/>
                </Col>)}
            </Row>
        </>
    );

};

export default AdminProducts;

