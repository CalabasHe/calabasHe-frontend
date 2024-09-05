import { View, Text } from 'react-native'

import React from 'react'

const bannerIMG = () => {
  return (
    <div className='main-container flex w-[602.336px] h-[305.878px] pt-[8.878px] pr-[115px] pb-0 pl-[0.34px] gap-[10.667px] items-center flex-nowrap relative overflow-hidden mx-auto my-0'>
      <div className='h-[289.127px] shrink-0 bg-[url(../assets/images/3a36b841-a244-48b4-9478-27367042488b.png)] bg-cover bg-no-repeat absolute top-0 left-0 right-0' />
      <div className='w-[184px] h-[267px] shrink-0 bg-[rgba(217,217,217,0.2)] bg-[url(../assets/images/f8287f58214fd548560f110d62d1054de1d7faa1.png)] bg-cover bg-no-repeat rounded-[20px] relative z-[5]' />
      <div className='flex flex-col gap-[12px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[6]'>
        <div className='h-[100px] self-stretch shrink-0 bg-[rgba(217,217,217,0.2)] bg-[url(../assets/images/77a7a68bcb635cc5de3651182614949b61253883.png)] bg-cover bg-no-repeat rounded-[20px] relative z-[7]' />
        <div className='h-[100px] self-stretch shrink-0 bg-[rgba(217,217,217,0.2)] bg-[url(../assets/images/aabda3aa6f9faf497e9c8afcf0f1879feb80c28f.png)] bg-cover bg-no-repeat rounded-[20px] relative z-[8]' />
      </div>
      <div className='flex w-[94px] flex-col gap-[18px] items-start shrink-0 flex-nowrap relative z-[2]'>
        <div className='h-[75px] self-stretch shrink-0 bg-[url(../assets/images/27cfe9068b1959fb302d4259b6c3bb002ba9f915.png)] bg-cover bg-no-repeat rounded-[15px] relative z-[3]' />
        <div className='h-[92px] self-stretch shrink-0 bg-[url(../assets/images/da170fa68ea006f9dec8a34f80f1d5ecd0b35d9b.png)] bg-cover bg-no-repeat rounded-[20px] relative z-[4]' />
      </div>
      <div className='w-[70px] h-[56px] shrink-0 bg-[url(../assets/images/97005a3a6bba99bc752758fafb75063a337b9977.png)] bg-[length:100%_100%] bg-no-repeat rounded-[15px] relative z-[1]' />
    </div>
  );
  
}

export default bannerIMG