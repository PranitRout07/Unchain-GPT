import { useState } from "react"

export default function SideBar(){

    // const [title,setTitle] = useState([])
    const title = [
        "title-01sccdsdvsdsv",
        "title-02vdsdvsvdds",
        "title-03dvsdvdvs",
        "title-04dsvvdsdsd",
        "title-05svdssvd",
        "title-06vdsvds",
        "title-07",
        "title-08",
        "title-09dvsdv",
        "title-10dvsdvsvdsv",
        "title-11",
        "title-12",
        "title-13dvdvsv",
        "title-14dvsdsssss",
        "title-15dvvdsds",
        "title-16dvsvds",
        "title-17dvvsd",
        "title-18dvsdvs",
        "title-19dvsdsvds",
        "title-20vdsd",
        "title-21dvsdvsvds",
        "title-22sasdavsa",
        "title-23wmlkemlwm",
        "title-24cq..;w.'v",
        "title-25,csl;l;",
        "title-26llcml",
        "title-27",
        "title-28kcmsalsd",
        "title-29maslcm;s",
        "title-30cs,a;l",
    ]

    return (
        <div className="w-full h-[76vh] overflow-y-auto overflow-x-hidden flex-col space-y-3 pl-8">
        
            {
                title.map((val,index)=>{
                    return (
                        <div className="flex justify-start" key={`${Date.now()}+${index}`}>
                            <span className="text-white text-[15px]">{val}</span>
                        </div>
                    )
                })
            }

        </div>
    )
}