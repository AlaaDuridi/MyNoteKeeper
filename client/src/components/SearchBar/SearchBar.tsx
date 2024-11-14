import { FC, ChangeEvent } from "react";
import { AppBar, Toolbar, Typography, TextField, Box } from "@mui/material";
import { ISearchBarProps } from "./SearchBar.types";

const SearchBar: FC<ISearchBarProps> = ({ value, onChange }) => {
    return (
        <AppBar position="static" color="primary" elevation={1}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My Note Keeper
                </Typography>
                <Box sx={{ flexGrow: 1, maxWidth: 500 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search notes..."
                        value={value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: 1,
                        }}
                        InputProps={{
                            style: {
                                height: "40px",
                            },
                        }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default SearchBar;
