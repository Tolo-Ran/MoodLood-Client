import {combineReducers} from "redux";
import {userReducer} from "./user/user.reducer";
import {categoriesReducer} from "./Categories/categories.reducer";
import {subcategoriesReducer} from "./Subcategories/subcategories.reducer";
import {productsReducer} from "./Product/Products.reducer";
import {currentProductReducer} from "./Product/currentProduct.reducer";
export const rootReducer = combineReducers(
    {
        user: userReducer,
        categories: categoriesReducer,
        subcategories: subcategoriesReducer,
        products: productsReducer,
        currentProduct: currentProductReducer,


    }
)