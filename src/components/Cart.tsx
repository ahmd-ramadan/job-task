import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { cartObject, type ICart, type ICartProduct } from "../utils/cart.class";
import { useState } from "react";
import toast from "react-hot-toast";

interface ICartProps {
    isCartOpen: boolean;
    closeCart: () => void;
    cartProductsCnt: number;
    updateCartProductsCnt: (cnt: number) => void;
    isCheckoutModalOpen: boolean;
    setIsCheckoutModalOpen: (valu: boolean) => void
    
}

const Cart = ({ isCartOpen, closeCart, cartProductsCnt, updateCartProductsCnt, isCheckoutModalOpen, setIsCheckoutModalOpen } : ICartProps) => {

    const [cartData, setCartData] = useState<ICart>(cartObject.getCart() as ICart);
   
    const updateProductQuantity = ({ product, quantity }: { product: ICartProduct, quantity: number }) => {
        cartObject.addProductToCart({ ... product, quantity: product.quantity + quantity });
        updateCartProductsCnt(quantity);
        setCartData(cartObject.getCart())
        toast.success("Product quantity updated successfully")
    }

    const removeProductFromCart = (product: ICartProduct) => {
        cartObject.removeProductFromCart(product);
        updateCartProductsCnt(-product.quantity);
        setCartData(cartObject.getCart())
        toast.success("Product removed from cart successfully")
    }

    const renderCartProducts = cartData?.products.map((product: ICartProduct, index) => {
        const {
            title, 
            price, 
            quantity,
            image
        } = product

        return <div 
                key={index}
                className="flex flex-col gap-3 p-2 border-b-2 border-gray-800 rounded-md"
            >
                <div
                    className="flex items-start gap-1"
                >
                    <img 
                        src={image} 
                        alt=""
                        className="w-20 h-20 rounded-lg" 
                    />

                    <div
                        className="flex flex-col items-start"
                    >
                        <h3 className="text-gray-900">{title}</h3>
                        <p className="text-xs mt-1">price: ${price}</p>
                        <p className="text-xs">quantity: {quantity}</p>
                    </div>
                </div>

                <div 
                    className="flex items-end justify-between gap-1 px-2"
                >
                    <div 
                        className="grid grid-cols-3"
                    >
                        <Plus 
                            onClick={() => updateProductQuantity({ product, quantity: +1 })}
                            className="p-2 w-8 h-8 cursor-pointer border border-gray-200 hover:text-[#116D6E] hover:bg-white"
                        />
                        <p
                            className="p-2 w-8 h-8 cursor-pointer border border-gray-200 flex justify-center items-center"
                        >
                            {quantity}
                        </p>
                        { 
                            quantity > 0 ? 
                                <Minus 
                                    onClick={() => updateProductQuantity({ product, quantity: -1 })}
                                    className="p-2 w-8 h-8 cursor-pointer border  border-gray-200 hover:text-[#116D6E] hover:bg-white"
                                /> 
                            :   <Trash2 
                                    onClick={() => removeProductFromCart(product)}
                                     className="p-2 w-8 h-8 border cursor-pointer border-gray-200 hover:text-red-600 hover:bg-white"
                                    
                                />
                        }
                    </div>

                   
                    <Trash2 
                        onClick={() => removeProductFromCart(product)}
                        className="text-white hover:text-red-600 w-6 h-6 cursor-pointer"
                        
                    />
                </div>


        </div>
    })

    // const noProductsFound = () => {
    //     return <div></div>;
    // }

    return (
        <aside
            className={`fixed top-0 right-0 h-full overflow-auto w-[90%] md:w-[30%] flex flex-col gap-5 p-2 bg-[#116D6E] shadow-lg transform transition-transform duration-300 z-50
                ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            <div
                className="w-full flex gap-1 justify-between items-center"
            >
                <X 
                    className="text-red-600 cursor-pointer w-10 h-10 hover:border hover:border-gray-100 rounded-md"
                    onClick={closeCart}
                />
                <h3 className="text-white text-lg font-semibold">Shopping cart ({cartProductsCnt} products)</h3>
            </div>

            <div 
                className="w-full flex flex-col gap-4"
            >
                { cartData?.products && cartData.products.length > 0 ?  renderCartProducts : <div
                    className="h-full flex flex-col items-center justify-center mt-30"
                >
                    <ShoppingCart className="w-30 h-30 text-red-400" />
                    <p className="text-3xl font-semibold text-red-400">No products here</p>
                </div> }
            </div>

            <div className="flex flex-col items-start gap-3 w-full px-10 mt-auto my-5">
                <div className="flex items-center justify-between gap-1 w-full text-xl">
                    <p className="text-gray-900">Subtotal: </p>
                    <span className="text-white">${cartData.subtotal}</span>
                </div>
                <button
                    onClick={() => setIsCheckoutModalOpen(!isCheckoutModalOpen)}
                    disabled={cartProductsCnt <= 0}
                    className={`bg-white py-2 w-full mx-auto flex items-center justify-center rounded-md text-[#116D6E] hover:text-white hover:bg-[#116D6E] hover:border hover:border-white font-semibold text-lg ${cartProductsCnt > 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                >
                    Checkout
                </button>
            </div>
        </aside>

    )
}

export default Cart;