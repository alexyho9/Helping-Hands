import React from "react";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
const transitionStyle = {
  transitionDuration: "2s",
};
const CollapsibleRow = ({ isOpen, children, checked }) => {
  return (
    <Collapse
      in={isOpen || checked}
      timeout="auto"
      unmountOnExit
      style={{ ...transitionStyle, width: "100%" }}
    >
      <Box sx={{ height: 300 }} className="TransitionSubT">
        <Table>
          <TableBody>
            <tr>
              <td colSpan="5">{children}</td>
            </tr>
          </TableBody>
        </Table>
      </Box>
    </Collapse>
  );
};

export default CollapsibleRow;
