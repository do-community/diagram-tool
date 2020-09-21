import { ReactSVG } from 'react-svg';
import { importNode } from './data';
import React from 'react';

const exportAndTransform = data => {
    // Strict typing.
    if (typeof data !== "object") throw new Error("The data needs to be a object."); 
    if (typeof data.description !== "string" || data.description === "") throw new Error("The description needs to exist.");
    if (typeof data.name !== "string" || data.name === "") throw new Error("The name needs to exist.");
    if (typeof data.id !== "string" || data.id === "") throw new Error("The ID needs to exist.");
    if (typeof data.iconUrl !== "string" || data.iconUrl === "") throw new Error("The icon URL needs to exist.");

    // Load the icon.
    const icon = <ReactSVG src={data.iconUrl} />;

    // Returns the transformed item.
    return {
        name: data.name,
        category: "Custom Components",
        description: data.description,
        metadata: {},
        behavior: {},
        icon,
        __FAST_RENDER: true,
        id: data.id,
    };
};

export default async url => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status code ${res.status} returned.`);
    const json = exportAndTransform(await res.json());
    importNode(json.id, json);
};
