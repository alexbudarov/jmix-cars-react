import React from "react";
import ModelEditor from "./ModelEditor";
import ModelList from "./ModelList";
import { MasterDetailManager } from "@haulmont/jmix-react-antd";
import { registerEntityList } from "@haulmont/jmix-react-web";
import { observer } from "mobx-react";

const ENTITY_NAME = "Model";
const ROUTING_PATH = "/modelScreen";

const ModelScreen = observer(() => {
  return (
    <MasterDetailManager editor={<ModelEditor />} browser={<ModelList />} />
  );
});

registerEntityList({
  component: ModelScreen,
  caption: "screen.ModelScreen",
  screenId: "ModelScreen",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: `${ROUTING_PATH}/:entityId?`,
    menuLink: ROUTING_PATH
  }
});

export default ModelScreen;
