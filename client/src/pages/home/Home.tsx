import React, { FC, useEffect, useState } from 'react'
import LayoutBasic from '../../components/layoutBasic/LayoutBasic'
import { DownOutlined } from '@ant-design/icons'
import type { RadioChangeEvent } from 'antd'
import { Table, Form, Radio, Space, Switch } from 'antd'
import type { SizeType } from 'antd/es/config-provider/SizeContext'
import type { ColumnsType, TableProps } from 'antd/es/table'
import type { ExpandableConfig, TableRowSelection } from 'antd/es/table/interface'
import { useCurrentQuery, useGetAllWatersQuery } from '../../services/api.ts'
import { Water, User } from '../../models/types.ts'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Paths } from '../../routes/paths.ts'
import { useAppSelector } from '../../store/hooks.ts'
// import {selectUser} from '../../features/auth/authSlice'
import { useTransition, animated } from '@react-spring/web'


// interface DataType {
//   key: number;
//   name: string;
//   age: number;
//   address: string;
//   description: string;
// }

const Home: FC = () => {
  const { data, isLoading } = useGetAllWatersQuery()
  const { user  } = useAppSelector(state => state.authReducer)
  const navigate = useNavigate()
  const location = useLocation()
  // const user = useAppSelector(selectUser)


  const transitions = useTransition(location, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 500 },
  })


  const [bordered, setBordered] = useState(false)
  // const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<SizeType>('large')
  // const [expandable, setExpandable] = useState<ExpandableConfig<WaterPage> | undefined>(
  //   defaultExpandable,
  // );
  // const [showTitle, setShowTitle] = useState(false);
  // const [showHeader, setShowHeader] = useState(true);
  // const [showfooter, setShowFooter] = useState(true);
  const [rowSelection, setRowSelection] = useState<TableRowSelection<Water> | undefined>({})
  const [hasData, setHasData] = useState(true)
  // const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState<TablePaginationPosition | 'none'>('none')
  const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight')
  const [ellipsis, setEllipsis] = useState(false)
  const [yScroll, setYScroll] = useState(true)
  const [xScroll, setXScroll] = useState<string>()

  const defaultExpandable = { expandedRowRender: (record: Water) => <p>{record.description}</p> }
  const defaultTitle = () => 'Here is title'
  const defaultFooter = () => 'Here is footer'


  type TablePaginationPosition =
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight';

  const columns: ColumnsType<Water> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'BRAND',
      dataIndex: 'brand',
      key: 'brand',
      width: '130px',
      // sorter: true,
      // filters: [
      //   {text: `text`, value: `value`},
      //   {text: 'brand', value: 'brand'}
      // ],
      // onFilter: (value, record) => record.brand.indexOf(value as string) === 0,
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      key: 'description',
    },
    // {
    //   title: 'DETAILS',
    //   dataIndex: 'details',
    //   key: 'details'
    // },
    {
      title: 'PRICE',
      dataIndex: 'price',
      key: 'price',
      width: '80px',
    },
    {
      title: 'IMAGE',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (value, record, index) => (
        <Space size='small'>
          <img style={{ width: '100px', height: '100px' }} src={record.imageUrl} alt='' />
        </Space>
      ),
    },
    {
      title: 'USER',
      dataIndex: 'user',
      key: 'user',
      width: '150px',
      render: () =>
        <Space
          style={{ backgroundColor: '#1677ff', color: 'white', fontWeight: 'lighter', padding: '5px' }}>
          {user && user.name }
        </Space>,
    },
    {
      title: 'Action',
      key: 'action',
      width: '200px',
      render: () => (
        <Space size='middle'>
          <a>Details</a>
        </Space>
      ),
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   sorter: true,
    //   render: () => (
    //     <Space size="middle">
    //       <a>Delete</a>
    //       <a>
    //         <Space>
    //           More actions
    //           <DownOutlined />
    //         </Space>
    //       </a>
    //     </Space>
    //   ),
    // },
  ]

  // const data: DataType[] = [];
  // for (let i = 1; i <= 10; i++) {
  //   data.push({
  //     key: i,
  //     name: 'John Brown',
  //     age: Number(`${i}2`),
  //     address: `New York No. ${i} Lake Park`,
  //     description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  //   });
  // }

  const handleBorderChange = (enable: boolean) => {
    setBordered(enable)
  }

  // const handleLoadingChange = (enable: boolean) => {
  //   setLoading(enable);
  // };

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value)
  }

  // const handleTableLayoutChange = (e: RadioChangeEvent) => {
  //   setTableLayout(e.target.value);
  // };

  // const handleExpandChange = (enable: boolean) => {
  //   setExpandable(enable ? defaultExpandable : undefined);
  // };

  const handleEllipsisChange = (enable: boolean) => {
    setEllipsis(enable)
  }

  // const handleTitleChange = (enable: boolean) => {
  //   setShowTitle(enable);
  // };

