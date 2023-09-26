import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { showMessage } from "../helpers";
import Headers from "../component/Headers";
import Comment from "../component/Comment";
import NavVideos from "../component/NavVideos";
import "../css/showVideo.css";
import axios from "axios";

export default function ShowVideoPage() {
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState({});
  const [comments, setComments] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [subscription, setSubscription] = useState();

  const storedUser = localStorage.getItem("UserName");
  const userId = localStorage.getItem("UserID");

  const checkLoginUser = () => {
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  };

  useEffect(() => {
    checkLoginUser();
  }, []);

  let { id } = useParams();

  // get all videos
  const loadVideos = () => {
    axios
      .get("http://localhost:3000/api/v1/videos")
      .then((res) => {
        setVideos(
          res.data.videos.map((video) => {
            const uploadDate = new Date(video.UploadDate);
            const currentDate = new Date();
            const dateTime = Math.floor(
              (currentDate - uploadDate) / (1000 * 60 * 60 * 24)
            );
            if (dateTime === 0) {
              video.UploadDate = "Hôm nay";
            } else if (dateTime === 1) {
              video.UploadDate = "Hôm trước";
            } else {
              video.UploadDate = dateTime + "Ngày trước";
            }

            if (video.AvatarUrl === null) {
              video.AvatarUrl = "../../../images/user.png";
            }
            return video;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  // get one video
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/videos/${id}`)
      .then((res) => {
        // console.log("resqqq", res.data.videoId);
        const videoData = res.data.videoId[0];

        if (videoData) {
          const uploadDate = new Date(videoData.UploadDate);
          const currentDate = new Date();
          const dateTime = Math.floor(
            (currentDate - uploadDate) / (1000 * 60 * 60 * 24)
          );
          if (dateTime === 0) {
            videoData.UploadDate = "Hôm nay";
          } else if (dateTime === 1) {
            videoData.UploadDate = "Hôm trước";
          } else {
            videoData.UploadDate = dateTime + "Ngày trước";
          }

          if (videoData.AvatarUrl === null) {
            videoData.AvatarUrl = "../../../images/user.png";
          }
          setVideo(videoData);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // cmt
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/comments/${id}`)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    loadVideos();
  }, []);

  // subscription
  const handleScription = () => {
    if (!loggedInUser) {
      showMessage("error", "Vui lòng đăng nhập để Đăng kí kênh");
      return;
    }

    axios
      .post("http://localhost:3000/api/v1/subscriptions", {
        SubscriberID: userId,
        ChannelID: video.ChannelID,
      })
      .then((res) => {
        console.log(res.data);
        setSubscription(true);
      })
      .catch((err) => console.log("err", err));
  };

  const handleDeleteScription = () => {
    axios
      .delete(`http://localhost:3000/api/v1/subscriptions`, {
        data: {
          SubscriberID: userId,
          ChannelID: video.ChannelID,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSubscription(false);
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    // load subscription status
    axios
      .get(`http://localhost:3000/api/v1/subscriptions/${userId}/${video.ChannelID}`)
      .then((res) => {
        setSubscription(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId, video.ChannelID]);

  return (
    <>
      <div className="root ">
        <div className="content_wrapper w-auto p-3">
          <header className="top_header">
            <Headers />
          </header>
          <main className="main_show_video">
            <div className="row all-content ">
              <div className="col-9 all_video">
                <div className="show_video">
                  <div className="thong_tin_video">
                    <div className="avatar_video">
                      <video
                        className="video_user"
                        src={video.URL}
                        type="video/mp4"
                        controls
                        autoPlay={false}
                      ></video>
                    </div>
                    <h1 className="h1">{video.Title}</h1>
                    <div className="nav_show_users">
                      <div className="sub_name">
                        <img
                          className="avatar_user"
                          src={video.AvatarUrl}
                          alt=""
                        />
                        <div className="tite_ytb">
                          <div className="user_name">
                            <Link to={`/${video.Username}`}>
                              <strong
                                className="user"
                                style={{ fontSize: "19px" }}
                              >
                                {video.ChannelName}
                              </strong>
                            </Link>
                          </div>
                          <div className="interact">
                            <span className="user" style={{ fontSize: "14px" }}>
                              {video.Views} Lượt xem
                            </span>
                            <span
                              className="user mx-3"
                              style={{ fontSize: "14px" }}
                            >
                              {video.UploadDate}
                            </span>
                          </div>
                        </div>
                        <div className="subscribe_videos">
                          {subscription ? (
                            <button
                              className="ytb_subscribe"
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                              onClick={handleDeleteScription}
                            >
                              Hủy đăng ký
                            </button>
                          ) : (
                            <button
                              className="ytb_subscribe"
                              onClick={handleScription}
                            >
                              Đăng ký
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="ytb_btn_feedback">
                        <div className="btn_feedback fdb">
                          <div>
                            <button className="up">
                              <i className="fa-regular fa-thumbs-up"></i>{" "}
                              {video.Likes}
                            </button>
                          </div>
                          <div>
                            <button className="down">
                              <i className="fa-regular fa-thumbs-down fa-flip-horizontal"></i>
                            </button>
                          </div>
                        </div>
                        <div className="btn_share fdb">
                          <button className="share">
                            <i className="fa-solid fa-share"></i> Chia sẻ
                          </button>
                        </div>
                        <div className="btn_download fdb">
                          <button className="download">
                            <i className="fa-solid fa-download"></i> Tải xuống
                          </button>
                        </div>
                        <div className="btn_cut fdb">
                          <button className="scissors">
                            <i className="fa-solid fa-scissors"></i> Tạo đoạn
                            video
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="descriptions">
                      <strong>{video.Views} Lượt xem</strong>
                      <strong>{video.UploadDate}</strong>
                      <p>{video.Descriptions}</p>
                    </div>
                  </div>
                  {/* cmt */}
                  <Comment
                    comments={comments}
                    loggedInUser={loggedInUser}
                    videoID={video.VideoID}
                  />
                </div>
              </div>
              <div className="overflow-y-auto col-3">
                <NavVideos videos={videos} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
