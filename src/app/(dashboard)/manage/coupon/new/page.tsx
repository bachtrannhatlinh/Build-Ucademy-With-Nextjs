 import Heading from "@/components/typography/Heading";
import NewCouponForm from "./NewCouponForm";
 
 const page = () => {
   return (
     <div>
       <Heading className="mb-10">Tạo mới mã giảm giá</Heading>
       <NewCouponForm />
     </div>
   );
 };
 
 export default page;