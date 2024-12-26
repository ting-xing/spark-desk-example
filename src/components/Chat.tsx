import {FC, useMemo, useState} from "react";
import {Bubble, Sender, SenderProps} from "@ant-design/x";
import {App, Avatar, Flex} from "antd";
import {AbstractSparkDesk, Role} from "spark-desk";


export interface ChatProps {
    sparkDesk: AbstractSparkDesk
}

export const Chat: FC<ChatProps> = (props) => {
    const {message} = App.useApp();

    const [loading, setLoading] = useState(false)

    const [value, setValue] = useState('');

    const BubbleList = useMemo<Array<{ content: string, role: Role, sid: string }>>(() => [], [props.sparkDesk])

    const user = useMemo(() => props.sparkDesk.createUser('spark-desk-example'), [props.sparkDesk]);

    const onSubmit: SenderProps['onSubmit'] = async () => {
        const content = value;
        setValue('');
        setLoading(true);
        try {
            message.info('Send message!');

            BubbleList.push({
                content,
                role: Role.User,
                sid: BubbleList.length.toString(),
            })

            await user.speak(content).then(answer => {
                BubbleList.push({
                    content: answer.content,
                    role: Role.Assistant,
                    sid: answer.sid
                })
            })
        } catch (e) {
            if (e instanceof Error) {
                message.error(e.message)
            } else {
                message.error("系统错误")
            }
        } finally {
            setLoading(false);
        }


    }

    const onCancel: SenderProps['onCancel'] = () => {
        setLoading(false);
        message.error('Cancel sending!');
    }

    return <Flex gap="middle" vertical>


        <Bubble
            placement='start'
            content={`正在使用 ${props.sparkDesk.version} 版本`}
            avatar={<Avatar src="https://xinghuo.xfyun.cn/spark-icon.ico"/>}
        ></Bubble>

        {
            BubbleList.map((bubble) => <Bubble key={bubble.sid}
                                               placement={bubble.role === Role.Assistant ? 'start' : 'end'}
                                               content={bubble.content}
                                               avatar={
                                                   bubble.role === Role.Assistant
                                                       ? <Avatar src="https://xinghuo.xfyun.cn/spark-icon.ico"/>
                                                       : <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"/>
                                               }
            ></Bubble>)
        }

        <Sender
            loading={loading}
            value={value}
            onChange={(v) => {
                setValue(v);
            }}
            onSubmit={onSubmit}
            onCancel={onCancel}
        />
    </Flex>
}