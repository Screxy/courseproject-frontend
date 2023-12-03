import './App.css'
import {Table} from 'antd'
import {ColumnsType} from 'antd/lib/table'
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}
const dataSource: DataType[] = [
  {
    key: '1',
    name: 'Леша',
    age: 22,
    address: '800-летия Москвы 28к1',
  },
  {
    key: '2',
    name: 'Миша',
    age: 19,
    address: 'Юбилейная 7к1',
  },
  {
    key: '3',
    name: 'Маша',
    age: 18,
    address: 'Николяна 612',
  },
  {
    key: '4',
    name: 'Кирилл',
    age: 23,
    address: 'Парк Победы 1',
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Возраст',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: 'address',
  },
];
function App() {
  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default App
