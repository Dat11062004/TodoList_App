import React, { useState } from "react";
import assets from "../src/assets/assets";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useEffect } from "react";

const HomePage = () => {
  const { logout, list, getList, addTask, updateTask, deleteTask } =
    useContext(AuthContext);
  const [input, setInput] = useState("");
  const handleForm = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    await addTask(input); // Gửi lên server
    await getList(); // Cập nhật lại danh sách từ server
    setInput(""); // Clear input
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="w-full min-h-screen p-2 bg-[linear-gradient(135deg,_#153667,_#4e085f)]">
      <div onClick={logout} className="w-full text-end">
        <button className="border-none outline-none px-8 py-4 bg-blue-400 hover:bg-red-500 text-white text-xs cursor-pointer rounded-2xl ">
          Logout
        </button>
        <div className="text-center">
          <p className="text-3xl text-blue-400">Welcome </p>
        </div>
      </div>
      <div className="w-full max-w-[540px] bg-white mt-[100px] mx-auto mb-[20px] px-[30px] pt-[40px] pb-[70px] rounded-[10px]">
        <p className="flex items-center mb-[20px] text-[#002765] text-3xl">
          To-Do List <img className="w-10 ml-2" src={assets.icon} alt="" />
        </p>

        <form
          onSubmit={handleForm}
          className=" flex items-center justify-between bg-gray-200 rounded-[30px] pl-5 mb-6"
        >
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Add your text"
            className="flex-1 border-none outline-none bg-transparent p-2.5"
          />
          <button
            type="submit"
            className="border-none outline-none px-8 py-4 bg-[#ff5945] text-white text-xs cursor-pointer rounded-2xl"
          >
            Add
          </button>
        </form>

        {list.map((item, index) => {
          return (
            <div className="flex justify-between items-center mb-2" key={index}>
              <div
                onClick={async () => {
                  await updateTask(item._id);
                  await getList();
                }}
                className="flex items-center justify-center cursor-pointer"
              >
                <img
                  className="w-8"
                  src={item.done ? assets.checked : assets.unchecked}
                  alt=""
                />
                <p
                  className={`text-2xl p-5 ${
                    item.done ? "line-through text-gray-500" : ""
                  }`}
                >
                  {item.content}
                </p>
              </div>
              <p
                className="text-white cursor-pointer text-sm rounded-full bg-[#ff5945] w-8 h-8 flex items-center justify-center hover:bg-green-500"
                onClick={() => {
                  deleteTask(item._id);
                }}
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
