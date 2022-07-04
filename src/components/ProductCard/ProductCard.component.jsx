import { EditOutlined, DeleteOutlined , EyeOutlined } from '@ant-design/icons';
import {Card, Image} from 'antd';
import BasicDescription from "../BasicDescription/BasicDescription.component";
import BasicModalWindow from "../ModalWindow/ModalWindow.component";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchAndStoreProductsInRedux, removeImageFromCloudinary, removeProduct} from "../../utils/product/product.utils";
import {showDeleteConfirm} from "../BasicModal/BasicModal.component";
import MultipleImagePreview from "../MultipleImagePreview/MultipleImagePreview.component";
import ProductForm from "../ProductComponents/ProductsForm/ProductForm.component";
import {getSubcategoriesListFromCategoryId} from "../../utils/subcategory/subcategory.utils";
import PrimaryButton from "../PrimatyButton/PrimaryButton.component";

const ProductCard = ({props}) => {
    const {
        subcategory,
        slug,
        category,
        description,
        quantity,
        sold,
        title,
        _id,
        price,
        colors,
        shipping,
        images,
        createdAt,
        brand,
        updatedAt
    } = props;
    const {user} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();
    const [isModalProductVisible, setModalProductVisible] = useState(false);
    const [isModalEditProductVisible, setModalEditProductVisible] = useState(false);
    const [imagesInitialFileList, setImagesInitialFileList] = useState([]);
    const [formDefaultSubcategoriesNamesList, setFormDefaultSubcategoriesNamesList] = useState([]);
    const [isResetFormToDefault, setIsResetFormToDefault] = useState(false);
    const colorsStr = colors.join(", ");
    const descriptionProductModalProps = {
        size: "small",
        title: title,
        column: 1,
        images: images,
        data: [
            {label: "Title:", value: title},
            {label: "Brand", value: brand},
            {label: "Price", value: `€${price}`},
            {label: "Quantity", value: quantity},
            {label: "Sold", value: sold},
            {label: "Colors", value: colors.join(", ")},
            {label: "Shipping", value: shipping},
            {label: "Category", value: category.name},
            {label: "Subcategory", value: subcategory.name},
            {label: "id", value: _id},
            {label: "Created at", value: createdAt.split("T")[0]},
            {label: "Last updated at", value: updatedAt.split("T")[0]},
            {label: "Description", value: description}
        ]
    }
    const descriptionProductCardProps = {
        title: title,
        size: "small",
        column: 1,
        data: [
            {label: "Price", value: `€${price}`},
            {label: "Brand", value: brand},
            {label: "Quantity", value: quantity},
            {label: "Colors", value: colorsStr},
            {label: "Shipping", value: shipping},
        ]
    }
    const childrenModalProduct = (<>
        <MultipleImagePreview images={images}/>
        <BasicDescription props={descriptionProductModalProps}/>
    </>);
    useEffect(() => {
        const fileList = [];
        images.forEach((image) => fileList.push(
            {
                status: "done",
                url: image.url,
                uid: image.public_id,
            }
        ))
        setImagesInitialFileList([...fileList]);
        getSubcategoriesListFromCategoryId(category._id)
            .then(res => {
                    const subs = [];
                    res.data.forEach((sub) => subs.push(sub.name));
                    setFormDefaultSubcategoriesNamesList(subs);
                }
            )
    }, [props])

    const childrenModalEditProduct = (<>
        <ProductForm
            formId={"edit-product-form"}
            initialFormValues={{
                ["title"]: title,
                ["category"]: category.name,
                ["subcategory"]: subcategory.name,
                ["description"]: description,
                ["price"]: price,
                ["quantity"]: quantity,
                ["shipping"]: shipping,
                ["colors"]: colors,
                ["brand"]: brand
            }}
            imagesInitialFileList={imagesInitialFileList}
            defaultSubcategoriesList={formDefaultSubcategoriesNamesList}
            isFormToDefault={isResetFormToDefault}
            resetFormToDefault={setIsResetFormToDefault}
        />
    </>);
    const handleDeleteProduct = () => {
        for (let i = 0; i < images.length; i++) {
            removeImageFromCloudinary(images[i].public_id, user.accessToken)
        }
        removeProduct(slug, user.accessToken).then(r => {
            fetchAndStoreProductsInRedux(dispatch);
        });
    };

    return (
        <Card
            hoverable={true}
            style={{
                width: 250,
            }}
            cover={
                <Image
                    width={250}
                    src={images[0].url}
                    alt={title}
                    placeholder={
                        <Image
                            preview={false}
                            src={images[0].url}
                            alt={title}
                            width={200}
                        />
                    }
                />
            }
            actions={[
                <EyeOutlined onClick={() => setModalProductVisible(true)} key="show"/>,
                <EditOutlined key="edit"
                              onClick={
                                  () => {
                                      dispatch({
                                          type: 'GET_CURRENT_PRODUCT',
                                          payload: {
                                              initialFormValues:
                                                  {
                                                      ["title"]: title,
                                                      ["category"]: category.name,
                                                      ["subcategory"]: subcategory.name,
                                                      ["description"]: description,
                                                      ["price"]: price,
                                                      ["quantity"]: quantity,
                                                      ["shipping"]: shipping,
                                                      ["colors"]: colors,
                                                      ["brand"]: brand
                                                  },
                                              images: imagesInitialFileList,
                                          }
                                      })

                                      setModalEditProductVisible(true);
                                      setIsResetFormToDefault(!isResetFormToDefault);
                                  }
                              }/>,
                <DeleteOutlined onClick={
                    () => showDeleteConfirm(
                        `Are you sure you want to delete "${title}"`,
                        "The product will be definitely removed from the database!",
                        () => handleDeleteProduct()
                    )
                }
                                key="delete"/>,
            ]}
        >
            <BasicModalWindow
                title={title}
                children={childrenModalProduct}
                visible={isModalProductVisible}
                setVisible={setModalProductVisible}
                footer={[
                    <PrimaryButton
                        type="primary"
                        innerText={"close"}
                        onClick={() => {
                            setModalProductVisible(false);
                        }}
                    />
                ]}
            />

            <BasicModalWindow
                title={`Edit product: "${title}"`}
                children={childrenModalEditProduct}
                visible={isModalEditProductVisible}
                setVisible={setModalEditProductVisible}
                footer={[
                    <PrimaryButton
                        type="primary"
                        innerText={"save"}
                        onClick={() => {
                            setModalProductVisible(false);
                        }}
                    />,
                    <PrimaryButton
                        type="primary"
                        innerText={"cancel"}
                        onClick={() => {
                            setModalEditProductVisible(false);
                            dispatch({
                                type: 'GET_CURRENT_PRODUCT',
                                payload: null,
                            });
                        }}
                    />
                ]}
            />
            <BasicDescription props={descriptionProductCardProps}/>
        </Card>
    );
};

export default ProductCard;