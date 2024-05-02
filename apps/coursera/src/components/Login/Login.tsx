"use client"

import Link from "next/link"
interface LoginProps{
    buttonText:string
}
export const Login:React.FC<LoginProps> = ({buttonText}:LoginProps)=>{
    return<div>
    <div className="w-[330px] h-[410px] sm:w-[440px] sm:h-[360px] border-[1.5px] border-black rounded-xl bg-white flex flex-col gap-8 sm:gap-8">
        <div className="flex flex-col items-center w-full pt-4 gap-2">
          <div className="w-[90%]">
            <h1 className="">Username</h1>
            <input
            autoFocus={true}
              name="username"
              id="username"
              placeholder=""
              className="bg-gray-100 w-full h-[40px] rounded-full px-4"
            ></input>
          </div>
          <div className="w-[90%]">
            <h1 className="">Password</h1>
            <input
              name="password"
              id="password"
              placeholder=""
              className="bg-gray-100 w-full h-[40px] rounded-full px-4"
            ></input>
          </div>

          <button
            className="rounded-full bg-black text-white font-semibold px-12 py-2 mt-4"
          >
            {buttonText}
          </button>
        </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="font-semibold">Or</h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={"/login/google"} className="hover:bg-gray-200 rounded-full">
            <img src="googleSignin.svg" className=""></img>
          </Link>
          <Link
            href={"/login/github"}
            className="px-[12px] py-[10px] border-[1px] border-gray-500 w-[189px] h-[40px] rounded-full flex flex-row items-center justify-between hover:bg-gray-200"
          >
            <img className="size-[20px]" src="github.svg"></img>
            <h1 className="roboto-medium">Continue with GitHub</h1>
          </Link>
        </div>
      </div>
    </div>
  </div>
}