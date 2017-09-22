import React from "react";
import {getAll} from "./api/api";
import classNames from "classnames";


export const Menu = ({items, onClick}) =>(
	<ul className = "ulMenu">
		{items.map(({id, title, key, isActive}) => (
			<li className = {classNames("itemLi", {"activeLi": isActive})} key = {key}>
				 <a href = "" onClick = {e => {
				 		e.preventDefault();
				 		onClick(id);
				}}>{title}</a>
			</li>
		))}	
	</ul>
);