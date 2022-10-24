import React from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });
  const submit = async ({ username, password }: { username: string; password: string }) => {
    const response = await signIn("credentials", {
      redirect: true,
      username,
      password,
    });
  };
  return (
    <div className=" bg-gray-100 min-h-screen min-w-[100vw]">
      <div className="mx-auto max-w-6xl p-12 md:pt-24">
        <div className="flex flex-col md:flex-row justify-center gap-3">
          <div className="md:w-1/2 max-w-md flex flex-col justify-center">
            <div className="lg:text-7xl md:text-4xl text-4xl font-bold uppercase">
              HI! <br />
              <span className="text-accent text-3xl font-extrabold lg:text-5xl">Welcome Back</span>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-start mt-5 md:justify-end w-full ">
            <div className="shadow-lg  flex flex-col justify-center max-w-sm p-10">
              <div className="w-full">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  <span className="text-red-400 mr-1">*</span> Username
                </div>
                <div className="form-control w-full max-w-xs mt-2">
                  <input
                    type="text"
                    placeholder="Type here"
                    {...register("username", { required: "Username is required." })}
                    className={`input input-bordered bg-gray-100 w-full max-w-xs ${
                      errors?.username && "input-error"
                    }`}
                  />
                </div>
                <p className="error-text mt-2">{errors?.username?.message}</p>
              </div>
              <div className="w-full">
                <div className="font-bold h-6 mt-2 text-gray-600 text-xs leading-8 uppercase">
                  <span className="text-red-400 mr-1">*</span> Password
                </div>
                <div className="form-control w-full max-w-xs mt-2">
                  <input
                    type="password"
                    placeholder="Type here"
                    {...register("password", { required: "Password is required." })}
                    className={`input input-bordered bg-gray-100 w-full max-w-xs ${
                      errors?.password && "input-error"
                    }`}
                  />
                </div>
                <p className="error-text mt-2">{errors?.password?.message}</p>
              </div>
              <div className="text-center">
                <button className="btn btn-accent mt-4 w-full " onClick={handleSubmit(submit)}>
                  Submit
                </button>
              </div>
              <div className="mt-6">
                <Link href="/">
                  <button className="btn btn-sm btn-ghost">Go back</button>
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
