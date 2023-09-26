import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteMessage, showMessage } from "../helpers";
import ChannelLeft from "../component/ChannelLeft";
import HeaderChannel from "../component/HeaderChannel";
import ChannelContent from "../component/ChannelContent";
import axios from "axios";

export default function ChannelPage() {
  const [channel, setChannel] = useState([]);
  const [currentPage, setCurrentPage] = useState(5);
  const [recordsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);

  const storedUser = localStorage.getItem("UserName");

  const loadChannel = () => {
    const userName = storedUser;
    axios
      .get(`http://localhost:3000/api/v1/videos/userName/${userName}`)
      .then((res) => {
      //  console.log("123",res.data.videoId[0]);
        setChannel(res.data.videoId);
        setTotalRecords(res.data.videoId.length);
      })
      .catch((err) => console.log("err", err));
  };

  const handleDelete = (id) => {
    deleteMessage("warning", "Bạn muốn xóa video ?", () => {
      axios
        .delete(`http://localhost:3000/api/v1/videos/userName/${id}`)
        .then((res) => {
          console.log(res.data);
          loadChannel();
        })
        .catch((err) => console.log("err", err));
    });
  };

  useEffect(() => {
    loadChannel();
  }, []);

  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = channel.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      className="channel_page"
      style={{ width: "100%", height: "100vh", overflow: "hidden" }}
    >
      <div>
        <header>
          <HeaderChannel />
        </header>
      </div>
      <div className="row" style={{ marginTop: "70px", height: "100%" }}>
        <div className="col-2">
          <ChannelLeft channel={channel} />
        </div>
        <div className="col-10">
          <ChannelContent
            channel={currentRecords}
            handleDelete={handleDelete}
            // handleSubmit={handleSubmit}
          />

          <div>
            <nav aria-label="...">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <Link
                    className="page-link"
                    tabIndex={-1}
                    aria-disabled="true"
                    onClick={() => paginate(currentPage - 1)}
                  >
                    Pre...
                  </Link>
                </li>
                {Array.from({ length: totalPages }, (e, i) => (
                  <li
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    key={i}
                  >
                    <Link className="page-link" onClick={() => paginate(i + 1)}>
                      {i + 1}
                    </Link>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <Link
                    className="page-link"
                    onClick={() => paginate(currentPage + 1)}
                  >
                    Next
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
