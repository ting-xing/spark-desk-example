import {useState} from 'react'
import {Welcome} from '@ant-design/x';
import './App.css'
import {App as AntdApp, Col, Divider, Form, Radio, Row, Space, Typography} from 'antd';
import {HttpSparkDeskConfig} from "./components/HttpSparkDeskConfig.tsx";
import {WebsocketSparkDeskConfig} from "./components/WebsocketSparkDeskConfig.tsx";
import {AbstractSparkDesk} from "../../spark-desk";
import {Chat} from "./components/Chat.tsx";


enum CallMode {
    HTTP,
    Websocket
}

function App() {
    const [callMode, setCallMode] = useState(CallMode.HTTP);

    const [sparkDesk, setSparkDesk] = useState<AbstractSparkDesk | null>(null)

    return (
        <AntdApp>
            <Row gutter={20}>
                <Col span={8}>
                    <Form.Item label="调用方式">
                        <Radio.Group onChange={e => setCallMode(e.target.value)}
                                     value={callMode}>
                            <Radio value={CallMode.HTTP}>HTTP</Radio>
                            <Radio value={CallMode.Websocket}>Websocket</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {
                        callMode === CallMode.HTTP && <HttpSparkDeskConfig onFinish={setSparkDesk}/>
                    }

                    {
                        callMode === CallMode.Websocket && <WebsocketSparkDeskConfig onFinish={setSparkDesk}/>
                    }

                    <Divider>相关项目</Divider>

                    <Space direction="vertical">
                        <Typography.Link href="https://xinghuo.xfyun.cn/spark"
                                         target="_blank">讯飞星火</Typography.Link>

                        <Typography.Link href="https://github.com/ting-xing/spark-desk"
                                         target="_blank">SparkDesk</Typography.Link>

                        <Typography.Link href="https://x.ant.design/index-cn" target="_blank">Ant DesIgn
                            X</Typography.Link>

                        <Typography.Link href="https://cn.vitejs.dev/" target="_blank">vite</Typography.Link>

                        <Typography.Link href="https://ant-design.antgroup.com/index-cn" target="_blank">Ant
                            Design</Typography.Link>
                    </Space>
                </Col>

                <Col span={16}>
                    {sparkDesk
                        ? <Chat sparkDesk={sparkDesk}/>
                        :
                        <Welcome
                            icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
                            title="欢迎来到 SparkDesk 样例"
                            description="请先配置各项参数后，点击<保存>开始"
                        />
                    }
                </Col>
            </Row>
        </AntdApp>
    )
}

export default App
