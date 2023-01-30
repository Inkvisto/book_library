'use client'

import useSettingsStore from "../../zustand/settingsStore";
import Header from "../components/Header";
import styles from './Layout.module.scss'



export default function Layout({ children }: {
    children: React.ReactNode;
  }) {
    return (    
       <div>{children}</div>
      
    );
  }


