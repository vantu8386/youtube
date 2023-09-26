import React, { useEffect, useState } from "react";
import "../css/showVideo.css";
import axios from "axios";
import { showMessage } from "../helpers";

export default function Comment({ comments, loggedInUser, videoID }) {
  const UserID = localStorage.getItem("UserID");
  const [toggle, setToggle] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const [commentText, setCommentText] = useState("");

  const toggleDropdown = () => {
    setToggle(!toggle);
  };

  const toggleReply = () => {
    setReplyVisible(!replyVisible);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!loggedInUser) {
      showMessage("error", "Vui lòng đăng nhập để bình luận");
      return;
    }

    const commentData = {
      CommentText: commentText,
      UserID: UserID,
      VideoID: videoID,
    };

    // console.log("commentData:", commentData);  


    axios
      .post("http://localhost:3000/api/v1/comments", commentData)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="comment_content mt-3">
        <div className="comment">
          <div className="arrange_all">
            <span className="count">100 Bình luận</span>
            <div className={`dropdown-button ${toggle ? "active" : ""}`}>
              <button
                className="btn  flex align-items-center"
                type="button"
                onClick={toggleDropdown}
              >
                <i className="bi bi-filter" style={{ fontSize: "30px" }}></i>
                <span>Sắp xếp theo</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <i className="fa-solid fa-arrow-down-wide-short"></i> Bình
                  luận cũ nhất
                </li>
                <li>
                  <i className="fa-solid fa-arrow-down-short-wide"></i> Bình
                  luận mới nhất
                </li>
              </ul>
            </div>
          </div>
          <div className="users_comment">
            <form>
              <div className="imput_users">
                <img
                  className="img_users"
                  src="../../../images/user.png"
                  alt=""
                />
                <input
                  type="text"
                  className="form_control"
                  placeholder={`Viết bình luận...${loggedInUser}`}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-primary d-none"
                  onClick={handleSubmitComment}
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
          <div className="render_comment">
            {comments.length > 0 &&
              comments.map((e, i) => (
                <div className="cmt_ytb" key={i}>
                  <div className="imput_users">
                    <img
                      className="img_users"
                      src="../../../images/user.png"
                      alt=""
                    />
                    <div className="form_control">
                      <b>@{e.Username}</b>
                      <span>{e.CommentText}</span>
                      <p className="likes_comment">
                        <i
                          className="fa-regular fa-thumbs-up"
                          style={{ color: "blue" }}
                        ></i>
                        <i
                          className="fa-regular fa-thumbs-down fa-flip-horizontal"
                          style={{ color: "blue" }}
                        ></i>
                        <strong
                          style={{ fontSize: "14px", cursor: "pointer" }}
                          onClick={toggleReply}
                        >
                          Phản hồi
                        </strong>
                      </p>
                      {replyVisible && (
                        <div>
                          <div className="imput_users">
                            <img
                              className="img_users"
                              src="../../../images/user.png"
                              alt=""
                            />
                            <input
                              type="text"
                              placeholder="Viết bình luận..."
                            />
                          </div>
                          <div className="foodter_comment">
                            <span onClick={() => toggleReply(e.UserID)}>
                              Hủy
                            </span>
                            <span>Phản hồi</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="content_comment"></div>
      </div>
    </div>
  );
}
