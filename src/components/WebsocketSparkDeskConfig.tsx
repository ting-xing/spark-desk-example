import {FC} from "react";
import {Button, Form, Input, Space, Switch} from "antd";
import {VersionSelect} from "./VersionSelect.tsx";
import {AbstractSparkDesk, WebsocketSparkDesk} from "spark-desk";
import {getInitialValues} from "../utils/getInitialValues.ts";

export interface WebsocketSparkDeskConfigProps {
    onFinish: (sparkDesk: AbstractSparkDesk) => void;
}

export const WebsocketSparkDeskConfig: FC<WebsocketSparkDeskConfigProps> = (props) => {
    const [form] = Form.useForm()

    function onSave() {

        const options = form.getFieldsValue();

        localStorage.setItem(`WebsocketSparkDeskConfig`, JSON.stringify(options))

        props.onFinish(new WebsocketSparkDesk(options));
    }

    function onReset() {
        form.resetFields();
    }


    return <Form form={form} initialValues={getInitialValues('WebsocketSparkDeskConfig')}>
        <Form.Item label="APPID" name="APPID" required={true}>
            <Input></Input>
        </Form.Item>
        <Form.Item label="APISecret" name="APISecret" required={true}>
            <Input></Input>
        </Form.Item>
        <Form.Item label="APIKey" name="APIKey" required={true}>
            <Input></Input>
        </Form.Item>
        <Form.Item label="version" name="version" required={true}>
            <VersionSelect></VersionSelect>
        </Form.Item>
        <Form.Item label="noEncryption" name="noEncryption">
            <Switch></Switch>
        </Form.Item>

        <Form.Item>
            <Space>
                <Button type={'primary'} onClick={() => onSave()}>保存</Button>
                <Button type={'default'} onClick={() => onReset()}>重置</Button>
            </Space>
        </Form.Item>
    </Form>
}