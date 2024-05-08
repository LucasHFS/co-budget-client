import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WalletIcon from '@mui/icons-material/Wallet';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import styles from './Header.module.scss'
import cx from "classnames";
import { useAuth } from '@/concepts/Auth/hooks/useAuth';

const drawerWidth = 240;

const HomeListItem = ({handleDrawerToggle}:any) => {
  const router = useRouter()
  const active = router.pathname === '/'

  return (
    <ListItem
      key={'Gastos'}
      disablePadding
      className={
        cx(styles.box,
          {
            [styles.active]: active
          }
        )
      }
    >
      <ListItemButton onClick={() => {router.push('/', undefined, { shallow: true }); handleDrawerToggle();}}>
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary={'Gastos'} />
      </ListItemButton>
    </ListItem>
  )
}

const BudgetListItem = ({handleDrawerToggle}:any) => {
  const router = useRouter()
  const active = router.pathname === '/budgets'

  return (
    <ListItem
      key={'Orçamentos'}
      disablePadding
      className={
        cx(styles.box,
          {
            [styles.active]: active
          }
        )
      }
    >
      <ListItemButton onClick={() => {router.push('/budgets', undefined, { shallow: true }); handleDrawerToggle();}}>
        <ListItemIcon>
          <WalletIcon />
        </ListItemIcon>
        <ListItemText primary={'Orçamentos'} />
      </ListItemButton>
    </ListItem>
  )
}

const LogoutListItem = ({handleDrawerToggle}:any) => {
  const { signOut } = useAuth()

  return (
    <ListItem key={'Orçamentos'} disablePadding >
      <ListItemButton onClick={() => {signOut(); handleDrawerToggle();}} >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={'Sair'} />
      </ListItemButton>
    </ListItem>
  )
}

const LoginListItem = ({handleDrawerToggle}:any) => {
  const router = useRouter()
  const active = router.pathname === '/' || router.pathname === '/login'

  return (
    <ListItem
      key={'Login'}
      disablePadding
      className={
        cx(styles.box,
          {
            [styles.active]: active
          }
        )
      }
    >
      <ListItemButton onClick={() => {router.push('/login', undefined, { shallow: true }); handleDrawerToggle();}}>
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        <ListItemText primary={'Login'} />
      </ListItemButton>
    </ListItem>
  )
}

const RegisterListItem = ({handleDrawerToggle}:any) => {
  const router = useRouter()
  const active = router.pathname === '/register'

  return (
    <ListItem
      key={'Cadastrar'}
      disablePadding
      className={
        cx(styles.box,
          {
            [styles.active]: active
          }
        )
      }
    >
      <ListItemButton onClick={() => {router.push('/register', undefined, { shallow: true }); handleDrawerToggle();}}>
        <ListItemIcon>
          <AppRegistrationIcon />
        </ListItemIcon>
        <ListItemText primary={'Cadastrar'} />
      </ListItemButton>
    </ListItem>
  )
}


const LoggedLinks = ({handleDrawerToggle}: any) => (
  <>
    <HomeListItem handleDrawerToggle={handleDrawerToggle}/>
    <BudgetListItem handleDrawerToggle={handleDrawerToggle}/>
    <LogoutListItem handleDrawerToggle={handleDrawerToggle}/>
  </>
)

const GuestLinks = ({handleDrawerToggle}: any) => (
  <>
    <LoginListItem handleDrawerToggle={handleDrawerToggle}/>
    <RegisterListItem handleDrawerToggle={handleDrawerToggle}/>
  </>
)

export const Header = (props: any) =>{
  const { isAuthenticated } = useAuth()

  const { window, title } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
        <List>
         {isAuthenticated ? <LoggedLinks handleDrawerToggle={handleDrawerToggle} /> : <GuestLinks handleDrawerToggle={handleDrawerToggle} />}
        </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
   <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="h1">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* TODO: The implementation can be swapped with js to avoid SEO duplication of links. */}
        <SwipeableDrawer
          onOpen={()=>{}}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </SwipeableDrawer>
        <SwipeableDrawer
          onOpen={()=>{}}
          onClose={()=>{}}
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </SwipeableDrawer>
      </Box>

    </Box>
  );
}
