import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect } from 'react';
import { AnimateSharedLayout, motion, useScroll } from 'framer-motion'
const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <main className="">
      <div className="w-full bg-ybg/50 absolute h-[calc(100vh-calc(100vh-100%))]">
        <div className="p-4 flex flex-col w-full h-[calc(100vh-calc(100vh-100%))]">
          <div className="grow flex flex-col justify-center items-center py-4 mx-auto gap-6 lg:gap-8">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 lg:gap-8">
              <Image 
                src="https://mwitophcdn.woyiswoy.com/img/logo22dark.svg" 
                alt="MWIT Open House 2022 Logo"
                width={250} 
                height={250} 
                className="w-[180px] md:w-[220px] lg:w-[250px]"
              />
              <div className="font-CS font-bold space-y-2 text-bmw">
                <div className="flex pb-2">
                  <div className="bg-ora text-white px-2 pt-1 pb-0.5 rounded-full text-xs md:text-sm lg:text-base">
                    ONLINE
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  MWIT Open House 2022
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl">
                  22 - 28 สิงหาคม 2565
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a className="relative bg-ymw/50 hover:bg-ymw hover:text-black cursor-pointer transition-colors duration-200 py-1 md:py-2 px-3 md:px-4 rounded-full font-CS font-bold text-lg md:text-xl lg:text-2xl text-bmw">
                <div className="absolute text-xs md:text-sm text-white -right-2 -top-2 bg-oft font-semibold px-[0.35rem] md:px-2 rounded-full" style={{ transform: "translateY(0px) scale(1) rotate(6deg) translateZ(0px)" }}>
                  New
                </div>
                <span className="whitespace-nowrap">School Tour</span>
              </a>
              <a className="relative bg-white/50 hover:bg-ymw hover:text-black cursor-pointer transition-colors duration-200 py-1 md:py-2 px-3 md:px-4 rounded-full font-CS font-bold text-lg md:text-xl lg:text-2xl text-bmw">
                <div className="absolute text-xs md:text-sm text-white -right-2 -top-2 bg-oft font-semibold px-[0.35rem] md:px-2 rounded-full" style={{ transform: "translateY(0px) scale(1) rotate(6deg) translateZ(0px)" }}>
                  Vote Now!
                </div>
                <span className="whitespace-nowrap">โครงการวาดภาพและถ่ายภาพทางชีววิทยา</span>
              </a>
            </div>
          </div>
          <div className="w-full max-w-4xl md:pb-4 mx-auto flex-none grid grid-flow-col gap-2 lg:gap-4">
            <a className="bg-ymw/50 hover:bg-ymw text-bmw hover:text-black cursor-pointer grayscale-0 transition-colors duration-200 rounded-xl p-3 grid grid-flow-row content-center gap-2 md:gap-3 justify-items-center" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="house" className="svg-inline--fa fa-house h-6 md:h-8 lg:h-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path fill="currentColor" d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z"></path>
              </svg>
              <span className="font-CS font-bold text-xs sm:text-base md:text-lg lg:text-xl text-center">Home</span>
            </a>
            <a className="bg-white/50 hover:bg-ymw text-bmw hover:text-black cursor-pointer grayscale-0 transition-colors duration-200 rounded-xl p-3 grid grid-flow-row content-center gap-2 md:gap-3 justify-items-center" href="https://facebook.com/MWITOpenHouse" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" className="svg-inline--fa fa-facebook h-6 md:h-8 lg:h-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.69 226.4 209.3 245V327.7h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.3 482.4 504 379.8 504 256z"></path>
              </svg>
              <span className="font-CS font-bold text-xs sm:text-base md:text-lg lg:text-xl text-center">Follow Us</span>
            </a>
            <a className="bg-white/50 hover:bg-ymw text-bmw hover:text-black cursor-pointer grayscale-0 transition-colors duration-200 rounded-xl p-3 grid grid-flow-row content-center gap-2 md:gap-3 justify-items-center" href="https://apply.mwit.ac.th" target="_blank" rel="noopener noreferrer">
              <Image 
                src="https://mwitophcdn.woyiswoy.com/img/admission.png" 
                alt="ระบบรับสมัครเข้าม.4" 
                width={40} 
                height={40} 
                className="h-6 md:h-8 lg:h-10"
              />
              <span className="font-CS font-bold text-xs sm:text-base md:text-lg lg:text-xl text-center">ระบบรับสมัครเข้าม.4</span>
            </a>
            <a className="bg-white/50 hover:bg-ymw text-bmw hover:text-black cursor-pointer grayscale-0 transition-colors duration-200 rounded-xl p-3 grid grid-flow-row content-center gap-2 md:gap-3 justify-items-center" href="https://square.mwit.ac.th" target="_blank" rel="noopener noreferrer">
              <Image 
                src="https://mwitophcdn.woyiswoy.com/img/sqlogofull.png" 
                alt="MWIT Square" 
                width={40} 
                height={40} 
                className="h-6 md:h-8 lg:h-10"
              />
              <span className="font-CS font-bold text-xs sm:text-base md:text-lg lg:text-xl text-center">MWIT Square</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
