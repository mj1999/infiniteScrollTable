import React, { useState, useEffect } from "react";
import styles from "../styles/table.module.css";

const CollegeTable = () => {
  const [visibleColleges, setVisibleColleges] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [total, setTotal] = useState(10);
  const [currBatch, setCurrBatch] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (total > visibleColleges.length) {
      fetch("./collegeDunia.json")
        .then((data) => data.json())
        .then((jsonData) => {
          setVisibleColleges(jsonData.colleges.slice(0, currBatch));
          setTotal(jsonData.colleges.length);
        });
    } else {
      setHasMore(false);
    }
  }, [currBatch]);

  const handleScrollEnd = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && hasMore) {
      setCurrBatch(currBatch + 10);
    }
  };

  return (
    <>
      <input
        className={styles.searchBar}
        placeholder="Search College Name"
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
      <div className={styles.tableDisplay} onScroll={handleScrollEnd}>
        <div className={styles.tableHeader}>
          <div className={styles.col1} style={{ cursor: "default" }}>
            Sr. No.
          </div>
          <div className={styles.col2} style={{ cursor: "default" }}>
            College
          </div>
          <div
            className={styles.col3}
            onClick={() => {
              const sortedColleges = [...visibleColleges].sort((a, b) => {
                if (sortOrder === "asc") {
                  return a.fees[0].fee > b.fees[0].fee ? 1 : -1;
                }
                return a.fees[0].fee < b.fees[0].fee ? 1 : -1;
              });
              setVisibleColleges(sortedColleges);
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            Course Fee
          </div>
          <div
            className={styles.col4}
            onClick={() => {
              const sortedColleges = [...visibleColleges].sort((a, b) => {
                if (sortOrder === "asc") {
                  return a.placement.average_salary > b.placement.average_salary
                    ? 1
                    : -1;
                }
                return a.placement.average_salary < b.placement.average_salary
                  ? 1
                  : -1;
              });
              setVisibleColleges(sortedColleges);
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            Placements
          </div>
          <div
            className={styles.col5}
            onClick={() => {
              const sortedColleges = [...visibleColleges].sort((a, b) => {
                if (sortOrder === "asc") {
                  return a.rating > b.rating ? 1 : -1;
                }
                return a.rating < b.rating ? 1 : -1;
              });
              setVisibleColleges(sortedColleges);
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            User Reviews
          </div>
          <div
            className={styles.col6}
            onClick={() => {
              const sortedColleges = [...visibleColleges].sort((a, b) => {
                if (sortOrder === "asc") {
                  return a.defaultRankingData[0].rankingOfCollege >
                    b.defaultRankingData[0].rankingOfCollege
                    ? 1
                    : -1;
                }
                return a.defaultRankingData[0].rankingOfCollege <
                  b.defaultRankingData[0].rankingOfCollege
                  ? 1
                  : -1;
              });
              setVisibleColleges(sortedColleges);
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            Ranking
          </div>
        </div>
        {visibleColleges
          .filter((item) =>
            item.college_name.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((college, idx) => (
            <div className={styles.tableData}>
              <div className={`${styles.col1}`}>#{idx + 1}</div>
              <div className={`${styles.col2} ${styles.collegeInfoCol}`}>
                <div className={styles.collegeData}>
                  <img className={styles.collegeLogo} src="/sampleLogo.png" />
                  <div className={styles.collegeAbout}>
                    {college.featured ? (
                      <div className={styles.featuredDiv}>Featured</div>
                    ) : (
                      ""
                    )}
                    <div className={styles.collegeName}>
                      {college.college_name}, {college.college_city}
                    </div>
                    <div className={styles.collegeLocation}>
                      {college.college_city},&nbsp;{college.state}
                      {college.approvals.length > 0
                        ? " | " + college.approvals.join(",") + " approved"
                        : ""}
                    </div>
                    {college.top_course.course_short_form ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          borderTopRightRadius: "10px",
                          borderBottomRightRadius: "10px",
                          borderLeft: "2px solid orange",
                          padding: "3px",
                          marginTop: "5px",
                          paddingRight: "10px",
                          backgroundColor: "rgb(230, 223, 184)",
                          width: "fit-content",
                        }}
                      >
                        <div
                          style={{
                            color: "orange",
                            fontSize: "0.8rem",
                            paddingLeft: "5px",
                          }}
                        >
                          {college.top_course.course_short_form}
                        </div>
                        <div
                          style={{
                            fontSize: "0.6rem",
                            paddingLeft: "5px",
                          }}
                        >
                          {college.top_course.exam_short_form +
                            " " +
                            college.top_course.cutoff_year +
                            " Cutoff : " +
                            college.top_course.cutoff_end}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className={styles.collegeActions}>
                  <a style={{ color: "orange", textDecoration: "none" }}>
                    Apply Now
                  </a>
                  <a style={{ color: "green", textDecoration: "none" }}>
                    Download Brochure
                  </a>
                  <div style={{ fontSize: "0.8rem" }}>
                    {" "}
                    <input
                      type="checkbox"
                      name="compare"
                      id={college.college_id}
                    />
                    &nbsp;
                    <label htmlFor={college.college_id}>Add To Compare</label>
                  </div>
                </div>
              </div>
              <div className={`${styles.col3} ${styles.collegeFeeCol}`}>
                <div style={{ color: "green" }}>
                  ₹{" " + college.fees[0].fee.toLocaleString()}
                </div>
                <div
                  style={{ color: "rgb(138, 138, 138)", fontSize: "0.8rem" }}
                >
                  {college.fees[0].short_form}
                </div>
                <div
                  style={{ color: "rgb(138, 138, 138)", fontSize: "0.8rem" }}
                >
                  {college.fees[0].type}
                </div>
                <a style={{ textDecoration: "none", color: "orange" }}>
                  Compare Fees
                </a>
              </div>
              <div className={`${styles.col4} ${styles.placementCol}`}>
                <div>
                  <div style={{ color: "green" }}>
                    ₹
                    {" " + college.placement.average_salary
                      ? college.placement.average_salary
                      : "No data available"}
                  </div>
                  <div
                    style={{ color: "rgb(138, 138, 138)", fontSize: "0.7rem" }}
                  >
                    Average Package
                  </div>
                </div>
                <div>
                  <div style={{ color: "green" }}>
                    ₹
                    {" " + college.placement.highest_salary
                      ? college.placement.highest_salary
                      : "No data available"}
                  </div>
                  <div
                    style={{ color: "rgb(138, 138, 138)", fontSize: "0.7rem" }}
                  >
                    Highest Package
                  </div>
                </div>
                <a style={{ color: "orange" }}>Compare packages</a>
              </div>
              <div className={`${styles.col5} ${styles.userReviewsCol}`}>
                <div className={styles.avgReview}>
                  {college.rating + " / 10"}
                </div>
                <div
                  style={{
                    color: "rgb(138, 138, 138)",
                    fontSize: "0.7rem",
                    width: "50%",
                  }}
                >
                  Based on{" " + college.reviewsData.totalStudent + " "} user
                  reviews
                </div>
                <div className={styles.tagline}>{college.tagline}</div>
              </div>

              <div className={`${styles.col6}`}>
                <span style={{ color: "orange" }}>
                  {college.defaultRankingData[0].rankingOfCollege + " "}
                </span>{" "}
                in India
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CollegeTable;
