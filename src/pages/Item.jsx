import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ReactPixel from 'react-facebook-pixel';
import ItemForm from "../components/item/itemform/ItemForm";
import ItemImages from "../components/item/itemimgs/ItemImages";
import items from '../item.json'
// Prevent Pixel re-initialization on every route change
let pixelInitialized = false;

const Item = () => {
    const { id } = useParams();
    const item = items.find(e => e._id === id)
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        const getItem = async () => {


            // Initialize Pixel only once
            if (item.Fpixal && !pixelInitialized) {
                ReactPixel.init(item.Fpixal, {}, { debug: false }); // debug: true for testing
                pixelInitialized = true;
            }

            // Always send a page view and ViewContent event
            if (item.Fpixal) {
                ReactPixel.pageView();
                ReactPixel.track('ViewContent', {
                    content_name: item.name,
                    content_ids: [item._id],
                    content_type: 'product',
                    value: item.price,
                    currency: 'DZD',
                });
            }
        }



        getItem();
    }, [id]);


    return (
        <div className="w-full  mb-5 overflow-hidden">
            <div className="flex  min-h-screen w-full justify-center">

                <div
                    className="flex flex-col "
                >
                    <div className="w-full px-5 ">
                        <h1 className="my-3  font-bold capitalize text-lg md:text-2xl">
                            {item.name}
                        </h1>

                        <h2 className="text-[#ef4444] font-bold my-2 text-xl">
                            {item.price} DA
                        </h2>
                    </div>
                    {/* Images Section */}
                    <div className=" w-full sm:w-6/12   overflow-hidden mx-auto px-5">
                        <ItemImages imgs={item.imgs} />
                    </div>

                    {/* Form Section */}
                    <div className=" w-11/12 sm:w-9/12   overflow-hidden mx-auto">
                        <ItemForm item={item} />

                    </div>
                    <p className="text-[#000a] text-center font-[500] text-sm mt-10">{item.sTitel}</p>
                </div>
            </div>


        </div>
    );
};

export default Item;
