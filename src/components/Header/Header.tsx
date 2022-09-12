import React from 'react';
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <Link to="/" className={styles.header_logo_div}>
          <div className={styles.logo_link_wrapper}>
            <div className={styles.header_logo}>
              <img src={"../../../public/images/Frame.png"} alt="logo" />
            </div>
            <div className={styles.header_logo_name}>Lalasia</div>
          </div>
        </Link>

        <div className={styles.header_categories}>
          <div className={styles.header_categories_name}>Product</div>
          <div className={styles.header_categories_name}>Services</div>
          <div className={styles.header_categories_name}>Article</div>
          <div className={styles.header_categories_name}>About Us</div>
        </div>

        <div className={styles.header_icon_div}>
          <div className={styles.header_icon}>
            <img src={"../../../public/images/bag_2.png"} alt="bag" />
          </div>
          <div className={styles.header_icon}>
            <img src={"../../../public/images/user.png"} alt="user_icon" />
          </div>
          <div className={styles.header_menu_icon}>
            <img src={"../../../public/images/menu.png"} alt="user_menu_icon" />
          </div>
        </div>
      </div>
      <div className={styles.border} />
    </>
  );
};
