import React, { CSSProperties, FC } from 'react'
import { Button, Form } from 'antd'

type Props = {
  children: React.ReactNode,
  htmlType?: 'button' | 'submit' | 'reset' | undefined,
  onClick?: () => void | undefined,
  type?: 'link' | 'text' | 'default'| 'ghost' | 'primary' | 'dashed' | undefined,
  danger?: boolean | undefined,
  loading?: boolean | { delay?: number | undefined } | undefined,
  shape?: 'default' | 'circle' | 'round' | undefined,
  icon?: React.ReactNode,
  style?: CSSProperties | undefined;
  disabled?: boolean | undefined
}

const ButtonOne: FC<Props> = ({ children, htmlType, type, danger, loading, shape, icon, onClick, style, disabled }) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        // @ts-ignore
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
        style={style}
        disabled={disabled}
      >
        {children}
      </Button>
    </Form.Item>
  )
}

export default ButtonOne