import { cookies } from "next/headers";
import Link from "next/link";
import React from "react"
import { get_request } from "../../client";
import { get_auth_token } from "../../utils/auth_token";

import styles from './Fit.module.scss'





const Page = async () => {


    const fitCategories = await get_request('/api/fit/zeep_life/getCategories', get_auth_token(cookies()));


    return(
        <div>Choose category:
            <ul className={styles.categories}>
                {typeof fitCategories === 'string' ? fitCategories : fitCategories.map((e:any) => (
                    <Link href={'/fit/' + e.toLowerCase()}>{e.toLowerCase()}</Link>
                ))}
            </ul>
        </div>
    )

}

export default Page;