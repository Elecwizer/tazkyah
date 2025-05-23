import React, { useEffect, useState } from "react";
import "../styles/filterbar.css";
import { CourseCard } from "./CourseCard";

export function FilterBar() {
  const [allCourses, setAllCourses] = useState([]); // Start with an empty array
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/courses/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const result = await response.json();
        console.log(result); // Just for debugging

        setAllCourses(result.data); // Store the fetched courses
        setFilteredCourses(result.data); // Show all courses initially
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    }

    fetchCourses();
  }, []);

  const filterCourses = (status) => {
    if (status === "All") {
      setFilteredCourses(allCourses);
    } else {
      setFilteredCourses(allCourses.filter((c) => c.courseStatus === status));
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const term = e.target.value.toLowerCase();
      setFilteredCourses(
        allCourses.filter((c) => c.title.toLowerCase().includes(term))
      );
    }
  };

  return (
    <>
      <div className="btn-container">
        <button onClick={() => filterCourses("All")} className="filter-btn">
          All
        </button>
        <button
          onClick={() => filterCourses("Available")}
          className="filter-btn"
        >
          Available
        </button>
        <button
          onClick={() => filterCourses("Unavailable")}
          className="filter-btn"
        >
          Unavailable
        </button>
        <input
          onKeyDown={handleSearch}
          type="text"
          id="searchBar"
          name="searchBar"
        />
      </div>
      <div className="cards-container">
        {filteredCourses.map((course) => (
          <div className="card">
            <CourseCard
              key={course.id} // Using id in params
              code={course.code}
              imgPath={course.img}
              title={course.title} // These are not needed. More info about courses is inside the course
              // description={course.description}
            />
          </div>
        ))}
      </div>
    </>
  );
}
