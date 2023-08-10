import Image from "next/image";
import Logo from "../../public/logo1.png"
import LoginAuth from "@/components/page/login";

export const metadata = {
  title: 'Wealth Spring | Login',
  description: 'Login page of Wealth spring application',
}

export default function Home() {
  return (
    <div className="">
      <div className="flex justify-evenly items-center p-16 overflow-hidden">
        <div className="">
          <Image src={Logo} alt="wealth-spring logo" />
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Building Wealth, One Step at a Time.</h3>
        </div>
        <div className="">
          <LoginAuth />
        </div>
      </div>
    </div>
  )
}
