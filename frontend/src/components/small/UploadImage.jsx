import React from 'react'
import {MdCloudUpload} from "react-icons/md"

const UploadImage = () => {
  return (
    <div className="flex flex-col items-center ">
      <MdCloudUpload className="text-3xl text-gray-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">
              <span className="text-indigo-600 font-medium cursor-pointer">
                Browse file
              </span>{" "}
              or Drag it here
            </p>
    </div>
  )
}

export default UploadImage