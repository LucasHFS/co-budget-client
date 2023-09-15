import styles from "./Header.module.scss";
import HomeIcon from "@/../public/icons/home.svg";
import AddIcon from "@/../public/icons/add.svg";
import DashboardIcon from "@/../public/icons/dashboard.svg";
import CurrencyIcon from "@/../public/icons/currency.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import cx from "classnames";
import { useAuth } from "@/modules/auth";

export const Header = () => {
  const { isAuthenticated } = useAuth()
  return (
    <>
      <header className={styles.header}>
        <nav>
          <ul className={styles.navLinkList}>
            {isAuthenticated ? <LoggedLinks /> : <GuestLinks />}
          </ul>
        </nav>
      </header>
    </>
  );
};

type NavLinkProps = {
  Icon: (props: { className: string }) => JSX.Element;
  link: string;
  text: string;
};

const NavLink = ({ Icon, link, text }: NavLinkProps) => {
  const router = useRouter();
  const activePath = router.asPath;
  const isActive = activePath === link;

  return (
    <li className={styles.navLink}>
      <Link className={styles.navLinkContent} href={link}>
        {/* <Icon
          className={cx(styles.navLinkIcon, {
            [styles.active]: isActive,
          })}
        /> */}

        <span
          className={cx(styles.navLinkText, {
            [styles.active]: isActive,
          })}
        >
          {text}
        </span>
      </Link>
    </li>
  );
};

const GuestLinks = () => {
  return (
    <>
      <NavLink Icon={AddIcon} link="/login" text="Acessar" />
      <NavLink Icon={DashboardIcon} link="/register" text="Registrar" />
    </>
  )
}

const LoggedLinks = () => {
  return (
    <>
      <NavLink Icon={HomeIcon} link="/" text="Pedidos" />
      {/* <NavLink Icon={DashboardIcon} link="/deliveries" text="Entregas" /> */}
      <NavLink Icon={DashboardIcon} link="/products" text="Produtos" />
      <NavLink Icon={DashboardIcon} link="/clients" text="Clientes" />
      <NavLink Icon={DashboardIcon} link="/drivers" text="Motoristas" />
      <NavLink Icon={DashboardIcon} link="/sale-events" text="Eventos" />

      <LogOutOption />
    </>
  )
}

const LogOutOption = () => {
  const { signOut } = useAuth()
  return (
    <li className={styles.navLink}>
      <Link className={styles.navLinkContent} onClick={signOut} href='/'>
        {/* <Icon
          className={cx(styles.navLinkIcon, {
            [styles.active]: isActive,
          })}
        /> */}

        <span
          className={cx(styles.navLinkText)}
        >
          Sair
        </span>
      </Link>
    </li>
  )
}
