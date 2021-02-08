import {
	AppBar,
	Backdrop,
	Badge,
	Drawer,
	fade,
	IconButton,
	InputBase,
	makeStyles,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@material-ui/core";
import {
	AccountCircle,
	Close,
	Home,
	Inbox,
	Mail,
	Menu as MenuIcon,
	More,
	Notifications,
	Search,
} from "@material-ui/icons/";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import CustomDrawer from "../Drawer/Drawer";

interface Props {
	window?: () => Window;
	drawerChildren?: React.ReactElement;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		marginTop: 60,
		overflow: "auto",
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}));

export const Navbar = (props: Props) => {
	const location = useLocation();
	const classes = useStyles();
	const [drawerToggle, setdrawerToggle] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [
		mobileMoreAnchorEl,
		setMobileMoreAnchorEl,
	] = React.useState<null | HTMLElement>(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const msgCount = 4;
	const notificationCount = 4;

	const handleDrawerToggle = () => {
		setdrawerToggle(!drawerToggle);
	};
	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};
	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const drawerContent =
		location.pathname.includes("/login") ||
		location.pathname.includes("/register")
			? []
			: [
					{
						icon: <Home />,
						to: "/",
						primary: "Home",
					},
					{
						icon: <Inbox />,
						to: "/about",
						primary: "About",
					},
			  ];

	const drawer = (
		<div className={classes.drawerContainer} onClick={handleDrawerToggle}>
			{CustomDrawer(drawerContent)}
		</div>
	);

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			{/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
			{/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
			<Link to="/login" style={{ color: "black", textDecoration: "none" }}>
				<MenuItem onClick={handleMenuClose}>Login</MenuItem>
			</Link>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton aria-label="show new mails" color="inherit">
					<Badge badgeContent={msgCount} color="secondary">
						<Mail />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label="show notifications" color="inherit">
					<Badge badgeContent={notificationCount} color="secondary">
						<Notifications />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<React.Fragment>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					{drawerContent.length > 0 ? (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerToggle}
							edge="start"
						>
							{!drawerToggle ? <MenuIcon /> : <Close />}
						</IconButton>
					) : (
						<React.Fragment></React.Fragment>
					)}
					<Typography className={classes.title} variant="h6" noWrap>
						Material-UI
					</Typography>
					{drawerContent.length > 0 ? (
						<React.Fragment>
							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<Search />
								</div>
								<InputBase
									placeholder="Search…"
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput,
									}}
									inputProps={{ "aria-label": "search" }}
								/>
							</div>
							<div className={classes.sectionDesktop}>
								<IconButton aria-label="show new mails" color="inherit">
									<Badge badgeContent={msgCount} color="secondary">
										<Mail />
									</Badge>
								</IconButton>
								<IconButton aria-label="show new notifications" color="inherit">
									<Badge badgeContent={notificationCount} color="secondary">
										<Notifications />
									</Badge>
								</IconButton>
								<IconButton
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
							</div>
							<div className={classes.sectionMobile}>
								<IconButton
									aria-label="show more"
									aria-controls={mobileMenuId}
									aria-haspopup="true"
									onClick={handleMobileMenuOpen}
									color="inherit"
								>
									<More />
								</IconButton>
							</div>
						</React.Fragment>
					) : (
						<React.Fragment></React.Fragment>
					)}
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
			<Drawer
				style={{ width: 500 }}
				variant="persistent"
				anchor="left"
				open={drawerToggle}
				className={classes.drawer}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				{drawer}
			</Drawer>
			<Toolbar />
			<Backdrop open={drawerToggle} onClick={handleDrawerToggle}></Backdrop>
		</React.Fragment>
	);
};
