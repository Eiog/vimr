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
export const changePercentage = (fileList: Ref<UploadFileInfo[]>, id: string, percentage: number) => {
  const index = fileList.value.findIndex(fi => fi.id === id)
  if (index > -1)
    fileList.value[index].percentage = percentage
}
export const defaultUploadRequest = ({ file, action, data, headers, name, onFinish, onError, onProgress }: UploadCustomRequestOptions) => {
  const formData = new FormData()
  formData.append(name ?? 'file', file.file)
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
  }
  const xhr = new XMLHttpRequest()
  xhr.open('post', action, true)
  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      console.error(new Error(xhr.statusText), xhr)
      onError()
    }
    else {
      onFinish()
    }
    xhr.onerror = () => {
      console.error(new Error(xhr.statusText), xhr)
      onError()
    }
    if (onProgress && xhr.upload) {
      xhr.upload.onprogress = (e) => {
        onProgress({ percent: e.loaded / e.total * 100 })
      }
    }
    if (headers) {
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })
    }
  }
  xhr.send(formData)
}
