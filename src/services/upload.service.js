export const uploadService = {
  uploadImg,
}

async function uploadImg(ev) {
  const CLOUD_NAME = 'dcaqp34xm'
  const UPLOAD_PRESET = 'xvfatxk1'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData()
  formData.append('file', ev.target.files[0])
  formData.append('upload_preset', UPLOAD_PRESET)

  try {
    const res = await fetch(UPLOAD_URL, { method: 'POST', body: formData })
    console.log('res:', res)
    const { url } = await res.json()
    return url
  } catch (err) {
    console.error(err)
  }
}
