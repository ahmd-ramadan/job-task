import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AllCities, AllCitiesCost, AllCitiesEnum, CheckoutClass } from '../utils/checkout.class';
import { ShoppingCart, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cartObject, type ICart, type ICartProduct } from '../utils/cart.class';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Full name is required"),

    phoneNumber: Yup.string()
        .matches(/^(01)[0-9]{9}$/, "Enter a valid Egyptian phone number")
        .required("Phone number is required"),

    address: Yup.string()
        .min(3, "Address must be at least 3 characters")
        .required("Address is required"),

    city: Yup.string()
        .oneOf(AllCities, "Invalid city selected")
        .required("City is required"),

    notes: Yup.string()
        .max(200, "Notes should not exceed 200 characters"),
});

const Checkout = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            phoneNumber: '',
            address: '',
            city: AllCitiesEnum.CAIRO,
            notes: '',
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            console.log('Form data submitted:', values);

            CheckoutClass.checkout(values);
            toast.success("Order created Successfully");
            cartObject.clear();
            location.reload();

            setSubmitting(false);
        },
    });

    useEffect(() => {
        setShippingFees(AllCitiesCost[formik.values.city])
    }, [formik.values.city])

    const [cartData, _] = useState<ICart>(cartObject.getCart() as ICart);
    const [shippingFees, setShippingFees] = useState<number>(0);

    const renderCartProducts = cartData?.products.map((product: ICartProduct, index) => {
        const { title, price, quantity, image } = product;

        return (
            <div key={index} className="flex flex-col gap-3 p-1">
                <div className="flex items-start gap-1">
                    <img src={image} alt="" className="w-20 h-20 rounded-lg" />
                    <div className="flex flex-col items-start">
                        <h3>{title}</h3>
                        <p className="text-xs mt-1">${price}</p>
                        <p className="text-xs">{quantity}</p>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div className="text-gray-800 fixed inset-0 bg-transparent backdrop-blur-sm z-80 flex justify-center items-center">
            <form
                onSubmit={formik.handleSubmit}
                className="w-[96%] md:w-[60%] h-[95%] md:h-[80%] bg-white p-5 grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg"
            >
                <div className='flex-1'>
                    <div className='flex items-center justify-start gap-1'>
                        <User className="text-[#116D6E]" />
                        <h3 className='text-lg font-bold text-[#116D6E]'>Customer details</h3>
                    </div>
                    <hr className='w-full my-2' />

                    <div className="w-full grid grid-cols-1 gap-1">
                        {/* Name */}
                        <div className='flex flex-col items-start gap-1 w-full'>
                            <label htmlFor="name" className="text-gray-800 font-semibold">Full Name: </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                placeholder='ex: Ahmed Ramadan'
                                className="border border-gray-400 rounded-md text-gray-800 w-full py-1 px-2"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="text-red-500 text-sm">{formik.errors.name}</div>
                            )}
                        </div>

                        {/* Phone number */}
                        <div className='flex flex-col items-start gap-1 w-full'>
                            <label htmlFor="phoneNumber" className="text-gray-800 font-semibold">Phone Number: </label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                placeholder='ex: 01020187993'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phoneNumber}
                                className="border border-gray-400 rounded-md text-gray-800 w-full py-1 px-2"
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
                            )}
                        </div>

                        {/* City */}
                        <div className='flex flex-col items-start gap-1 w-full'>
                            <label htmlFor="city" className="text-gray-800 font-semibold">City: </label>
                            <select
                                id="city"
                                name="city"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.city}
                                className="border border-gray-400 rounded-md text-gray-800 w-full py-1 px-2"
                            >
                                {AllCities.map((c, index) => (
                                    <option key={index} value={c}>{c}</option>
                                ))}
                            </select>
                            {formik.touched.city && formik.errors.city && (
                                <div className="text-red-500 text-sm">{formik.errors.city}</div>
                            )}
                        </div>

                        {/* Address */}
                        <div className='flex flex-col items-start gap-1 w-full'>
                            <label htmlFor="address" className="text-gray-800 font-semibold">Address: </label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                placeholder='ex: Matai, Minia, Egypt'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                                className="border border-gray-400 rounded-md text-gray-800 w-full py-1 px-2"
                            />
                            {formik.touched.address && formik.errors.address && (
                                <div className="text-red-500 text-sm">{formik.errors.address}</div>
                            )}
                        </div>

                        {/* Notes */}
                        <div className='flex flex-col items-start gap-1 w-full'>
                            <label htmlFor="notes" className="text-gray-800 font-semibold">Notes: </label>
                            <input
                                id="notes"
                                name="notes"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.notes}
                                className="border border-gray-400 rounded-md text-gray-800 w-full py-1 px-2"
                            />
                            {formik.touched.notes && formik.errors.notes && (
                                <div className="text-red-500 text-sm">{formik.errors.notes}</div>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className='flex-1 h-full overflow-auto flex flex-col'>
                    <div className='flex items-center justify-start gap-1'>
                        <ShoppingCart className="text-[#116D6E]" />
                        <h3 className='text-lg font-bold text-[#116D6E]'>Cart details</h3>
                    </div>
                    <hr className='w-full my-2' />

                    <div className="w-full flex flex-col gap-4">
                        {cartData?.products?.length > 0 ? renderCartProducts : null}
                    </div>

                    <div className="flex flex-col items-start gap-3 w-full mt-auto">
                        <div className='flex justify-between items-center w-full px-2 font-semibold'>
                            <p className="font-semibold text-xl ">Subtotal price: </p>
                            <span className='text-[#116D6E]'>${cartData.subtotal}</span>
                        </div>
                        <div className='flex justify-between items-center w-full px-2 font-semibold'>
                            <p className="font-semibold text-xl">Shipping fees: </p>
                            <span className='text-[#116D6E]'>${shippingFees}</span>
                        </div>
                        <div className='flex justify-between items-center w-full px-2 font-semibold'>
                            <p className="font-semibold text-xl ">Total price: </p>
                            <span className='text-[#116D6E]'>${cartData.subtotal + shippingFees}</span>
                        </div>
                    </div>
                </div>

                <div className='col-span-1 md:col-span-2 w-full flex items-center justify-center'>
                    <button
                        type="submit"
                        className='py-2 px-6 w-1/2 text-xl font-semibold bg-[#116D6E] rounded-lg text-white cursor-pointer'
                    >
                        Purchase now
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Checkout;
