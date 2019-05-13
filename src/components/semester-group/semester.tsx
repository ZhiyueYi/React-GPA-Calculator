import React, { Component } from 'react';
import { ISemester } from '../../interfaces/semester.interface';
import { inject, observer } from 'mobx-react';
import { GpaStore } from '../../stores/gpa.store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface SemesterProps {
  gpaStore?: GpaStore;
  semester: ISemester;
}

export interface SemesterState {
  semester: ISemester;
}

@inject('gpaStore')
@observer
class Semester extends React.Component<SemesterProps, SemesterState> {
  render() {
    return (
      <div className="col-12 col-md-4 mt-2" style={{ color: 'black' }}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                {this.props.semester.name}
                <span className="badge badge-warning ml-2">
                  {this.props.gpaStore!.getGpa(this.props.semester)}
                </span>
              </div>
              <span
                className="text-danger mr-2"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  this.props.gpaStore!.removeSemester(this.props.semester)
                }
              >
                <FontAwesomeIcon icon="times" />
              </span>
            </h5>

            <ul className="list-group">
              {this.props.semester.courses.map(course => (
                <li
                  key={course.name}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    <span
                      className="badge badge-primary badge-pill mr-2"
                      style={{ minWidth: '30px' }}
                    >
                      {course.grade}
                    </span>
                    {course.name}
                  </span>
                  <span>
                    <span className="badge badge-pill mr-1">
                      {course.credit} CU
                    </span>

                    <span
                      className="text-danger mr-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        this.props.gpaStore!.removeCourse(
                          this.props.semester,
                          course,
                        )
                      }
                    >
                      <FontAwesomeIcon icon="times" />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Semester;
