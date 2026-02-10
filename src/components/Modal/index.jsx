import './index.css';

const Modal = ({ isOpen, onClose, title, children, onConfirm, confirmText = 'Confirmer', cancelText = 'Annuler', isDanger = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="modal-btn modal-btn-cancel" onClick={onClose}>
            {cancelText}
          </button>
          {onConfirm && (
            <button
              className={`modal-btn ${isDanger ? 'modal-btn-danger' : 'modal-btn-confirm'}`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
