import React, { useEffect, useState } from "react";
import {
  Link,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  PaginationItem,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const BasicTable = ({ pokemon, page, count }) => {
  const [listPokemon, setListPokemon] = useState(pokemon);

  useEffect(() => {
    setListPokemon(pokemon);
  }, [pokemon]);

  return (
    <Grid
      container
      p="2em"
      sx={{
        justifyContent: "center",
      }}
    >
      <Grid item xs={12}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: ".5em",
            border: "1px solid rgb(39,114,185)",
          }}
        >
          <Table
            sx={{
              minWidth: 600,
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Nombre del Pokemón</TableCell>
                <TableCell align="center">Descripción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listPokemon.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <Link
                      to={`/descripcion/${/* spliceUrl(row.url) */ row.name}/`}
                    >
                      <OpenInNewIcon
                        fontSize="small"
                        sx={{
                          color: "rgb(52, 105, 165)",
                          "&:hover": {
                            color: "rgb(36,73,115)",
                            weight: "bold",
                          },
                        }}
                      />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <Pagination
            sx={{
              padding: ".7em",
              borderTop: "1px solid rgb(225, 225, 225)",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
            page={props.page}
            count={Math.ceil(props.count / 20)}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`${item.page === 1 ? "" : `?pagina=${item.page}`}`}
                {...item}
              />
            )}
          /> */}
          <Pagination
            sx={{
              padding: ".7em",
              borderTop: "1px solid rgb(225, 225, 225)",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
            page={page}
            count={count}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/lista${item.page === 1 ? "" : `?pagina=${item.page}`}`}
                {...item}
              />
            )}
          />
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default BasicTable;

/* function PaginationLink() {
  return (
    <MemoryRouter initialEntries={[]} initialIndex={0}>
      <Routes>
        <Route path="*" element={<BasicTable />} />
      </Routes>
    </MemoryRouter>
  );
} */
