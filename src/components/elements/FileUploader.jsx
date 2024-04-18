import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

export default function FileUploader({ setFiles, mediaUrl }) {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles);
    setFiles([...acceptedFiles]);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]));
  }, [file]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.svg', '.jpeg']
    }
  })

  return (
    <div {...getRootProps()}  className=' w-full border border-border rounded-md flex justify-center items-center cursor-pointer'>
      <input {...getInputProps()} className='' />
      {
        fileUrl ? (
          <div className='p-4 w-full flex flex-col gap-2 justify-center items-center'>
            <img
              src={fileUrl}
              className=' w-[90%] rounded-md'
            />
            <div className=' w-full text-center'>
              {file.map((img) => {
                return (
                  <div key={img.name}>
                    {img.name}
                  </div>
                )
              })}
            </div>
            <div className=' w-full bg-secondary text-center p-2 rounded-md'>
              Click or drag photo to replace
            </div>
          </div>
        ) : (
          <div className='p-8 flex flex-col gap-4 justify-center items-center'>
            <img
              src='/images/add-file.svg'
              alt='add file icon'
              className=' w-14'
            />
            <div className=' flex gap-2 flex-col justify-center items-center'>
              <div className=' text-xl'>
                Add your images here!
              </div>
              <div className=' text-primary/50 text-base'>
                SVG, PNG, JPG, JPEG
              </div>
              <div className=' w-full bg-secondary text-center p-2 rounded-md'>
                Click or drag to add photo
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
