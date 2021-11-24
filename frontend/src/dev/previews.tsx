import React from "react";
import CarList from "../app/cars/CarList";
import CarEditor from "../app/cars/CarEditor";
import ModelScreen from "../app/models/ModelScreen";
import UserList from "../app/user/UserList";
import { Previews, ComponentPreview } from "@haulmont/react-ide-toolbox";

export const ComponentPreviews = () => {
  return (
    <Previews>
      <ComponentPreview path="/UserList">
        <UserList />
      </ComponentPreview>
      <ComponentPreview path="/ModelScreen">
        <ModelScreen />
      </ComponentPreview>
      <ComponentPreview path="/CarEditor">
        <CarEditor />
      </ComponentPreview>
      <ComponentPreview path="/CarList">
        <CarList />
      </ComponentPreview>
    </Previews>
  );
};
