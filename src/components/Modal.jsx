import React from "react";
import PropTypes from "prop-types";

export const Modal = props => {
  return (
    <div 
      className="modal" 
      style={{ display: props.show ? "block" : "none" }}
      tabIndex="-1" 
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">¿Estás seguro?</h5>
            <button 
              type="button" 
              className="close" 
              onClick={() => props.onClose()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>¿Realmente deseas eliminar este contacto?</p>
            <p>Esta acción no se puede deshacer.</p>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => props.onClose()}
            >
              Cancelar
            </button>
            <button 
              type="button" 
              className="btn btn-danger" 
              onClick={() => props.onConfirm()}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
};