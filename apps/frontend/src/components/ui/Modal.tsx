import React from "react"




export default function Modal({ isOpen, onClose, title, children}){

  if(!isOpen) return null;


  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <div style={headerStyles}>
          <h3 style={titleStyles}>{title}</h3>
          <button onClick={onClose} style={closeButtonStyles}>
          X
          </button>
        </div>
        <div style={contentStyles}>{children}</div>
      </div>
    </div>
  )


}




const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  width: "100%",
  height: "100%",
  backdropFilter: "blur(4px)",
}

const modalStyles = {
  backgroundColor: "white",
  padding: "24px",
  borderRadius: "20px",
  boxShadow: "0 24px 40px rgba(0, 0, 0, 0.25)",
  maxWidth: "90vw",
  width: "520px",
  height: "332px",
  position: "relative",
}

const headerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "10px",
  marginTop: "5px",
  position: "relative",
}

const closeButtonStyles = {
  background: "none",
  color: "#1B1B1B",
  border: "1px solid #1B1B1B",
  borderRadius: "25px",
  padding: "5px 10px",
  fontSize: "12px",
  cursor: "pointer",
  position: "absolute",
  top: "0",
  right: "0",
}

const contentStyles = {
  marginTop: "10px",
  marginBottom: "10px",
  marginLeft: "10px",
  marginRight: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: "12px",
  width: "100%",
}

const titleStyles = {
  fontSize: "20px",
  fontWeight: "bold",
  fontFamily: "Lato, sans-serif",
  color: "#1B1B1B",
  textAlign: "center",
}
