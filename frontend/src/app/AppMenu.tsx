import { MenuProps } from "antd";
import React from "react";
import { VerticalMenu, MenuItem, AddonsMenu } from "@haulmont/jmix-react-antd";
import { BarsOutlined, HomeOutlined } from "@ant-design/icons";

export interface AppMenuProps extends MenuProps {}

export const AppMenu = (props: AppMenuProps) => {
  return (
    <VerticalMenu {...props}>
      <MenuItem
        screenId="HomePage"
        icon={<HomeOutlined />}
        caption={"screen.home"}
        key={"home"}
      />
      <MenuItem
        screenId={"UserList"}
        icon={<BarsOutlined />}
        caption={"screen.UserList"}
        key={"9d4ac774-39ed-49a4-a048-6dcfc41ab53e"}
      />
      <MenuItem
        screenId={"ModelScreen"}
        icon={<BarsOutlined />}
        caption={"screen.ModelScreen"}
        key={"610c9eee-fb5e-40c2-8733-5e860650c9f5"}
      />
      <MenuItem
        screenId={"CarList"}
        icon={<BarsOutlined />}
        caption={"screen.CarList"}
        key={"d1565a35-0caa-49dc-a8b7-265cf2ee35c2"}
      />
      <AddonsMenu key={"addonsMenu"} />
    </VerticalMenu>
  );
};
