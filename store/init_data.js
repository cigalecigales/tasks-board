// 初期データ
export const initData = {
  add_kanban: {
      modal: false,
      targetBoardId: null,
  },
  kanban_details: {
      modal: false,
      targetBoardId: null,
      targetKanban: null,
  },
  boards: [
      {
          id: 1,
          name: 'TODO',
          kanbans: [],
      },
      {
          id: 2,
          name: 'DOING',
          kanbans: [],
      },
      {
          id: 3,
          name: 'DONE',
          kanbans: [],
      },
  ],
}