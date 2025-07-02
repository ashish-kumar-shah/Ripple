import React,{useContext} from "react";
import Avtar from "../Basic/Avtar";
import UserContext from "../../Context/CreateContext/UserContext";

const Topbar = () => {
  const {User} = useContext(UserContext)
  return (
    <div className="w-full h-24 border p-1">
      <div className="h-full w-fit   p-1 text-center flex flex-col rounded-lg rounded-t-2xl  items-center justify-between" >
        <Avtar
        value={User.user.avtar}
          piccss={"w-14 h-14 object-cover object-top rounded-full aspect-square"}
          design={" w-16 h-16  rounded-full aspect-square border-2 flex justify-center items-center "}
        />
        <span className="text-xs font-semibold font-mono text- text-gray-600">
          {
            User.user.username
          }
        </span>
      </div>
    </div>
  );
};

export default Topbar;
