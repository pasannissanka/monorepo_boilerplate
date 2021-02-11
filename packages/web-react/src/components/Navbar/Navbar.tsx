import {
	AppBar,
	Badge,
	CssBaseline,
	Divider,
	Drawer,
	fade,
	IconButton,
	InputBase,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
	useTheme
} from "@material-ui/core";
import {
	AccountCircle,
	ChevronLeft,
	ChevronRight,
	Close,

	Inbox,
	Mail,
	Menu as MenuIcon,
	More,
	Notifications,
	Search
} from "@material-ui/icons/";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
	window?: () => Window;
	drawerChildren?: React.ReactElement;
	children: React.ReactNode;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
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
	hide: {
		display: "none",
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
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9) + 1,
		},
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
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export const Navbar = (props: Props) => {
	const classes = useStyles();
	const theme = useTheme();
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
	const handleLogOut = () => {
		localStorage.removeItem("auth_token");
		handleMenuClose();
	};

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
				<MenuItem onClick={handleLogOut}>Logout</MenuItem>
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
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: drawerToggle,
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerToggle}
							edge="start"
							className={clsx(classes.menuButton, {
								[classes.hide]: drawerToggle,
							})}
						>
							{!drawerToggle ? <MenuIcon /> : <Close />}
						</IconButton>
						<Typography className={classes.title} variant="h6" noWrap>
							Material-UI
						</Typography>
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
					</Toolbar>
				</AppBar>
				{renderMobileMenu}
				{renderMenu}
				<Drawer
					variant="permanent"
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: drawerToggle,
						[classes.drawerClose]: !drawerToggle,
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: drawerToggle,
							[classes.drawerClose]: !drawerToggle,
						}),
					}}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={handleDrawerToggle}>
							{theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
						</IconButton>
					</div>
					<Divider />
					<List>
						{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{index % 2 === 0 ? <Inbox /> : <Mail />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						{["All mail", "Trash", "Spam"].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{index % 2 === 0 ? <Inbox /> : <Mail />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
				</Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{props.children}
				</main>
			</div>
		</React.Fragment>
	);
};
