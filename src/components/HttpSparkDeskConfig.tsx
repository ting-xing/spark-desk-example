import {FC} from "react";
import {Alert, Button, Form, Input, message, Space, Typography} from "antd";
import {VersionSelect} from "./VersionSelect.tsx";
import {AbstractSparkDesk, HttpSparkDesk} from "spark-desk";
import {getInitialValues} from "../utils/getInitialValues.ts";

export interface HttpSparkDeskConfigProps {
    onFinish: (sparkDesk: AbstractSparkDesk) => void;
}

// 配置 http 风格
export const HttpSparkDeskConfig: FC<HttpSparkDeskConfigProps> = (props) => {

    const [form] = Form.useForm()

    function onSave() {
        const options = form.getFieldsValue();

        localStorage.setItem(`HttpSparkDeskConfig`, JSON.stringify(options))

        props.onFinish(new HttpSparkDesk(options));
    }

    function onReset() {
        form.resetFields();
    }

    async function setLocalProxy() {
        if (import.meta.env.DEV) {
            form.setFieldValue('url', '/v1/chat/completions')
        } else {
            await message.warning("仅开发模式可用")
        }
    }

    return <Form form={form} initialValues={getInitialValues('HttpSparkDeskConfig')}>
        <Form.Item label="APIPassword" name="APIPassword" required={true}>
            <Input></Input>
        </Form.Item>
        <Form.Item label="version" name="version" required={true}>
            <VersionSelect></VersionSelect>
        </Form.Item>
        <Form.Item label="url" name="url">
            <Input suffix={<Button onClick={() => setLocalProxy()}>使用本地代理</Button>}></Input>
        </Form.Item>

        <Form.Item>
            <Space>
                <Button type={'primary'} onClick={() => onSave()}>保存</Button>
                <Button type={'default'} onClick={() => onReset()}>重置</Button>
            </Space>
        </Form.Item>

        <Alert type='warning' message="HTTP 方式受浏览器跨域影响不可使用" closable description={
            <div style={{textAlign: "left"}}>
                <p>1.尝试安装插件、关闭浏览器安全策略等方式解决跨域问题</p>
                <p>2.clone <Typography.Link href="https://github.com/ting-xing/spark-desk-example" target="_blank">本项目</Typography.Link>，本地 dev 方式启动，可使用 vite 反向代理</p>
                <p>3.使用其他反向代理并覆盖默认 url</p>
                <p>4.其他方案</p>
            </div>
        }></Alert>
    </Form>
}