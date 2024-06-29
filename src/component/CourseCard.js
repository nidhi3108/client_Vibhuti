import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.name} />
      <h3>{course.name}</h3>
      {/* <p>{course.speaker}</p> */}
      <p>Price: ${course.priceRange.min} - ${course.priceRange.max}</p>
      <p>Created At: {new Date(course.createdOn).toLocaleDateString()}</p>
    </div>
  );
};

export default CourseCard;