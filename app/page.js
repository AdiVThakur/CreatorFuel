import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex justify-center items-center flex-col text-white min-h-[44vh] py-12 px-4 gap-4 text-center">
        <div className="font-bold flex flex-wrap gap-2 text-3xl sm:text-4xl md:text-[48px] justify-center items-center">
          <span>Send a Spark</span>
          <span>
            <img src="/rocket.gif" className="w-12 sm:w-16 md:w-[77px]" alt="Rocket" />
          </span>
        </div>
        <p className="max-w-2xl text-sm sm:text-base text-slate-300 px-2">
          Support developers, writers, and artists directly. CreatorFuel provides seamless payment links, live supporter leaderboards, and instant creator payouts. Start Now!
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <Link href={"/login"}>
            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-4 py-2.5 text-center leading-5 rounded-lg">
              Start Now
            </button>
          </Link>
          <Link href={"/about"}>
            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-4 py-2.5 text-center leading-5 rounded-lg">
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      {/* Features Section */}
      <div className="text-white container mx-auto px-4 pb-20 pt-14">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-10 sm:mb-14 px-2">
          Your Fans can Power Up your Work 🚀
        </h2>
        <div className="flex flex-col md:flex-row gap-8 md:gap-5 justify-around items-center md:items-start">
          <div className="item space-y-3 flex flex-col items-center max-w-sm">
            <img className="bg-slate-400 rounded-full p-2 text-black w-20 md:w-[88px]" src="/man.gif" alt="Creator" />
            <p className="font-bold text-[1.125rem]">Fuel Your Passion</p>
            <p className="text-center text-[0.875rem] text-slate-300">
              Get direct financial support from followers who believe in your work.
            </p>
          </div>

          <div className="item space-y-3 flex flex-col items-center max-w-sm">
            <img className="bg-slate-400 rounded-full p-2 text-black w-20 md:w-[88px]" src="/coin.gif" alt="Micro-donations" />
            <p className="font-bold text-[1.125rem]">Instant Micro-Payouts</p>
            <p className="text-center text-[0.875rem] text-slate-300">
              Receive seamless payments directly into your account with zero hassle.
            </p>
          </div>

          <div className="item space-y-3 flex flex-col items-center max-w-sm">
            <img className="bg-slate-400 rounded-full p-2 text-black w-20 md:w-[88px]" src="/group.gif" alt="Community" />
            <p className="font-bold text-[1.125rem]">Engage Your Backers</p>
            <p className="text-center text-[0.875rem] text-slate-300">
              Build a strong supporter leaderboard and connect with your top fans.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      {/* Video Section */}
      <div className="text-white container mx-auto px-4 pb-20 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-10 sm:mb-14">
          Learn more about us
        </h2>
        <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-slate-800">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/QtaorVNAwbI?si=YVor2wgP3u5_rr83"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}