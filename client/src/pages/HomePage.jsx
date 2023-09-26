import React, { useEffect, useState } from "react";
import "../css/home.css";
import "../css/mainSidebBar.css";
import "../css/mainVideoHome.css";
import Headers from "../component/Headers";
import SideBar from "../component/SideBar";
import Videos from "../component/Videos";
import axios from "axios";

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [subscribedChannels, setSubscribedChannels] = useState([]);

  const storedUser = localStorage.getItem("UserName");

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
        // console.log(res.data.videos);
      })
      .catch((err) => console.log(err));
  };

  const loadSubscribedChannels = () => {
    const username = storedUser;
    axios
      .get(`http://localhost:3000/api/v1/users/subscriptions/${username}`)
      .then((res) => {
        // console.log(res.data.subscribedChannels);
        setSubscribedChannels(res.data.subscribedChannels);
        if (subscribedChannels.AvatarUrl === null) {
          videoData.AvatarUrl = "../../../images/user.png";
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadVideos();
    loadSubscribedChannels();
  }, []);
  return (
    <>
      <div className="root ">
        <div className="content_wrapper w-auto p-3">
          <header className="top_header">
            <Headers />
          </header>
          <main className="">
            <div className="row all-content">
              <div className="overflow-y-auto col-2 content_side_bar">
                <SideBar subscribedChannels={subscribedChannels} />
              </div>
              <div className="col-10 all_video">
                <div className="nav_video">
                  <button>Tất cả</button>
                  <button>Âm nhạc</button>
                  <button>Danh sách kết hợp</button>
                  <button>Trò chơi</button>
                  <button>Tin tức</button>
                  <button>Trực tiếp</button>
                  <button>Sách nói</button>
                  <button>Trực tiếp</button>
                  <button>Nấu ăn</button>
                  <button>Bóng đá</button>
                  <button>Mới tải lên gần đây</button>
                  <button>Đã xem</button>
                  <button>Đề xuất mới</button>
                </div>
                <div className="videos">
                  <Videos videos={videos} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
