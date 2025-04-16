 import Heading from "@/components/typography/Heading";
import UpdateCouponForm from "./UpdateCouponForm";
import { getCouponByCode } from "@/lib/actions/coupon.actions";
 
 const page = async({searchParams}: {searchParams: {code: string}}) => {
  const coupon = await getCouponByCode(searchParams.code);
   return (
     <div>
       <Heading className="mb-10">Cập nhật mã giảm giá</Heading>
       <UpdateCouponForm coupon={coupon}/>
     </div>
   );
 };
 
 export default page;