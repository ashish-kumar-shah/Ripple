import React, { useContext } from "react";
import ServiceContext from "../../Context/ContextCreate/ServiceContex";


const UploadProgress = () => {
  const { uploadProgress } = useContext(ServiceContext);
   



  return uploadProgress > 0  ? (<div className="w-full p-2  flex"  >
    <div
          className="bg-green-500 h-3 transition-all duration-300 "
          style={{ width: `${uploadProgress}%` }}
        >
         

        </div>
  </div>):console.log(uploadProgress);
  
};

export default UploadProgress;
