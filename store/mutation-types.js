// 初期処理
export const INIT_DATA = 'INIT_DATA'
// カンバン移動
export const MOVE_KANBEN_TO_OTHER_BOARD = 'MOVE_KANBEN_TO_OTHER_BOARD'
// カンバン追加モーダル表示
export const SHOW_KANBAN_ADDING_MODAL = 'SHOW_KANBAN_ADDING_MODAL'
// カンバン追加モーダルクローズ
export const CLOSE_KANBAN_ADDING_MODAL = 'CLOSE_KANBAN_ADDING_MODAL'
// カンバン追加
export const ADD_NEW_KANBAN = 'ADD_NEW_KANBAN'
// カンバン詳細モーダル表示
export const SHOW_KANBAN_DETAILS_MODAL = 'SHOW_KANBAN_DETAILS_MODAL'
// カンバン詳細モーダルクローズ
export const CLOSE_KANBAN_DETAILS_MODAL = 'CLOSE_KANBAN_DETAILS_MODAL'
// カンバン情報更新
export const UPDATE_KANBAN = 'UPDATE_KANBAN'
// カンバン削除
export const DELETE_KANBAN = 'DELETE_KANBAN'
// カンバンのソート（期限）
export const SORT_KANBAN_BY_LIMIT_DESC = 'SORT_KANBAN_BY_LIMIT_DESC'
// ローカルストレージへのデータ保存
export const SAVE_DATA_TO_LOCALSTORAGE = 'SAVE_DATA_TO_LOCALSTORAGE'
// アラート状態の更新
export const UPDATE_ALERT_TYPE = 'UPDATE_ALERT_TYPE'

/**
 * アラートタイプ判定処理
 * @param {Date} limit 
 */
export const checkAlertType = (limit) => {
  const now = new Date();
  const diff = (now.getTime() - limit.getTime()) / (1000 * 60 * 60)

  if (diff > 0) {
    return 2
  } else if (diff < 0 && diff > -7) {
    return 1
  }
  return 0
}