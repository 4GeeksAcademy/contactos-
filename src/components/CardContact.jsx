// src/js/component/ContactCard.js
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const ContactCard = props => {
  return (
    <li className="list-group-item">
      <div className="row w-100">
        <div className="col-12 col-sm-6 col-md-3 px-0">
          <img 
            src="https://via.placeholder.com/150" 
            alt="Contact" 
            className="rounded-circle mx-auto d-block img-fluid" 
          />
        </div>
        <div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
          <div className="float-right">
            <Link to={"/edit/" + props.id}>
              <button className="btn btn-success mr-2">
                <i className="fas fa-pencil-alt"></i>
              </button>
            </Link>
            <button 
              className="btn btn-danger" 
              onClick={() => props.onDelete()}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
          <label className="name lead">{props.full_name}</label>
          <br />
          <i className="fas fa-map-marker-alt text-muted mr-3"></i>
          <span className="text-muted">{props.address}</span>
          <br />
          <span
            className="fa fa-phone fa-fw text-muted mr-3"
            data-toggle="tooltip"
            title=""
            data-original-title={props.phone}
          ></span>
          <span className="text-muted small">{props.phone}</span>
          <br />
          <span
            className="fa fa-envelope fa-fw text-muted mr-3"
            data-toggle="tooltip"
            data-original-title=""
            title=""
          ></span>
          <span className="text-muted small text-truncate">{props.email}</span>
        </div>
      </div>
    </li>
  );
};

ContactCard.propTypes = {
  full_name: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.string,
  onDelete: PropTypes.func
};