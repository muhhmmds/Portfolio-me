// import { Children, createContext, ReactNode, useEffect, useState } from "react";

// type directionType = "rtl" | "ltr";

// type directionContextType = {
//   direction: directionType;
//   toggleDirection: () => void;
// };
// type directionContextProviderType= {
//     children: ReactNode;
// }
// const directionContext = createContext<directionContextType | null>(null);
// export default DirectionContextProvider ({Children}:directionContextProviderType ) {
//     const [dir,setDir] = useState<directionType>("ltr");
//     const toggleDirection = ()=> {
//         if(dir === "ltr"){
//             setDir("rtl");
//             window.localStorage.setItem("direction","rtl");
//             document.documentElement.classList.add("rtl");
//         }else {
//             setDir("ltr");
//             window.localStorage.setItem("direction","ltr");
//             document.documentElement.classList.remove("rtl");
//         }
//     }
//     useEffect(()=> {
//         const localDirection = window.localStorage.getItem("direction") as directionType | null;
//         if(localDirection){
//             setDir(localDirection);
//             if(localDirection === "rtl"){
//                 document.documentElement.classList.add("rtl");
//             }else if (window.matchMedia("(prefers-color-scheme: rtl)").matches) {
//       setDir("rtl");
//       document.documentElement.classList.add("rtl");
//     }

//     }
//     },[]);
//     return (
//         <directionContext.Provider value={
//             direction,toggleDirection
//         } >{children}</directionContext.Provider>
//     )

// }

// export function useDirection() {
//   const context = useContext(directionContext);

//   if (context === null) {
//     throw new Error(
//       "useDirection must be used within a DirectionContextProvider"
//     );
//   }

//   return context;
// }

import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";

type directionType = "rtl" | "ltr";

type directionContextType = {
  direction: directionType;
  toggleDirection: () => void;
};

type directionContextProviderType = {
  children: ReactNode;
};

const directionContext = createContext<directionContextType | null>(null);

export default function DirectionContextProvider({
  children,
}: directionContextProviderType) {
  const [dir, setDir] = useState<directionType>("ltr");

  const toggleDirection = () => {
    setDir((prevDir) => {
      const newDir: directionType = prevDir === "ltr" ? "rtl" : "ltr";
      window.localStorage.setItem("direction", newDir);

      if (newDir === "rtl") {
        document.documentElement.classList.add("rtl");
      } else {
        document.documentElement.classList.remove("rtl");
      }
      return newDir;
    });
  };

  useEffect(() => {
    const localDirection = window.localStorage.getItem(
      "direction"
    ) as directionType | null;

    // 1. Check for local storage value
    if (localDirection) {
      setDir(localDirection);
      if (localDirection === "rtl") {
        document.documentElement.classList.add("rtl");
      }
    }
    // 2. If no local storage value, check system preference
    else if (window.matchMedia("(direction: rtl)").matches) {
      setDir("rtl");
      document.documentElement.classList.add("rtl");
      window.localStorage.setItem("direction", "rtl"); // Store the system preference
    }

    return () => {
      if (window.matchMedia("(direction: rtl)").matches === false) {
        document.documentElement.classList.remove("rtl");
      }
    };
  }, []);

  return (
    <directionContext.Provider value={{ direction: dir, toggleDirection }}>
      {children}
    </directionContext.Provider>
  );
}

export function useDirection() {
  const context = useContext(directionContext);

  if (context === null) {
    throw new Error(
      "useDirection must be used within a DirectionContextProvider"
    );
  }

  return context;
}
