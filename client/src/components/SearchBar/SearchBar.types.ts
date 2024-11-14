import {Dispatch, SetStateAction}   from "react";

export interface  ISearchBarProps {
    value:string | undefined;
    onChange : Dispatch<SetStateAction<string|undefined>>;
}