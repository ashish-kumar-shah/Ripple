import React, { useContext, useState } from "react";
import UserContext from "../../Context/CreateContext/UserContext";
import ServiceContext from "../../Context/CreateContext/ServicesContext";

const ProfilePicInput = () => {
  const { User } = useContext(UserContext);
  const {updateAvtar} = useContext(ServiceContext);
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
      file !== null &&  updateAvtar(file).then(res=>{
        alert("Profile Updated");
      }).catch(err=>{
        alert("Error");
      })
    setIsEditing(false);
  };
 

  return (
    <div>
      <label className="text-sm font-medium">Profile Picture</label>
      <div className="flex items-center gap-4 mt-2">
        { (
          <img
            src={file ? URL.createObjectURL(file) : User?.user?.avtar}
            className="w-16 h-16 rounded-full object-cover border object-top"
            alt="preview"
            loading="lazy"
           
          />
        ) }
        {isEditing ? (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button onClick={handleSave} className="text-blue-600">
              Save
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-blue-600">
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePicInput;
