// @ts-nocheck
import React from "react";
import { CirclesWithBar } from "react-loader-spinner";
export default function Loader() {
  return (
    <section className="fixed h-screen w-full bg-auth bg-themePurple bg-cover bg-no-repeat z-[100] flex justify-center items-center" style={{
      position: "fixed",
      height: "100vh",
      width:"100%",
      background: "#002e63",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      zIndex:"100",
    }}>
      <CirclesWithBar width={100} height={100} color="white" visible={true} />
    </section>
  );
}
export function MiniLoader() {
  return (
    <section
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        top: "0",
        left: "0",
        zIndex: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CirclesWithBar width={100} height={100} color="#002e63" visible={true} />
    </section>
  );
}
