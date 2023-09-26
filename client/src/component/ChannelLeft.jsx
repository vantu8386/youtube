import React, { useState } from "react";
import { showMessage } from "../helpers";
import "../css/ChannelLeft.css";
import axios from "axios";

export default function ChannelLeft({ channel }) {
  const [avatar, setAvatar] = useState(null);

  const storedUserID = localStorage.getItem("UserID");
  const storedUser = localStorage.getItem("UserName");

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storedUser) {
      showMessage("error", "Vui lòng đăng nhập để tải ảnh");
      return;
    }

    const formData = new FormData();
    formData.append("uploads", avatar);

    axios
      .put(
        `http://localhost:3000/api/v1/uploads/avatar/${storedUserID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log("res:", res);

        showMessage("success", "Ảnh đã được tải lên thành công");
      })
      .catch((err) => {
        console.error("Lỗi khi tải lên ảnh:", err);
      });
  };
  return (
    <div className="ytb_channel_left">
      <div className="channel_left">
        <div className="overplay_container">
          <div className="img_left img-container image-container">
            {channel.length > 0 && (
              <img
                src={
                  channel[0].AvatarUrl
                    ? channel[0].AvatarUrl
                    : "../../../images/user.png"
                }
                alt=""
                className="user-image"
              />
            )}
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                className="file-input"
                name="avatar"
                onChange={handleFileChange}
              />
              <button type="submit" className="btn btn-primary btn-upload">
                upload
              </button>
            </form>
          </div>
          <div>
            <div>
              <b>Kênh của bạn</b>
            </div>
            {channel.length > 0 && (
              <div>
                <span className="mx-3">{channel[0].ChannelName}</span>
                <i
                  className="fa-solid fa-pen"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  // onClick={}
                ></i>
                {/* ----- */}

                {/* Modal */}
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Update Name
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        <form>
                          <input
                            type="text"
                            className="form-control mb-3"
                            id="recipient-name"
                          />
                          <button
                            type="submit"
                            className="btn btn-secondary float-end"
                            data-bs-dismiss="modal"
                          >
                            Update
                          </button>
                        </form>
                      </div>
                      <div className="modal-footer"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="channel_left_nav">
          <div className="channel_nav">
            <i className="bi bi-columns-gap"></i>
            <span className="nav_title_text">Trang tổng quan</span>
          </div>
          <div className="channel_nav">
            <i className="bi bi-collection-play"></i>
            <span className="nav_title_text">Nội dung</span>
          </div>
          <div className="channel_nav">
            <i className="bi bi-graph-up-arrow"></i>
            <span className="nav_title_text">Số liệu phân tích</span>
          </div>
          <div className="channel_nav">
            <i className="bi bi-chat-right-text"></i>
            <span className="nav_title_text">Bình luận</span>
          </div>
          <div className="channel_nav">
            <i className="bi bi-badge-cc"></i>
            <span className="nav_title_text">Phụ đề</span>
          </div>
          <div className="channel_nav">
            <i className="fa-solid fa-c"></i>
            <span className="nav_title_text">Bản quyền</span>
          </div>
          <div className="channel_nav">
            <i className="bi bi-currency-dollar"></i>
            <span className="nav_title_text">Kiếm tiền</span>
          </div>
          <div className="channel_nav">
            <i className="bi bi-magic"></i>
            <span className="nav_title_text">Tùy chỉnh</span>
          </div>
          <div className="channel_nav">
            <i className="bi bi-file-music"></i>
            <span className="nav_title_text">Thư viện âm thanh</span>
          </div>
        </div>
      </div>
      <div className="channel_left_setting" style={{ marginTop: "140px" }}>
        <div className="channel_nav">
          <i className="bi bi-gear"></i>
          <span className="nav_title_text">Cài đặt</span>
        </div>
        <div className="channel_nav">
          <i className="fa-solid fa-circle-exclamation"></i>
          <span className="nav_title_text">Gửi ý kiến phản hồi</span>
        </div>
      </div>
    </div>
  );
}
