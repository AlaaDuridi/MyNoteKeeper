import {ISearchBarProps} from "./SearchBar.types.ts";
import {ChangeEvent, FC} from "react";
const SearchBar:FC<ISearchBarProps> =({value,onChange})=>{
    return(
        <input
            type="text"
            placeholder="Search notes..."
            value={value}
            onChange={(e:ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        />)
}
export default SearchBar;