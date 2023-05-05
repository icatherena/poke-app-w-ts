import React, { useEffect, useState } from "react";
import { Fab, Tooltip} from "@mui/material";
/* import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'; */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const FloatingButton = ({pokemon, pokeId, type}: any) => {
  const [redirectUrl, setRedirectUrl] = useState<string>();
  const [icon, setIcon] = useState<any>();
  const [tooltipName, setTooltipName] = useState<string>();

  useEffect(() => {
    if (type === "next") {
      setRedirectUrl(`/descripcion/${parseInt(pokeId) + 1}`);
      setIcon(<NavigateNextIcon fontSize="large" color="primary" />);
      setTooltipName("Siguiente");
    } else if (type === "prev") {
      setRedirectUrl(`/descripcion/${parseInt(pokeId) - 1}`);
      setIcon(<NavigateBeforeIcon fontSize="large" color="primary" />);
      setTooltipName("Anterior");
    } else if (type === "list") {
      setRedirectUrl(`/lista`)
      setIcon(<ArrowBackIcon fontSize="small" color="primary" />);
      setTooltipName("Volver a la lista");
    }
  }, [pokemon]);

  return (
    <Tooltip title={tooltipName} arrow>
      <Fab size="small" href={redirectUrl}>
        {icon}
      </Fab>
    </Tooltip>
  );
};

export default FloatingButton;
