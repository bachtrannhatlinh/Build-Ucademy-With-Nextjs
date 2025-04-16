import { commonClassName } from "@/constants";
 import { IconLeftArrow, IconRightArrow } from "../icons";
 
 const PaginationBtn = () => {
   return (
     <div className="flex justify-end gap-3 mt-5">
       <button className={commonClassName.paginationButton}>
         <IconLeftArrow />
       </button>
       <button className={commonClassName.paginationButton}>
         <IconRightArrow />
       </button>
     </div>
   );
 };
 
 export default PaginationBtn;