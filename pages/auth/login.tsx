import React from "react";

const Login = () => {
  return (
    <div className=" bg-primary min-h-screen min-w-[100vw]">
      <div className="mx-auto max-w-6xl p-12">
        <div className="flex flex-col md:flex-row justify-center gap-3">
          <div className="md:w-1/2 max-w-md flex flex-col justify-center">
            <div className="md:text-4xl text-xl font-black uppercase">
              Awesome tool for your future team
            </div>
            <div className="text-xl mt-4">Develop your workforce and make it a selling machine</div>
          </div>
          <div className="md:w-1/2 flex justify-start mt-5 md:justify-end w-full ">
            <div className="shadow-lg  flex-auto max-w-sm p-10 pb-20">
              <div className="w-full">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  <span className="text-red-400 mr-1">*</span> First Name
                </div>
                <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                  {" "}
                  <input
                    placeholder="Jhon"
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                  />{" "}
                </div>
              </div>
              <div className="w-full">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  <span className="text-red-400 mr-1">*</span> Last Name
                </div>
                <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                  {" "}
                  <input
                    placeholder="Doe"
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                  />{" "}
                </div>
              </div>
              <div className="w-full">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  <span className="text-red-400 mr-1">*</span> Email
                </div>
                <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                  {" "}
                  <input
                    placeholder="jhon@doe.com"
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                  />{" "}
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-accent mt-3 w-full">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;