import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
    Collapse,
    ListItem,
    Typography,
    List
}
    from "@mui/material";
import { useNavigate } from "react-router-dom";

//icon imports
import {
    ExpandLess,
    ExpandMore
}
    from "@mui/icons-material";

function MenuList({ icons, menu, drawerOpen, setDrawerState }) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const [selected, setSelected] = React.useState(true);

    const handleOpen = (label) => {
        // If the drawer is not open, open it when expanding menus
        !drawerOpen && setDrawerState(true);

        setOpen(open === label ? "" : label);
    };
    const handleSelected = (label) => {
        setSelected(label);
    };

    React.useEffect(() => {
        !drawerOpen && setOpen("");
    }, [drawerOpen]);

    return (
        <>
            {/**Standard List */}
            <List>
                {menu.map((parent, parentIndex) => {
                    return (
                        <ListItem
                            key={parent.label}
                            disablePadding
                            sx={{ display: "block" }}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: drawerOpen ? "initial" : "center",
                                    px: 2.5,
                                }}
                                selected={selected === parent.label}
                                onClick={() => {
                                    if (parent.children.length === 0) {
                                        setSelected(parent.label);
                                    }

                                    parent.children.length > 0
                                        ? handleOpen(parent.label)
                                        : navigate(parent.route, { state: parent.label });
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: drawerOpen ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    {icons[parent.iconName]}
                                </ListItemIcon>
                                <ListItemText sx={{ opacity: drawerOpen ? 1 : 0 }}>
                                    {" "}
                                    <Typography sx={{ color: "white" }}>{parent.label}</Typography>
                                </ListItemText>
                                {parent.children.length > 0 ? (
                                    drawerOpen ? (
                                        open === parent.label ? (
                                            <ExpandLess />
                                        ) : (
                                            <ExpandMore />
                                        )
                                    ) : (
                                        ""
                                    )
                                ) : (
                                    ""
                                )}
                            </ListItemButton>
                            <Collapse in={open === parent.label} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {parent.children.map((child, childIndex) => {
                                        return (
                                            <ListItemButton
                                                key={child.label}
                                                selected={selected === parent.label + child.label}
                                                sx={{ pl: 4 }}
                                                onClick={() => {
                                                    setSelected(parent.label + child.label);
                                                    navigate(child.route, { state: child.label });
                                                }}
                                            >
                                                <ListItemText primary={child.label} />
                                            </ListItemButton>
                                        );
                                    })}
                                </List>
                            </Collapse>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
}

export default React.memo(MenuList);