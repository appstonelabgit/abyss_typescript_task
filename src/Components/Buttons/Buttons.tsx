import { ButtonGroup, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
    IoCheckmarkDoneCircleSharp,
    IoCloseCircleSharp,
} from "react-icons/io5";

type buttonProps = {
    confirm: any,
    add: any,
    obj: any,
    edit: any,
    close: any,
    parent_obj: any,
    cancle: any,
    idx: any,
}

function Buttons({
    confirm,
    add,
    obj,
    edit,
    close,
    parent_obj,
    cancle,
    idx,
}: buttonProps) {

    return (
        <div>
            <div>
                <Stack direction="row">
                    <ButtonGroup
                        size="large"
                        variant="text"
                        orientation="horizontal"
                        color="secondary"
                        style={{ margin: "auto", gap: "5px", marginRight: "3px" }}
                        aria-label="alignment button group"
                    >
                        {!obj.is_edit ? (
                            <>
                                {" "}
                                <AddCircleOutlineIcon
                                    style={{ cursor: "pointer" }}
                                    fontSize="medium"
                                    onClick={() => {
                                        console.log("parent", parent_obj);
                                        add(obj, parent_obj);
                                    }}
                                    color="secondary"
                                />
                                {obj.name != "level_1" ? (
                                    <EditIcon
                                        style={{ cursor: "pointer" }}
                                        fontSize="medium"
                                        onClick={() => {
                                            edit(obj);
                                        }}
                                        color="primary"
                                    />
                                ) : null}
                                {obj.name != "level_1" ? (
                                    <CloseIcon
                                        style={{ cursor: "pointer" }}
                                        fontSize="medium"
                                        onClick={() => {
                                            close(parent_obj, idx);
                                        }}
                                        color="warning"
                                    />
                                ) : null}
                            </>
                        ) : (
                            <>
                                <IoCheckmarkDoneCircleSharp
                                    size={20}
                                    onClick={() => confirm(obj)}
                                    style={{ cursor: "pointer", color: 'green' }}
                                />
                                <IoCloseCircleSharp
                                    size={20}
                                    onClick={() => cancle(parent_obj, idx)}
                                    style={{ cursor: "pointer", color: 'yellow' }}
                                />
                            </>
                        )}

                    </ButtonGroup>
                </Stack>
            </div>
        </div>
    );
}

export default Buttons;
