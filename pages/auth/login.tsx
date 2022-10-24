import React from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
const Login = () => {
  const router = useRouter();
  console.log(router);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const submit = async () => {
    const response = await signIn("credentials", {
      redirect: true,
      username,
      password,
    });
    console.log("AFter submit: ", response);
  };
  return (
    <div className=" bg-gray-100 min-h-screen min-w-[100vw]">
      <div className="mx-auto max-w-6xl p-12 md:pt-24">
        <div className="flex flex-col md:flex-row justify-center gap-3">
          <div className="md:w-1/2 max-w-md flex flex-col justify-center">
            <div className="lg:text-7xl md:text-4xl text-5xl font-black uppercase">
              HI! <br />
              <span className="text-accent text-3xl lg:text-5xl">Welcome Back</span>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-start mt-5 md:justify-end w-full ">
            <div className="shadow-lg  flex flex-col justify-center max-w-sm p-10">
              <div className="w-full">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  <span className="text-red-400 mr-1">*</span> Username
                </div>
                <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                  {" "}
                  <input
                    placeholder="Type here"
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                  />{" "}
                </div>
              </div>
              <div className="w-full">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  <span className="text-red-400 mr-1">*</span> Password
                </div>
                <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                  {" "}
                  <input
                    type="password"
                    placeholder="Type here"
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                  />{" "}
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-accent mt-3 w-full" onClick={submit}>
                  Submit
                </button>
              </div>
              <div className="mt-4">
                <Link href="/">
                  <button className="btn btn-sm btn-ghost">Go Home</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
