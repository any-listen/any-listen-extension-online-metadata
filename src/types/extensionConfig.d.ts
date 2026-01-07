type Grant = 'internet' | 'player' | 'music_list'
type ResourceAction =
  | 'tipSearch'
  | 'hotSearch'
  | 'musicSearch'
  | 'musicPic'
  | 'musicLyric'
  | 'musicUrl'
  | 'songlistSearch'
  | 'songlist'
  | 'leaderboard'
  | 'albumSearch'
  | 'album'
  | 'singerSearch'
  | 'singer'
  | 'musicPicSearch'
  | 'lyricSearch'
  | 'lyricDetail'

interface FormBase {
  field: string
  name: string
  description: string
}
interface FormInput extends FormBase {
  type: 'input'
  textarea?: boolean
  default: string
}
interface FormBoolean extends FormBase {
  type: 'boolean'
  default: boolean
}
interface FormSelection extends FormBase {
  type: 'selection'
  default: string
  enum: string[]
  enumName: string[]
}
type FormValue<T extends FormItems> = T & { value?: T['default'] }
type FormValueItem = FormValue<FormInput> | FormValue<FormBoolean> | FormValue<FormSelection>
type FormItems = FormInput | FormBoolean | FormSelection
interface ListProvider {
  id: string
  name: string
  description: string
  form: FormItems[]
}

export interface Manifest {
  id: string
  name: string
  description?: string
  icon?: string
  version: string
  target_engine?: string
  author?: string
  homepage?: string
  license?: string
  categories?: string[]
  tags?: string[]
  grant?: Grant[]
  contributes?: {
    resource?: Array<{
      id: string
      name: string
      resource: ResourceAction[]
    }>
    listProviders?: ListProvider[]
    settings?: FormItems[]
  }
  download_url_template?: string
}
