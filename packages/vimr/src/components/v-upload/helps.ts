import type { Ref } from 'vue'
import type { UploadCustomRequestOptions, UploadFileInfo } from './props'
export const isImage = (file: File) => {
  return file.type.indexOf('image') === 0
}
export const getThumbnail = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      resolve(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}
export const changeStatus = (fileList: Ref<UploadFileInfo[]>, id: string, status: UploadFileInfo['status']) => {
  const index = fileList.value.findIndex(fi => fi.id === id)
  if (index > -1)
    fileList.value[index].status = status
}
export const defaultUploadRequest = (options: UploadCustomRequestOptions) => {

}
