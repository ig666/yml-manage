export const columns = [
    {
        title: '姓名',
        dataIndex: 'account'
    },
    {
        title: '性别',
        dataIndex: 'gender',
        slots: { customRender: 'gender' }
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        slots: { customRender: 'createTime' }
    },
    {
        title: '操作',
        slots: { customRender: 'action' }
    }
]