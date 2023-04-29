import React from "react"
import Header from "../components/Header";
import { Reader } from "./Reader"


const Page = async () => {
  return (
    <>
      <Header />
      <Reader />
    </>
  )
}

export default Page;