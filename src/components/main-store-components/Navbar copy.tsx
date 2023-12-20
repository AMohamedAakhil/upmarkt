
import React from "react";
import { SelectCategory } from "./SelectCategory";
import SearchBar from "./SearchBar";
import { CallUs } from "./CallUs";
import { Help } from "./Help";
import UserProfile from "./UserProfile";
import { UserLogoDropDown } from "./UserLogoDropDown";
import Menu from "./Menu";
import Link from "next/link";
import dynamic from "next/dynamic";

const Navbar = () => {
  return (
    <>
      <div className="w-full border-b-2 pr-5 pl-5 hidden md:block ">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CallUs />
          </div>
          <div className="flex">
            <div className="mr-5 flex justify-between items-center">
              <Link
                href="https://www.facebook.com/"
                className="mr-3 text-xs text-slate-500"
              >
                Facebook
              </Link>
              <svg
                width="16"
                height="16"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2_182)">
                  <path
                    d="M19 9C19 4.02943 14.7467 0 9.5 0C4.25329 0 0 4.02943 0 9C0 13.4921 3.47399 17.2155 8.01562 17.8907V11.6016H5.60352V9H8.01562V7.01719C8.01562 4.76156 9.43395 3.51562 11.6039 3.51562C12.643 3.51562 13.7305 3.69141 13.7305 3.69141V5.90625H12.5326C11.3525 5.90625 10.9844 6.60006 10.9844 7.3125V9H13.6191L13.1979 11.6016H10.9844V17.8907C15.526 17.2155 19 13.4921 19 9Z"
                    fill="#9A9A9A"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2_182">
                    <rect width="25" height="22" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="mr-5 flex justify-between items-center">
              <Link
                href="https://www.instagram.com/"
                className="mr-3 text-xs text-slate-500"
              >
                Instagram
              </Link>
              <svg
                width="16"
                height="16"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2_187)">
                  <path
                    d="M9.5 1.71074C12.0383 1.71074 12.3389 1.72187 13.3371 1.76641C14.2648 1.80723 14.7658 1.96309 15.0998 2.09297C15.5414 2.26367 15.8605 2.47148 16.1908 2.80176C16.5248 3.13574 16.7289 3.45117 16.8996 3.89277C17.0295 4.22676 17.1854 4.73145 17.2262 5.65547C17.2707 6.65742 17.2818 6.95801 17.2818 9.49258C17.2818 12.0309 17.2707 12.3314 17.2262 13.3297C17.1854 14.2574 17.0295 14.7584 16.8996 15.0924C16.7289 15.534 16.5211 15.8531 16.1908 16.1834C15.8568 16.5174 15.5414 16.7215 15.0998 16.8922C14.7658 17.0221 14.2611 17.1779 13.3371 17.2188C12.3352 17.2633 12.0346 17.2744 9.5 17.2744C6.96172 17.2744 6.66113 17.2633 5.66289 17.2188C4.73516 17.1779 4.23418 17.0221 3.9002 16.8922C3.45859 16.7215 3.13945 16.5137 2.80918 16.1834C2.4752 15.8494 2.27109 15.534 2.10039 15.0924C1.97051 14.7584 1.81465 14.2537 1.77383 13.3297C1.7293 12.3277 1.71816 12.0271 1.71816 9.49258C1.71816 6.9543 1.7293 6.65371 1.77383 5.65547C1.81465 4.72773 1.97051 4.22676 2.10039 3.89277C2.27109 3.45117 2.47891 3.13203 2.80918 2.80176C3.14316 2.46777 3.45859 2.26367 3.9002 2.09297C4.23418 1.96309 4.73887 1.80723 5.66289 1.76641C6.66113 1.72187 6.96172 1.71074 9.5 1.71074ZM9.5 0C6.9209 0 6.59805 0.0111328 5.58496 0.0556641C4.57559 0.100195 3.88164 0.263477 3.28047 0.497266C2.65332 0.742188 2.12266 1.06504 1.5957 1.5957C1.06504 2.12266 0.742188 2.65332 0.497266 3.27676C0.263477 3.88164 0.100195 4.57187 0.0556641 5.58125C0.0111328 6.59805 0 6.9209 0 9.5C0 12.0791 0.0111328 12.402 0.0556641 13.415C0.100195 14.4244 0.263477 15.1184 0.497266 15.7195C0.742188 16.3467 1.06504 16.8773 1.5957 17.4043C2.12266 17.9312 2.65332 18.2578 3.27676 18.499C3.88164 18.7328 4.57188 18.8961 5.58125 18.9406C6.59434 18.9852 6.91719 18.9963 9.49629 18.9963C12.0754 18.9963 12.3982 18.9852 13.4113 18.9406C14.4207 18.8961 15.1147 18.7328 15.7158 18.499C16.3393 18.2578 16.8699 17.9312 17.3969 17.4043C17.9238 16.8773 18.2504 16.3467 18.4916 15.7232C18.7254 15.1184 18.8887 14.4281 18.9332 13.4188C18.9777 12.4057 18.9889 12.0828 18.9889 9.50371C18.9889 6.92461 18.9777 6.60176 18.9332 5.58867C18.8887 4.5793 18.7254 3.88535 18.4916 3.28418C18.2578 2.65332 17.935 2.12266 17.4043 1.5957C16.8773 1.06875 16.3467 0.742188 15.7232 0.500977C15.1184 0.267187 14.4281 0.103906 13.4188 0.059375C12.402 0.0111328 12.0791 0 9.5 0Z"
                    fill="#9A9A9A"
                  />
                  <path
                    d="M9.5 4.62012C6.80586 4.62012 4.62012 6.80586 4.62012 9.5C4.62012 12.1941 6.80586 14.3799 9.5 14.3799C12.1941 14.3799 14.3799 12.1941 14.3799 9.5C14.3799 6.80586 12.1941 4.62012 9.5 4.62012ZM9.5 12.6654C7.75215 12.6654 6.33457 11.2479 6.33457 9.5C6.33457 7.75215 7.75215 6.33457 9.5 6.33457C11.2479 6.33457 12.6654 7.75215 12.6654 9.5C12.6654 11.2479 11.2479 12.6654 9.5 12.6654Z"
                    fill="#9A9A9A"
                  />
                  <path
                    d="M15.7121 4.4271C15.7121 5.05796 15.2 5.56636 14.5729 5.56636C13.942 5.56636 13.4336 5.05425 13.4336 4.4271C13.4336 3.79624 13.9457 3.28784 14.5729 3.28784C15.2 3.28784 15.7121 3.79995 15.7121 4.4271Z"
                    fill="#9A9A9A"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2_187">
                    <rect width="19" height="19" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:border-b-2 p-3 md:p-5 md:pr-10 md:pl-10 flex justify-between md:justify-between items-center">
        <div className="md:hidden">
          {" "}
          {/* Mobile Menu Button */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 7H19" stroke="#222222" stroke-linecap="round" />
            <path d="M5 12H19" stroke="#222222" stroke-linecap="round" />
            <path d="M5 17H19" stroke="#222222" stroke-linecap="round" />
          </svg>
        </div>
        <div className="w-screen md:hidden flex justify-center">
          <h1 className="text-xl md:text-3xl md:-ml-0">Upmarkt</h1>
        </div>
        <div className="hidden md:block">
        <h1 className="text-xl -ml-2 md:text-3xl md:-ml-0">Upmarkt</h1>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.0129 8.52979L7.06858 12.3397L7.07897 12.3494C7.27008 12.5244 7.56325 12.5244 7.75436 12.3494L7.76475 12.3397L11.8204 8.52979C12.9615 7.45785 13.1001 5.69385 12.1404 4.45687L11.9599 4.22428C10.8118 2.74451 8.50728 2.99268 7.70056 4.68296C7.5866 4.92173 7.24673 4.92173 7.13278 4.68296C6.32605 2.99268 4.02151 2.7445 2.8734 4.22428L2.69294 4.45687C1.73322 5.69385 1.87179 7.45785 3.0129 8.52979Z" stroke="#585858"/>
          </svg>
          </div>
          <div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 4.5H5.05848C5.7542 4.5 6.10206 4.5 6.36395 4.68876C6.62584 4.87752 6.73584 5.20753 6.95585 5.86754L7.5 7.5" stroke="#585858" stroke-linecap="round"/>
            <path d="M17.5 17.5H8.05091C7.90471 17.5 7.83162 17.5 7.77616 17.4938C7.18857 17.428 6.78605 16.8695 6.90945 16.2913C6.92109 16.2367 6.94421 16.1674 6.99044 16.0287V16.0287C7.04177 15.8747 7.06743 15.7977 7.09579 15.7298C7.38607 15.0342 8.04277 14.5608 8.79448 14.5054C8.8679 14.5 8.94906 14.5 9.11137 14.5H14.5" stroke="#585858" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.1787 14.5H11.1376C9.85836 14.5 9.21875 14.5 8.71781 14.1697C8.21687 13.8394 7.96492 13.2515 7.461 12.0757L7.29218 11.6818C6.48269 9.79294 6.07794 8.84853 6.52255 8.17426C6.96715 7.5 7.99464 7.5 10.0496 7.5H15.3305C17.6295 7.5 18.779 7.5 19.2126 8.24711C19.6462 8.99422 19.0758 9.99229 17.9352 11.9884L17.6517 12.4846C17.0897 13.4679 16.8088 13.9596 16.3432 14.2298C15.8776 14.5 15.3113 14.5 14.1787 14.5Z" stroke="#585858" stroke-linecap="round"/>
            <circle cx="17" cy="20" r="1" fill="#585858"/>
            <circle cx="9" cy="20" r="1" fill="#585858"/>
          </svg>

          </div>
        </div>
      
        <div className="items-center w-2/3 hidden md:flex">
          <div className="mr-5 ml-5">
            <div className="">
              <SelectCategory />
            </div>
          </div>
          <div className="flex-grow">
            <SearchBar />
          </div>
        </div>
        
        <div className="flex space-x-4 items-center">
          {/* Placeholder div for additional elements on the right */}
          <div className="mr-5 -ml-14 hidden md:visible">
            <Help />
          </div>
          <div className="items-center gap-4 hidden md:flex">
            <UserLogoDropDown />
            <UserProfile />
          </div>
        </div>
      </div>
      <div className="pl-3 pr-3 pb-3 md:hidden">
        <SearchBar />
        </div>
      <div className="hidden md:flex w-full border-b-2 p-3 pr-10 pl-10 justify-between items-center">
        <Menu />
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Navbar), {ssr:false});