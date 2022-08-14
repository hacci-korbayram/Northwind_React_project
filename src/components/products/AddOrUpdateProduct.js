import React, { useState, useEffect } from "react";
import { connect } from "react-redux"
import ProductDetail from "./ProductDetail";
import { getCategories } from "../../redux/actions/categoryActions";
import {saveProduct} from "../../redux/actions/productActions"

////urun eklemek guncellemek

function AddOrUpdateProduct({
    products,
    categories,
    getPorudcts,
    getcategories,
    saveProduct,
    history,
    ...props
}) {
    const [product, setProduct] = useState({ ...props.product });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (categories.length === 0) {
            getCategories();
        }
        setProduct({ ...props.product });

        //bu bir bag uygulama girmesn sonsuz donguye olur boyle props.product
    }, [props.product]);

    //datamizi dolduruyoruz
    function handleChange(event) {
        const { name, value } = event.target;
        setProduct(previousProduct => ({
            ...previousProduct,
            [name]: name === "categoryId" ? parseInt(value, 10) : value
        }));
        validate(name, value);

    }

    function validate(name, value) {
        if (name === "productName" && value === "") {
            setErrors(previousErrors => ({ 
                ...previousErrors,
                productName: "urun ismi olmalidir" 
            }));
        }else{
            setErrors(previousErrors => ({ 
                ...previousErrors,
                productName: "" 
            }));
       }
    }


        //sayfa yenilenmesin 
        function handleSave(event) {
            event.preventDefault();
            saveProduct(product).then(() => {
                history.push("/")
            });
        }
        return (
            <ProductDetail
                product={product}
                categories={categories}
                onChange={handleChange}
                onSave={handleSave}
                errors={errors}
            />
        );

    }

    export function getProductById(products, productId) {
        let product = products.find(product => product.id == productId) || null;
        return product;
    }

    function mapStateToProps(state, ownProps) {
        const productId = ownProps.match.params.productId;
        const product =
            productId && state.productListReducer.length > 0
                ? getProductById(state.productListReducer, productId)
                : {};
        return {
            product,
            products: state.productListReducer,
            categories: state.categoryListReducer
        };
    }


    // uygulamayi reduxa baglamak
    const mapDispatchToProps = {
        getCategories, saveProduct
    };
    export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct)