export const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    slots: { customRender: 'gender' },
  },
  {
    title: '电话',
    dataIndex: 'phone',
  },
  {
    title: '机构',
    dataIndex: 'clinic',
  },
  {
    title: '学期',
    dataIndex: 'semesters',
    slots: { customRender: 'semesters' },
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
  },
];
