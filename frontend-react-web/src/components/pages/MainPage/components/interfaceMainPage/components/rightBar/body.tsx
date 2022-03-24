import React from "react";

import { BottleNameContainer } from "./mapBottleNameContainer";
import { CategoryContainer } from "./mapCategoryContainer";
import { DescriptionContainer } from "./mapDescriptContainer";
import { SettingContainer } from "./mapSettingContainer";
import { PhotosContainer } from "./mapPhotosContainer";

export const RightBarBody:React.FC = React.memo(() => {
    return <div className="right-bar-map-body">
        <BottleNameContainer />
        <CategoryContainer />
        <DescriptionContainer />
        <SettingContainer />
        <PhotosContainer />
    </div>
})