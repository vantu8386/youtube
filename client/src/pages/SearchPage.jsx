import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/home.css";
import "../css/mainSidebBar.css";
import "../css/mainVideoHome.css";
import "../css/searchPage.css";
import Headers from "../component/Headers";
import SideBar from "../component/SideBar";
import axios from "axios";

export default function SearchPage() {
  const [searchData, setSearchData] = useState([]);
  const [subscribedChannels, setSubscribedChannels] = useState([]);

  const storedUser = localStorage.getItem("UserName");
  const randomString = Math.random().toString(36).substring(2, 8);

  const location = useLocation();
  // console.log("location: " , location)
  const queryParams = new URLSearchParams(location.search);
  // console.log("queryParams",queryParams)

  // Bây giờ bạn có thể trích xuất các query parameters
  const searchTerm = queryParams.get("term");
  // console.log("============>", searchTerm);
  useEffect(() => {
    const handleCallApi = async () => {
      // if (!storedUser) {
      //   showMessage("error", "Vui lòng đăng nhập để tìm kiếm video");
      //   return;
      // }

      if (searchTerm) {
        await axios
          .get(`http://localhost:3000/api/v1/search/?search=${searchTerm}`)
          .then((res) => {
            // console.log("data", res.data);
            // setSearchData(res.data);
            setSearchData(
              res.data.map((video) => {
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
                return video;
              })
            );
          })
          .catch((err) => console.log(err));
      }
    };
    handleCallApi();
  }, [searchTerm]);

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
              <div className="col-10 all_video search_page">
                <div className="nav_video">
                  <button>Tất cả</button>
                  <button>Short</button>
                  <button>Chưa Xem</button>
                  <button>Đã xem</button>
                  <button>Dành cho bạn</button>
                  <button>Tải lên gần đây</button>
                  <button>Trực tiếp</button>
                  <button>Danh sách phát</button>
                </div>
                <div className="search-videos">
                  {searchData.length !== 0 &&
                    searchData.map((result, i) => (
                      <Link
                        to={`/show-video/${result.VideoID}${randomString}`}
                        style={{ color: "black" }}
                      >
                        <div className="render_video" key={i}>
                          <div className="result_video">
                            <video
                              className="preview_video"
                              src={result.URL}
                              controls
                              autoPlay={false}
                              type="video/mp4"
                            ></video>
                          </div>
                          <div className="result_content">
                            <h3>{result.Title}</h3>
                            <div className="metaData">
                              <span>{result.Views} lượt xem - </span>
                              <span>{result.UploadDate}</span>
                            </div>
                            <div className="channel-info">
                              <Link>
                                <img
                                  src={
                                    result.AvatarUrl
                                      ? result.AvatarUrl
                                      : "../../../images/user.png"
                                  }
                                  alt=""
                                />
                              </Link>
                              <span className="simple">
                                {result.ChannelName}
                              </span>
                            </div>
                            <div className="metaData_simple">
                              <span className="depcription">
                                {result.Descriptions}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  {/* <div className="render_video">
                    <div className="result_video">
                      <video
                        className="preview_video"
                        src="../../../videos/Tay Trái Chỉ Trăng.mp4"
                        controls
                        autoPlay={false}
                        type="video/mp4"
                      ></video>
                    </div>
                    <div className="result_content">
                      <h3>title</h3>
                      <div className="metaData">
                        <span>0 luot xem - </span>
                        <span>0 nam truoc</span>
                      </div>
                      <div className="channel-info">
                        <Link>
                          <img src="../../../images/user.png" alt="" />
                        </Link>
                        <span className="simple">Channelname</span>
                      </div>
                      <div className="metaData_simple">
                        <span className="depcription">depcription</span>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
