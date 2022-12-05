import { Model } from 'src/models'

export enum SectionType {
  Trap = 'trap',
  Inline = 'inline'
}

export interface Section extends Model  {
  sectionIdx: number
  chapterIdx: number
  bookId: string
  trapId?: string
  text?: number
  type: SectionType
}