//   const handleHeaderChange = (enable: boolean) => {
//     setShowHeader(enable);
//   };

  // const handleFooterChange = (enable: boolean) => {
  //   setShowFooter(enable);
  // };

  const handleRowSelectionChange = (enable: boolean) => {
    setRowSelection(enable ? {} : undefined)
  }

  const handleYScrollChange = (enable: boolean) => {
    setYScroll(enable)
  }

  const handleXScrollChange = (e: RadioChangeEvent) => {
    setXScroll(e.target.value)
  }

  // const handleDataChange = (newHasData: boolean) => {
  //   setHasData(newHasData);
  // };

  const scroll: { x?: number | string; y?: number | string } = {}
  if (yScroll) {
    scroll.y = 600
  }
  if (xScroll) {
    scroll.x = '100vw'
  }

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }))
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true
    tableColumns[tableColumns.length - 1].fixed = 'right'
  }

  const tableProps: TableProps<Water> = {
    bordered,
    // loading,
    size,
    // expandable,
    // title: showTitle ? defaultTitle : undefined,
    // showHeader,
    // footer: showfooter ? defaultFooter : undefined,
    rowSelection,
    scroll,
    // tableLayout,
  }

  const addNewWater = () => {
    navigate(Paths.waterAdd)
  }

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/')
  //   }
  // }, [navigate, user])

  return (transitions((style) =>
    <LayoutBasic>
      <animated.div style={style}>
        <Form
          layout='inline'
          className='components-table-demo-control-bar'
          style={{ margin: '0px 20px 10px 20px', background: 'lightgray', padding: '5px 0 5px 350px' }}
        >
          <Form.Item label='Bordered'>
            <Switch checked={bordered} onChange={handleBorderChange} />
          </Form.Item>

          {/*<Form.Item label="loading">*/}
          {/*  <Switch checked={loading} onChange={handleLoadingChange} />*/}
          {/*</Form.Item>*/}
          {/*<Form.Item label="Title">*/}
          {/*  <Switch checked={showTitle} onChange={handleTitleChange} />*/}
          {/*</Form.Item>*/}
          {/*<Form.Item label="Column Header" >*/}
          {/*<Switch checked={showHeader} onChange={handleHeaderChange} />*/}
          {/*<Switch checked={showHeader} />*/}
          {/*</Form.Item>*/}
          {/*<Form.Item label="Footer">*/}
          {/*  <Switch checked={showfooter} onChange={handleFooterChange} />*/}
          {/*</Form.Item>*/}
          {/*<Form.Item label="Expandable">*/}
          {/*  <Switch checked={!!expandable} onChange={handleExpandChange} />*/}
          {/*</Form.Item>*/}

          <Form.Item label='Checkbox'>
            <Switch checked={!!rowSelection} onChange={handleRowSelectionChange} />
          </Form.Item>

          <Form.Item label='Fixed Header'>
            <Switch checked={!!yScroll} onChange={handleYScrollChange} />
          </Form.Item>
          {/*<Form.Item label="Has Data">*/}
          {/*  <Switch checked={!!hasData} onChange={handleDataChange} />*/}
          {/*</Form.Item>*/}

          <Form.Item label='Short'>
            <Switch checked={!!ellipsis} onChange={handleEllipsisChange} />
          </Form.Item>
          <Form.Item label='Size'>
            <Radio.Group value={size} onChange={handleSizeChange}>
              <Radio.Button value='large'>Large</Radio.Button>
              <Radio.Button value='middle'>Middle</Radio.Button>
              <Radio.Button value='small'>Small</Radio.Button>
            </Radio.Group>
          </Form.Item>

          {/*<Form.Item label="Table Scroll">*/}
          {/*  <Radio.Group value={xScroll} onChange={handleXScrollChange}>*/}
          {/*    <Radio.Button value={undefined}>Unset</Radio.Button>*/}
          {/*    <Radio.Button value="scroll">Scroll</Radio.Button>*/}
          {/*    <Radio.Button value="fixed">Fixed Columns</Radio.Button>*/}
          {/*  </Radio.Group>*/}
          {/*</Form.Item>*/}
          {/*<Form.Item label="Table Layout">*/}
          {/*  <Radio.Group value={tableLayout} onChange={handleTableLayoutChange}>*/}
          {/*    <Radio.Button value={undefined}>Unset</Radio.Button>*/}
          {/*    <Radio.Button value="fixed">Fixed</Radio.Button>*/}
          {/*  </Radio.Group>*/}
          {/*</Form.Item>*/}
          {/*<Form.Item label="Pagination Top">*/}
          {/*  <Radio.Group*/}
          {/*    value={top}*/}
          {/*    onChange={(e) => {*/}
          {/*      setTop(e.target.value);*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <Radio.Button value="topLeft">TopLeft</Radio.Button>*/}
          {/*    <Radio.Button value="topCenter">TopCenter</Radio.Button>*/}
          {/*    <Radio.Button value="topRight">TopRight</Radio.Button>*/}
          {/*    <Radio.Button value="none">None</Radio.Button>*/}
          {/*  </Radio.Group>*/}
          {/*</Form.Item>*/}

          <Form.Item label=''>
            <Radio.Group
              value={bottom}
              onChange={(e) => {
                setBottom(e.target.value)
              }}
            >
              {/*<Radio.Button value="bottomLeft">BottomLeft</Radio.Button>*/}
              {/*<Radio.Button value="bottomCenter">BottomCenter</Radio.Button>*/}
              {/*<Radio.Button value="bottomRight">BottomRight</Radio.Button>*/}
              {/*<Radio.Button value="none">None</Radio.Button>*/}
            </Radio.Group>
          </Form.Item>

          <Form.Item label='ADD NEW'>
            <Radio.Button
              style={{ background: '#1677ff', color: 'white' }}
              value='large'
              onClick={addNewWater}
            >Add
            </Radio.Button>
          </Form.Item>

        </Form>
        <Table style={{ margin: '0 20px 0 20px', opacity: '0.9', fontWeight: 'bold' }}
               {...tableProps}
               pagination={{ position: [top as TablePaginationPosition, bottom] }}
               columns={tableColumns}
               loading={isLoading}
               dataSource={hasData ? data : []}
               rowKey={(record) => record.id}
               onRow={(record) => {
                 return { onClick: () => navigate(`${Paths.water}/${record.id}`) }
               }}
               scroll={scroll}
        />
      </animated.div>

      {/*<Table style={{opacity: '0.85'}}*/}
      {/*  loading={isLoading}*/}
      {/*  dataSource={data}*/}
      {/*  pagination={false}*/}
      {/*  columns={columnsWater}*/}
      {/*  rowKey={(record) => record.id}*/}
      {/*  onRow={(record) => {*/}
      {/*    return { onClick: () => navigate(`${Paths.water}/${record.id}`) }*/}
      {/*  }}*/}
      {/*/>*/}

    </LayoutBasic>,
  ))
}

export default Home