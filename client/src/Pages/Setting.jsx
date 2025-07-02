import React, { useContext, useState } from "react";
import EditableField from "../Component/Settings/EditableField";
import ProfilePicInput from "../Component/Settings/ProfilePicInput";
import UserContext from "../Context/CreateContext/UserContext";
import {  useNavigate } from "react-router-dom";

const Setting = () => {
  const { handleLogout, userDispatch,User } = useContext(UserContext);
 
  
  const navigate = useNavigate();
  const [name, setName] = useState(User?.user?.name);
  const [email, setEmail] = useState(User?.user?.email);
  const [bio, setBio] = useState(User?.user?.bio);
  const [password, setPassword] = useState("****************");

  const handleLogoutfunc = async () => {
    const res = await handleLogout();

    if (res.success) {
      navigate('/signin')
      userDispatch({ type: "LOGOUT_SUCEESS" });
      
    } else {
      userDispatch({ type: "LOGOUT_FAILED" });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10 space-y-6 h-full overflow-y-auto hide-scrollbar">
      <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
      <hr />
      <ProfilePicInput />
      <EditableField label="Name" value={name} onSave={setName} name={"name"} />
      <EditableField
        label="Email"
        value={email}
        type="email"
        name={'email'}
        onSave={setEmail}
      />
      <EditableField label="Bio" value={bio} multiline onSave={setBio} name={'bio'} />
      <EditableField
        label="Password"
        value={password}
        type="password"
        onSave={setPassword}
        name={'password'}
      />
      <hr />
      <div className="pt-6 ">
        <button
          onClick={handleLogoutfunc}
          className="w-full px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Setting;
