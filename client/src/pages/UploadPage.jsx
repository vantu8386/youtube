import React, { useState } from "react";
import { Link } from "react-router-dom";
import { showMessage } from "../helpers";
import "../css/uploadVideo.css";
import axios from "axios";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);

  const storedUserID = localStorage.getItem("UserID");
  const storedUser = localStorage.getItem("UserName");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storedUser) {
      showMessage("error", "Vui lòng đăng nhập để tải video");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("descriptions", description);
    formData.append("uploads", video);

    axios
      .post(
        `http://localhost:3000/api/v1/uploads/video/${storedUserID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        showMessage("success", "Đăng tải video thành công");
        setVideo("");
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        showMessage("error", "Đã xảy ra lỗi khi tải lên video");
        console.log("err:", err);
      });
  };

  return (
    <div>
      <div className="py-20 h-screen bg-gray-300 px-2">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
          <div className="md:flex">
            <div className="w-full px-4 py-6 ">
              <form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <span className="text-sm">Tiêu đề</span>
                  <input
                    value={title}
                    onChange={handleTitleChange}
                    required
                    type="text"
                    className="h-12 px-3 w-full border-blue-400 border-2 rounded focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="mb-1">
                  <span className="text-sm">Mô tả</span>
                  <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                    type="text"
                    className="h-24 py-1 px-3 w-full border-2 border-blue-400 rounded focus:outline-none focus:border-blue-600 resize-none"
                  />
                </div>
                <div className="mb-1">
                  <span>Chọn file</span>
                  <div className="relative border-dotted h-32 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                    <div className="absolute">
                      <div className="flex flex-col items-center">
                        <i className="fa fa-folder-open fa-3x text-blue-700" />
                        <span className="block text-gray-400 font-normal">
                          Chọn file
                        </span>
                      </div>
                    </div>
                    <input
                      type="file"
                      className="h-full w-full opacity-0"
                      name="videos"
                      onChange={handleFileChange}
                      accept="video/*"
                      required
                    />
                  </div>
                </div>
                <div className="mt-3 text-right">
                  <Link to={"/channel"}>Cancel</Link>
                  <button
                    type="submit"
                    className="ml-2 h-10 w-32 bg-blue-600 rounded text-white hover:bg-blue-700"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
