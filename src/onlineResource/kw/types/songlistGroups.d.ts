export interface SonglistGroup {
  label: string
  list: List[]
  mdata: string
  mdigest: string
  mid: string
  type: string
}

export interface List {
  desc: string
  digest: string
  id: string
  img: string
  name: string
  pc_new_focus: string
  publish: string
  type: string
  extend?: string
}
