import React from "react";
import {
    Button,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
} from "@mui/material";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import zoomVal from "../../Constants/zoomVal";



export default function Navbar() {
    //All State Here
    const [zoom_Val, setZoom_Val] = React.useState(100);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    //All Functions Here
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        if ((event.target as HTMLInputElement).value) {
            setZoom_Val(Number((event.target as HTMLInputElement).value));
        }
        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    //Use Effect Here
    React.useEffect(() => {
        let elm = document.getElementById("parent_ul") as any;
        if (elm && elm.style) {

            elm.style.zoom = zoom_Val + '%';
        }
    }, [zoom_Val]);

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }
        prevOpen.current = open;
    }, [open]);


    return (
        <div className="main_header">
            <div className="child_header">
                <div className="header_serivce">Services</div>
                <div className="button_group">
                    <div>
                        <Button variant="contained" size="medium">
                            List View
                        </Button>
                    </div>
                    <div>
                        <Button variant="outlined" style={{ padding: "8px" }}>
                            <LocationSearchingIcon />
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="outlined"
                            onClick={() =>
                                setZoom_Val((data) => (data <= 140 ? data + 10 : data))
                            }
                        >
                            +
                        </Button>
                        <Button
                            ref={anchorRef}
                            id="composition-button"
                            aria-controls={open ? "composition-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            variant="outlined"
                        >
                            {zoom_Val}%
                        </Button>
                        <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            placement="bottom-start"
                            transition
                            disablePortal
                            style={{ zIndex: "100" }}
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === "bottom-start"
                                                ? "left top"
                                                : "left bottom",
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList
                                                autoFocusItem={open}
                                                id="composition-menu"
                                                aria-labelledby="composition-button"
                                                onKeyDown={handleListKeyDown}
                                            >
                                                {zoomVal.map((data) => {
                                                    return (
                                                        <MenuItem onClick={handleClose} value={data}>
                                                            {data}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                        <Button
                            variant="outlined"
                            onClick={() =>
                                setZoom_Val((data) => (data >= 25 ? data - 10 : data))
                            }
                        >
                            -
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}