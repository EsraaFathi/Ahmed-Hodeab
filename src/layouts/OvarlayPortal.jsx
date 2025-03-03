// // import ReactDOM from "react-dom";

// // const OverlayPortal = ({ onClick }) => {
// //   return ReactDOM.createPortal(<div id="overlay" style={{ backgroundColor: "#000", opacity: "70%" }} className="fixed inset-0  bg-opacity-30 backdrop-blur-sm " onClick={onClick} />, document.getElementById("overlay-root"));
// // };

// // export default OverlayPortal;
// import ReactDOM from "react-dom";

// const OverlayPortal = ({ onClick }) => {
//   const overlayRoot = document.getElementById("overlay-root");
//   if (!overlayRoot) return null; // Avoid errors if not found

//   return ReactDOM.createPortal(
//     <div
//       id="overlay"
//       style={{ backgroundColor: "#000", opacity: "70%" }}
//       className="fixed inset-0 bg-opacity-30 backdrop-blur-sm"
//       onClick={onClick}
//     />,
//     overlayRoot
//   );
// };

// export default OverlayPortal;
