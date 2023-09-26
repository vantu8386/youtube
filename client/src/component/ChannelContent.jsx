import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteMessage, showMessage } from "../helpers";
import "../css/channelContent.css";
import axios from "axios";

export default function ChannelContent({ channel, handleDelete }) {
  const [editChannel, setEditChannel] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/v1/videos/${editChannel.VideoID}`, {
        title: editChannel.title,
        description: editChannel.description,
      })
      .then((res) => {
        showMessage("success", "Update thành công");
        setTimeout(() => {
          window.location.reload();
        }, 1500);

      })
      .catch((err) => console.log("err", err));
  };

  const hanldeClickUpdate = (id) => {
    const channelUpdate = channel.find((c) => c.VideoID === id);
    // console.log("channel update", channelUpdate);
    setEditChannel({
      ...editChannel,
      VideoID: channelUpdate.VideoID,
      title: channelUpdate.Title,
      description: channelUpdate.Descriptions,
    });
  };
  return (
    <div className="channel_content">
      <div>
        <h1>Nội dung của kênh</h1>
      </div>
      <div>
        <nav className="nav">
          <Link className="nav-link text-dark">Video</Link>
          <Link className="nav-link text-dark">Trực tiếp</Link>
          <Link className="nav-link text-dark">Danh sách phát</Link>
          <Link className="nav-link text-dark">Podcast</Link>
          <Link className="nav-link text-dark">Quảng bá</Link>
        </nav>
      </div>
      <hr />
      <div style={{ display: "flex", alignItems: "center" }}>
        <i className="bi bi-filter" style={{ fontSize: "30px" }}></i>
        <input type="email" className="form-control" placeholder="Lọc" />
      </div>
      <hr />

      <div className="video_content" style={{ overflowX: "auto" }}>
        <table className="table table-striped table-hover ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Video</th>
              <th scope="col">Ngày đăng</th>
              <th scope="col">Số lượt xem</th>
              <th scope="col">Số bình luận</th>
              <th scope="col">Số lượt thích</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {channel.length > 0 &&
              channel.map((channel, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td className="video">
                    <video
                      className="channel_video"
                      src={channel.URL}
                      controls
                      autoPlay={false}
                      type="video/mp4"
                    ></video>
                    <span>{channel.Title}</span>
                  </td>
                  <td>{channel.UploadDate}</td>
                  <td>{channel.Views}</td>
                  <td>null</td>
                  <td>{channel.Likes}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModals"
                      data-bs-whatever="@mdo"
                      onClick={() => hanldeClickUpdate(channel.VideoID)}
                    >
                      Update
                    </button>

                    {/* modal */}
                    <div
                      className="modal fade"
                      id="exampleModals"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Update thông tin video
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                              <div className="mb-3">
                                <label
                                  htmlFor="recipient-name"
                                  className="col-form-label"
                                >
                                  Title:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={editChannel.title}
                                  onChange={(e) =>
                                    setEditChannel({
                                      ...editChannel,
                                      title: e.target.value,
                                    })
                                  }
                                  id="recipient-name"
                                  name="title"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="message-text"
                                  className="col-form-label"
                                >
                                  Descriptions:
                                </label>
                                <textarea
                                  className="form-control"
                                  value={editChannel.description}
                                  onChange={(e) =>
                                    setEditChannel({
                                      ...editChannel,
                                      description: e.target.value,
                                    })
                                  }
                                  id="message-text"
                                  name="description"
                                />
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Save update
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(channel.VideoID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
