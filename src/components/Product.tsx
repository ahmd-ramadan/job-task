import toast from "react-hot-toast";
import { cartObject, type ICartProduct } from "../utils/cart.class";
import type { IProduct } from "../utils/product.class";
import { useEffect, useState } from "react";

interface IProductProps {
    product: IProduct;
    cartProductCnt: number;
    updateCartProductsCnt: (cnt: number) => void
}

const Product = ({ product, cartProductCnt, updateCartProductsCnt }: IProductProps ) => {

    const {
        id,
        title,
        price,
        images
    } = product;

    const [isProductExistInCart, setIsProductExistInCart] = useState<boolean>(cartObject.isProductExist(id))
    useEffect(() => {
        setIsProductExistInCart(cartObject.isProductExist(id))
    }, [cartProductCnt])

    const addToCart = () => {
        // console.log(productId);
        cartObject.addProductToCart({ 
            id,
            title,
            price,
            image: images[0],
            quantity: 1
        })
        updateCartProductsCnt(+1);
        setIsProductExistInCart(true)
        toast.success('Product added to cart successfully!')
    }

    const removeProductFromCart = () => {
        const product = cartObject.getProductfromCart(id) as ICartProduct;
        cartObject.removeProductFromCart(product);
        updateCartProductsCnt(-product.quantity);
        setIsProductExistInCart(false)
        toast.success('Product removed from cart successfully!')
    }

    return <div
        className="group block overflow-hidden rounded-lg"
    >
        <div className="relative h-[350px] sm:h-[450px]">
            <img
                src={images[0]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
            />

            <img
                src={images[0]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
            />
        </div>

        <div className="relative bg-[#116D6E] px-3 pt-1 pb-4">
            

            <div className="flex flex-col items-start justify-between text-gray-900">
                <h3 className="text-left text-lg text-white font-semibold group-hover:underline group-hover:underline-offset-4">
                    {title}
                </h3>

                <p className="tracking-wide text-red-400">${price}</p>
            </div>

            <div className="w-full mt-3">
                <button
                    className="w-full cursor-pointer bg-white font-semibold rounded-lg flex justify-center py-2 text-[#116D6E] hover:text-white hover:bg-[#116D6E] hover:border hover:border-white"
                    onClick={isProductExistInCart ? removeProductFromCart : addToCart}
                >
                    { 
                        isProductExistInCart ? "Remove from cart" : "Add to cart"  
                    }
                </button>
            </div>
        </div>
    </div>
  
}

export default Product;