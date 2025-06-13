import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="bg-white sm:max-w-md flex flex-col h-full">
    <SheetHeader>
      <SheetTitle>Your Cart</SheetTitle>
    </SheetHeader>
    <div className="flex-1 overflow-y-auto mt-8 space-y-4">
      {cartItems && cartItems.length > 0
        ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
        : null}
    </div>
    <div className="mt-8 space-y-4">
      <div className="flex justify-between">
        <span className="font-bold">Total</span>
        <span className="font-bold">${totalCartAmount}</span>
      </div>
    </div>
    <Button
      onClick={() => {
        navigate("/shop/checkout");
        setOpenCartSheet(false);
      }}
      className="mt-2 w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Checkout
    </Button>
  </SheetContent>
  );
}

export default UserCartWrapper;
