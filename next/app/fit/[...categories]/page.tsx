import { cookies } from "next/headers";
import React from "react";
import { post_request_with_cookie } from "../../../client";
import {get_auth_token} from '../../../utils/auth_token'
import styles from '../Fit.module.scss'

const Page = async ({params}:any) => {

   
    
    
const category = params.categories[0]
const {body} = await post_request_with_cookie('/api/fit/zeep_life/getData',category,  get_auth_token(cookies()));

console.log(body);

const data = JSON.parse(body).map((e:any) => Object.values(e))

const header = [data.shift()];

    return (
        <table className={styles.table}>
            <thead>
            {header.map((e: any) => (
              <tr>{e.map((e:any) => <td>{e}</td>)}</tr>
            ))}
            </thead>
             <tbody>
            {data.map((e: any) => (
               <tr>{e.map((e:any) => <td>{e}</td>)}</tr>
            ))}
            </tbody>
        </table>
    )
}

export default Page;