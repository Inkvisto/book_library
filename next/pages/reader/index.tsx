import { GetStaticProps, GetStaticPropsContext } from "next"
import React, { ReactElement } from "react"
import Layout from "../../components/layouts"
import Reader from "../../components/Reader"
import SideBar from "../../components/SideBar"
import { host } from "../../constants/server.constants"
import { NextPageWithLayout } from "../_app"

const ReaderPage: NextPageWithLayout = (props: any) => {
  const [book,getBook] = React.useState(null)

  return (
    <div style={{'display':'flex'}}>
      <SideBar getBook={getBook} />
      <Reader book={book} />
    </div>
  )
}

ReaderPage.getLayout = (page: ReactElement) => {
  console.log(page.props);
  
  return (
    <Layout {...page.props} >
        {page}
    </Layout>
  )
}

export default ReaderPage

export const getStaticProps: GetStaticProps = async (context:GetStaticPropsContext) => {

  const token = false
    if (token) {
    const res = await fetch(`${host}user`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Cookie': token
      }
    })

    const user: any = await res.json()

    return { props: { context } }
  } else {
    return { props: {  } }
  }

}