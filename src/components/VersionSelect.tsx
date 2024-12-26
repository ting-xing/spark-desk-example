import {FC} from "react";
import {Select} from "antd";
import {Version} from "spark-desk";
import {SelectProps} from "rc-select/lib/Select";

const options: SelectProps['options'] = Object.values(Version).map(
    (value) => ({value: value, label: value}));

export const VersionSelect: FC<Pick<SelectProps<Version>, 'onSelect' | 'value'>> = (props) => {
return <Select options={options} {...props}>

</Select>
}